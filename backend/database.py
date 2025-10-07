from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import Flask
import os

# Initialize SQLAlchemy
db = SQLAlchemy()
migrate = Migrate()

def init_db(app: Flask):
    """
    Initializes the database with the given Flask app.
    """
    # Create instance folder if it doesn't exist
    if not os.path.exists("instance"):
        os.makedirs("instance")

    # SQLite database path
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///instance/game.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = "your_secret_key_here"  # Change this to a random secret!

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():
        db.create_all()
