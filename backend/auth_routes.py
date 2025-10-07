from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database import db
from models import User

auth_bp = Blueprint("auth", __name__)

#SIGNUP ROUTE
@auth_bp.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Missing JSON body"}), 400

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not username or not email or not password:
            return jsonify({"error": "All fields (username, email, password) are required"}), 400

        # Check if user already exists
        existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
        if existing_user:
            return jsonify({"error": "User with this username or email already exists"}), 409

        # Create new user
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, email=email, password_hash=hashed_password)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "message": "Signup successful",
            "user": {
                "id": new_user.id,
                "username": new_user.username,
                "email": new_user.email
            }
        }), 201

    except Exception as e:
        print("Signup error:", e)
        return jsonify({"error": "Internal server error", "details": str(e)}), 500


# LOGIN ROUTE

@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Missing JSON body"}), 400

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # Find user
        user = User.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password_hash, password):
            return jsonify({"error": "Invalid email or password"}), 401

        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        }), 200

    except Exception as e:
        print("Login error:", e)
        return jsonify({"error": "Internal server error", "details": str(e)}), 500


#PROFILE ROUTE (Test)
@auth_bp.route("/profile", methods=["GET"])
def profile():
    try:
        # This is just a placeholder for testing
        return jsonify({
            "message": "Profile route working correctly!",
            "status": "OK"
        }), 200

    except Exception as e:
        print("Profile error:", e)
        return jsonify({"error": "Internal server error", "details": str(e)}), 500
