from flask import Blueprint, request, jsonify
from database import db
from models import Game, Player
from datetime import datetime

game_bp = Blueprint("game", __name__)

# -------------------------------
# ✅ Start a new game
# -------------------------------
@game_bp.route("/start", methods=["POST"])
def start_game():
    try:
        data = request.get_json()
        if not data or "players" not in data:
            return jsonify({"error": "Missing 'players' in request body"}), 400

        player_names = data["players"]

        # Create a new game
        new_game = Game(status="active")
        db.session.add(new_game)
        db.session.commit()  # Need ID for players

        # Create players
        created_players = []
        for name in player_names:
            player = Player(name=name, position=1, game_id=new_game.id)
            db.session.add(player)
            created_players.append(player)

        db.session.commit()

        return jsonify({
            "id": new_game.id,
            "status": new_game.status,
            "players": [p.to_dict() for p in created_players]
        }), 201

    except Exception as e:
        print("Start game error:", e)
        db.session.rollback()
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

# -------------------------------
# ✅ Move a player
# -------------------------------
@game_bp.route("/move", methods=["POST"])
def move_player():
    try:
        data = request.get_json()
        game_id = data.get("game_id")
        player_id = data.get("player_id")
        steps = data.get("steps")

        if not game_id or not player_id or not steps:
            return jsonify({"error": "game_id, player_id, and steps are required"}), 400

        player = Player.query.filter_by(id=player_id, game_id=game_id).first()
        if not player:
            return jsonify({"error": "Player not found in this game"}), 404

        # Move player
        player.position += int(steps)
        if player.position > 100:
            player.position = 100  # Max board position
        db.session.commit()

        # Return updated game data
        game = Game.query.get(game_id)
        return jsonify({
            "id": game.id,
            "status": game.status,
            "players": [p.to_dict() for p in game.players]
        }), 200

    except Exception as e:
        print("Move player error:", e)
        db.session.rollback()
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

# -------------------------------
# ✅ Get game history
# -------------------------------
@game_bp.route("/history", methods=["GET"])
def game_history():
    try:
        game_id = request.args.get("game_id")
        if not game_id:
            return jsonify({"error": "Missing game_id parameter"}), 400

        game = Game.query.get(game_id)
        if not game:
            return jsonify({"error": "Game not found"}), 404

        return jsonify({
            "id": game.id,
            "status": game.status,
            "players": [p.to_dict() for p in game.players]
        }), 200

    except Exception as e:
        print("Game history error:", e)
        return jsonify({"error": "Internal server error", "details": str(e)}), 500
