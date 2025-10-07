from flask import Flask, jsonify
from flask_cors import CORS
from database import db
from models import User, Game, Player
from auth_routes import auth_bp
from game_routes import game_bp
import os

def create_app():
    app = Flask(__name__)

    
    #  App Configuration
    
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    INSTANCE_DIR = os.path.join(BASE_DIR, "instance")
    os.makedirs(INSTANCE_DIR, exist_ok=True)

    db_path = os.path.join(INSTANCE_DIR, "snakes_ladders.db")

    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "supersecretkey")

    
    #  Enable CORS for Frontend Access
    
    # This allows requests from your React app at http://localhost:5173
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

    
    #  Initialize Database
    
    db.init_app(app)

   
    #  Register Blueprints
    
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(game_bp, url_prefix="/game")

   
    #  Create Tables Automatically
    
    with app.app_context():
        db.create_all()

    # 
    #  Root Route (API Status Check)
    
    @app.route("/")
    def index():
        return jsonify({
            "message": "🐍 Snakes & Ladders Backend is running successfully!",
            "status": "OK",
            "endpoints": {
                "auth": ["/auth/signup", "/auth/login", "/auth/profile"],
                "game": ["/game/start", "/game/move", "/game/history"]
            }
        }), 200

     # Test Route for Frontend Connection
    
    @app.route("/api/test")
    def test_api():
        return jsonify({"message": "Backend is connected successfully!"}), 200

    return app



#  Run Server

if __name__ == "__main__":
    app = create_app()
    # Use 0.0.0.0 to be accessible across local network (optional)
    app.run(host="0.0.0.0", port=5000, debug=True)
