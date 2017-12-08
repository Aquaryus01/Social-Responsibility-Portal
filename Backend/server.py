#!/usr/bin/python
import sqlite3
import jwt
import json
import os
from flask import Flask, request
from flask_cors import CORS
from passlib.hash import sha256_crypt

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = '/images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

jwt_key = 'OQU6kcW1J0Y0jG9uVnU5hznryLm1df7bMvuM30GY8Im6_RsmMv5fvW5pcft1QFYk'

con = sqlite3.connect('data.db')
c = con.cursor()

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json(force=True)
    try:
        c.execute('SELECT password FROM Users WHERE email = (?)', (data['email'],))
        if not sha256_crypt.verify(data['password'], c.fetchone()[0]):
            return 'Wrong password!'    
        else:
            c.execute('SELECT userId from Users WHERE email = (?)', (data['email'],))
            encoded_jwt = jwt.encode({'userId': c.fetchone()[0]}, jwt_key)
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
    if 'file' not in request.files:
        return 'No file!'
    file = request.files['file']
    decoded_jwt = jwt.decode(data['jwt'], jwt_key)
    print(decoded_jwt)
    saved_img = os.path.join(app.config['UPLOAD_FOLDER'],
                           decoded_jwt['userId'] + '-' + file.filename)
    file.save(os.path.join(saved_img))
    to_add = (decoded_jwt['userId'],
              data['title'],
              data['description'],
              saved_img)
    try:
        c.execute('INSERT INTO Issues (userId, title, description, image) \
            VALUES (?, ?, ?, ?)', to_add)
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
        
    


    
