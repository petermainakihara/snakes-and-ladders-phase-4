# models.py
from database import db
from datetime import datetime

# ===================================
# ✅ USER MODEL
# ===================================
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Optional: Link users to their games (if you want future expansion)
    # games = db.relationship("Game", backref="creator", lazy=True)

    def __repr__(self):
        return f"<User {self.email}>"

    def to_dict(self):
        """Return user info without exposing the password"""
        return {
            "id": self.id,
            "email": self.email,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }


# ===================================
# ✅ GAME MODEL
# ===================================
class Game(db.Model):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    start_time = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50), default="active")

    # Optional: link back to User (uncomment if needed later)
    # user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    # One-to-many: a game has many players
    players = db.relationship(
        "Player",
        backref="game",
        lazy=True,
        cascade="all, delete"
    )

    def __repr__(self):
        return f"<Game {self.id} - {self.status}>"

    def to_dict(self):
        """Return game info including its players"""
        return {
            "id": self.id,
            "status": self.status,
            "start_time": self.start_time.strftime("%Y-%m-%d %H:%M:%S"),
            "players": [player.to_dict() for player in self.players]
        }


# ===================================
# ✅ PLAYER MODEL
# ===================================
class Player(db.Model):
    __tablename__ = "players"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    position = db.Column(db.Integer, default=1)

    # Foreign key linking player to game
    game_id = db.Column(db.Integer, db.ForeignKey("games.id"), nullable=False)

    def __repr__(self):
        return f"<Player {self.name} (Game {self.game_id})>"

    def to_dict(self):
        """Return player info"""
        return {
            "id": self.id,
            "name": self.name,
            "position": self.position,
            "game_id": self.game_id
        }
