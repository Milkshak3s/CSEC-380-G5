from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename
from hashlib import sha256
import os
import random
import string


app = Flask(__name__)
app.config.from_pyfile('test.cfg')
db = SQLAlchemy(app)
cors = CORS(app, resources={r"{}/*".format("/api/v1"): {"origins": "*"}})

ALLOWED_EXTENSIONS = set(['mp4'])


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column('user_id', db.Integer, primary_key=True)
    username = db.Column(db.String(128))
    password = db.Column(db.String(128))
    auth_token = db.Column(db.String(128))

    def __init__(self, username, password):
        self.username = username
        self.set_password(password)

    def set_password(self, password):
        self.password = str(sha256(password.encode()).hexdigest())
        #self.password = password # old, stores in plaintext, TESTING ONLY

    def check_password(self, password):
        pwd_test = str(sha256(password.encode()).hexdigest())
        #pwd_test = passworda # old, used if passwords plaintext, TESTING ONLY
        return self.password == pwd_test

class Video(db.Model):
    __tablename__ = 'videos'
    id = db.Column('user_id', db.Integer, primary_key=True)
    username = db.Column(db.String(128))
    title = db.Column(db.String(128))
    description = db.Column(db.String(2048))
    video_link = db.Column(db.String(128))
    thumbnail_link = db.Column(db.String(128))

    def __init__(self, username, title, description, video_link, thumbnail_link):
        self.username = username
        self.title = title
        self.description = description
        self.video_link = video_link
        self.thumbnail_link = thumbnail_link


def init_db():
    db.drop_all()
    db.create_all()
    admin = User("admin", "adminpassword")
    milkshak3s = User("Milkshak3s", "adminpassword")
    db.session.add(admin)
    db.session.add(milkshak3s)
    db.session.commit()


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def check_token_user(token):
    matching_user = None
    try:
        matching_user = User.query.filter_by(auth_token=token).one()
    except Exception:
        return None

    return matching_user.username


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
        elif matching_user.check_password(request_data.get('password')):
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
        matching_user = check_token_user(request_data.get('token'))
        if matching_user is None:
            return jsonify({'error': 'Invalid token'})
        return jsonify({'username': matching_user})


@app.route('/api/v1/videos/upload', methods=['POST'])
def upload_file():
    request_data = request.form
    token = request_data.get("token")
    title = request_data.get("title")
    desc = request_data.get("description")
    video_link = request_data.get("video_link")

    # part checking
    if request_data is None:
        return jsonify({'error': 'Need body in POST'})
    if token is None:
        return jsonify({'error': 'Missing auth token'})
    if title is None:
        return jsonify({'error': 'Missing title'})
    if desc is None:
        return jsonify({'error': 'Missing description'})

    # user checking
    matching_user = check_token_user(token)
    if matching_user is None:
        return jsonify({'error': 'Invalid token'})

    # file checking
    if 'file' not in request.files:
        if video_link is None:
            return jsonify({'error': 'No file part or video_link'})
        else:
            # create DB object
            new_video = Video(matching_user, title, desc, video_link, "")
            db.session.add(new_video)
            db.session.commit()
            return jsonify({'file': video_link})

    # process file
    file = request.files['file']
    video_url = ""
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        video_url = '{}/static/{}'.format(app.config['HOSTLOC'], filename)

        # create DB object
        new_video = Video(matching_user, title, desc, video_url, "")
        db.session.add(new_video)
        db.session.commit()
        return jsonify({'file': video_url})


@app.route('/api/v1/videos', methods=['GET'])
def get_videos():
    # TODO: Check auth header
    matching_videos = Video.query.all()
    json_return = []
    for video in matching_videos:
        video_data = {
            'id': video.id,
            'title': video.title,
            'description': video.description,
            'username': video.username,
            'video_link': video.video_link,
            'thumbnail_link': video.thumbnail_link
        }
        json_return.append(video_data)

    return jsonify(json_return)


@app.route('/api/v1/videos/<int:video_id>', methods=['GET', 'DELETE'])
def get_single_video(video_id):
    # TODO: Check auth header
    try:
        matching_video = Video.query.filter_by(id=video_id).one()
    except Exception:
        return jsonify({'error': 'video with id {} not found'.format(video_id)})
    if matching_video is None:
        return jsonify({'error': 'video with id {} not found'.format(video_id)})

    if request.method == "GET":

        video_link = matching_video.video_link
        if video_link[0:4] != "http":
            video_link = "http://" + video_link

        video_data = {
            'id': matching_video.id,
            'title': matching_video.title,
            'description': matching_video.description,
            'username': matching_video.username,
            'video_link': video_link,
            'thumbnail_link': matching_video.thumbnail_link
        }

        return jsonify(video_data)

    if request.method == "DELETE":
        db.session.delete(matching_video)
        db.session.commit()

        return jsonify({'message': 'success'})

    return jsonify({'error': 'invalid method'})

@app.route('/api/v1/cmdinjection', methods=['POST'])
def cmdinjection():
    """
    Description: Command injection endpoint to demonstrate command injection vulnerability.
    The frontend will have "ping this IP address!" as a input form, and attacker can 
    perform command injection through "8.8.8.8; whoami" .

    POST Param:
        - (str) cmd: Command to be executed. 
    """
    #TODO: Check auth header

    # Error checking for POST request 
    request_data = request.form
    if request_data is None:
        return jsonify({'error': 'Need cmd parameter in POST'})
    if request_data.get('cmd', None) is None:
        return jsonify({'error': 'cmd parameter cannot be null'})

    # Command Injection happens here 
    else:
        userinput = request_data.get('cmd')
        payload = 'ping -c 2 ' + userinput 
        stream = os.popen(payload)
        output = stream.read()

        return jsonify({'result': output})


init_db()

if __name__ == '__main__':
    app.run()
