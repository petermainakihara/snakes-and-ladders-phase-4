from flask import Blueprint, request, jsonify
from database import db
from models import Game, Player
from datetime import datetime

game_bp = Blueprint("game", __name__)

# ✅ Start a new game
@game_bp.route("/start", methods=["POST"])
def start_game():
    data = request.get_json()
    player_name = data.get("player_name", "Player 1")

    # 🧠 Create a new game
    new_game = Game(start_time=datetime.utcnow(), status="active")
    db.session.add(new_game)
    db.session.commit()

    # 🧍 Create a new player linked to this game
    player = Player(name=player_name, position=1, game_id=new_game.id)
    db.session.add(player)
    db.session.commit()

    return jsonify({
        "message": f"Game started successfully for {player_name}",
        "game_id": new_game.id,
        "player": {"id": player.id, "name": player.name, "position": player.position}
    }), 201


# 🎲 Record a move
@game_bp.route("/move", methods=["POST"])
def record_move():
    data = request.get_json()
    game_id = data.get("game_id")
    player_id = data.get("player_id")
    dice_roll = data.get("dice_roll")

    if not all([game_id, player_id, dice_roll]):
        return jsonify({"error": "Missing required fields"}), 400

    player = Player.query.filter_by(id=player_id, game_id=game_id).first()
    if not player:
        return jsonify({"error": "Player not found"}), 404

    # Update player position
    new_position = player.position + dice_roll
    if new_position > 100:
        new_position = player.position

    player.position = new_position
    db.session.commit()

    return jsonify({
        "message": f"Move recorded for player {player.name}",
        "new_position": player.position
    }), 200


# 📜 Game history
@game_bp.route("/history", methods=["GET"])
def game_history():
    game_id = request.args.get("game_id")
    if not game_id:
        return jsonify({"error": "game_id is required"}), 400

    players = Player.query.filter_by(game_id=game_id).all()
    if not players:
        return jsonify({"error": "No players found for this game"}), 404

    history = [
        {"id": p.id, "name": p.name, "position": p.position}
        for p in players
    ]

    return jsonify({
        "game_id": game_id,
        "players": history
    }), 200
