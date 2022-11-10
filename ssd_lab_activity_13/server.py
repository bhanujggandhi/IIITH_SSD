from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask import Blueprint, render_template
from flask_login import login_required, current_user
import os
from flask import Blueprint, render_template, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, logout_user

app = Flask(__name__)
baseDir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(baseDir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)


class User(db.Model):
    name = db.Column(db.String(100))
    email = db.Column(db.String(50), primary_key=True)
    password = db.Column(db.String(100))

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password


with app.app_context():
    db.create_all()


class UserSchema(ma.Schema):
    class Meta:
        fields = ('name', 'email', 'password')



auth = Blueprint('auth', __name__)

@app.route('/user/login')
def login():
    return render_template('login.html')

@app.route('/user/login', methods=['POST'])
def login_post():
    email = request.form.get('email')
    password = request.form.get('password')
    remember = True if request.form.get('remember') else False

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        flash('Please check your login details and try again.')
        return redirect(url_for('auth.login'))
    
    login_user(user, remember=remember)
    return redirect(url_for('main.profile'))


@app.route('/user/signup')
def signup():
    return render_template('signup.html')

@app.route('/user/signup', methods=['POST'])
def signup_post():
    email = request.form.get('email')
    name = request.form.get('name')
    password = request.form.get('password')

    user = User.query.filter_by(email=email).first()

    if user:
        flash('Email address already exists')
        return redirect(url_for('auth.signup'))

    new_user = User(email=email, name=name, password=generate_password_hash(password, method='sha256'))

    db.session.add(new_user)
    db.session.commit()

    return redirect(url_for('auth.login'))

@app.route('/user/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/profile')
# @login_required
def profile():
    return render_template('profile.html', name=current_user.name)

user_schema = UserSchema()
users_schema = UserSchema()
if __name__ == "__main__":
    app.run(debug=True)
