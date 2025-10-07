# routes/auth_routes.py

from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database import db
from models import User

auth_bp = Blueprint("auth", __name__)

<<<<<<< HEAD
# ----------------------------------
# ✅ SIGNUP (Email-based)
# ----------------------------------
=======
#SIGNUP ROUTE
>>>>>>> origin/main
@auth_bp.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json() or {}

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Both email and password are required"}), 400

        # 🔹 Check if email exists
        if User.query.filter_by(email=email).first():
            return jsonify({"error": "Email already exists"}), 409

        # 🔹 Create new user
        hashed_password = generate_password_hash(password)
        new_user = User(email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "message": "Signup successful",
            "user": {"id": new_user.id, "email": new_user.email}
        }), 201

    except Exception as e:
        print("Signup error:", e)
        db.session.rollback()
        return jsonify({"error": "Internal server error"}), 500


<<<<<<< HEAD
# ----------------------------------
# ✅ LOGIN
# ----------------------------------
=======
# LOGIN ROUTE

>>>>>>> origin/main
@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json() or {}

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        user = User.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password, password):
            return jsonify({"error": "Invalid email or password"}), 401

        return jsonify({
            "message": "Login successful",
            "user": {"id": user.id, "email": user.email}
        }), 200

    except Exception as e:
        print("Login error:", e)
        db.session.rollback()
        return jsonify({"error": "Internal server error"}), 500


<<<<<<< HEAD
# ----------------------------------
# ✅ PROFILE TEST
# ----------------------------------
=======
#PROFILE ROUTE (Test)
>>>>>>> origin/main
@auth_bp.route("/profile", methods=["GET"])
def profile():
    return jsonify({
        "message": "Profile route working correctly!",
        "status": "OK"
    }), 200
