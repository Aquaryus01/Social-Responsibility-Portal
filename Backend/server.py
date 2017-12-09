#!/usr/bin/python
import sqlite3
import jwt
import json
import os
import numpy
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from passlib.hash import sha256_crypt

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = '/images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

jwt_key = 'OQU6kcW1J0Y0jG9uVnU5hznryLm1df7bMvuM30GY8Im6_RsmMv5fvW5pcft1QFYk'

con = sqlite3.connect('data.db')
c = con.cursor()

def in_radius(radius, center_long, center_lat, other_long, other_lat):
    center_long *= 111302.62
    other_long *= 111302.62
    center_lat *= 110574.61
    other_lat *= 110574.61
    return numpy.linalg.norm(numpy.array([center_lat, center_long]) - numpy.array([other_lat, other_long])) <= radius

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json(force=True)
    try:
        c.execute('SELECT password FROM Users WHERE email = (?)', (data['email'],))
        if not sha256_crypt.verify(data['password'], c.fetchone()[0]):
            return 'Wrong password!'    
        else:
            c.execute('SELECT userId, admin from Users WHERE email = (?)', (data['email'],))
            encoded_jwt = jwt.encode({'userId': c.fetchone()[0],
                                      'isAdmin': c.fetchone()[1]},
                                     jwt_key)
            return encoded_jwt
    except Exception as e:
        print(e)
        return ''

@app.route('/register', methods=['POST'])
def register():
    print('Request!')
    data = request.get_json(force=True)
    to_add = (data['firstName'],
              data['lastName'],
              data['email'],
              sha256_crypt.encrypt(data['password']),
              data['gender'],
              data['location'],
              data['age'])
    print(data, '\n', to_add)
    try:
        c.execute('INSERT INTO Users \
            (firstName, lastName, email, password, gender, location, age) \
            VALUES (?, ?, ?, ?, ?, ?, ?)', to_add)
        con.commit()
        return '1'
    except Exception as e:
        print(e)
        return '0'

@app.route('/post_issue', methods=['POST'])
def post_issue():
    data = request.get_json(force=True)
    decoded_jwt = jwt.decode(data['jwt'], jwt_key)
    print(decoded_jwt)
    to_add = (decoded_jwt['userId'],
              data['title'],
              data['description'],
              data['lat'],
              data['long'])
    try:
        c.execute('INSERT INTO Issues (userId, title, description, lat, long) \
            VALUES (?, ?, ?, ?, ?)', to_add)
        con.commit()
    except Exception as e:
        print(e)
        return ''

    return '1'

@app.route('/get_location', methods=['GET'])
def get_location():
    data = request.get_json(force=True)
    decoded_jwt = jwt.decode(data['jwt'], jwt_key)
    try:
        c.execute('SELECT location FROM Users WHERE userId = ?',
                  (decoded_jwt['userId'],))
    except Exception as e:
        print(e)
        return ''
    return c.fetchone()[0]
        
@app.route('/get_issues', methods=['POST'])
def get_issues():
    data = request.get_json(force=True)
    issues = []
    c.execute('SELECT issueId, title, description, email, lat, long FROM Issues\
        INNER JOIN Users ON Users.userId = Issues.userId')
    for issue in c.fetchall():
        if in_radius(data['radius'], data['long'], data['lat'], issue[5], issue[4]):
            issues.append({'id': issue[0],
                           'title': issue[1],
                           'description': issue[2],
                           'email': issue[3],
                           'lat': issue[4],
                           'long': issue[5]})            
    return make_response(json.dumps(issues))


    
