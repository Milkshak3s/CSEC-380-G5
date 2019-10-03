from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random
import string


app = Flask(__name__)
app.config.from_pyfile('test.cfg')
db = SQLAlchemy(app)
cors = CORS(app, resources={r"{}/*".format("/api/v1"): {"origins": "*"}})


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column('user_id', db.Integer, primary_key=True)
    username = db.Column(db.String(128))
    password = db.Column(db.String(128))
    auth_token = db.Column(db.String(128))

    def __init__(self, username, password):
        self.username = username
        self.password = password


def init_db():
    db.drop_all()
    db.create_all()
    admin = User("admin", "adminpassword")
    db.session.add(admin)
    db.session.commit()


@app.route('/api/v1/auth', methods=['POST'])
def auth_user():
    request_data = request.get_json()
    if request_data is None:
        return jsonify({'error': 'Need body in POST'})
    if request_data.get('username', None) is None:
        return jsonify({'error': 'Username is required'})
    if request_data.get('password', None) is None:
        return jsonify({'error': 'Password is required'})
    else:
        new_key = None
        matching_user = User.query.filter_by(username=request_data.get('username')).first()
        if matching_user is None:
            pass
        elif matching_user.password == request_data.get('password'):
            new_key = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(128)])
            matching_user.auth_token = new_key

        db.session.commit()

        if new_key is None:
            return jsonify({'error': 'Invalid login'})
        else:
            return jsonify({'token': new_key})


@app.route('/api/v1/token', methods=['POST'])
def check_token():
    request_data = request.get_json()
    if request_data is None:
        return jsonify({'error': 'Need body in POST'})
    if request_data.get('token', None) is None:
        return jsonify({'error': 'Token is required'})
    else:
        matching_user = None
        try:
            matching_user = User.query.filter_by(auth_token=request_data.get('token')).one()
        except Exception:
            return jsonify({'error': 'Invalid token'})

        return jsonify({'username': matching_user.username})


init_db()

if __name__ == '__main__':
    app.run()
