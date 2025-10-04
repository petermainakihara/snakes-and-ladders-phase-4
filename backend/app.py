from flask import Flask, request, jsonify
from game import Game

app = Flask(__name__)#create the app (flask)

games = {}  # simple in-memory store for games

@app.route("/")
def index():
    return {"message": "Snakes & Ladders backend running!"}

@app.route("/game", methods=["POST"])
def create_game():
    g = Game(max_players=2)
    games[g.id] = g
    return {"game_id": g.id, "state": g.state()}

@app.route("/game/<gid>/join", methods=["POST"])
def join_game(gid):
    game = games.get(gid)
    if not game:
        return {"error": "Game not found"}, 404
    data = request.json or {}
    name = data.get("name", "Player")
    player = game.add_player(name)
    if not player:
        return {"error": "Game full"}, 400
    return {"player": player, "state": game.state()}

@app.route("/game/<gid>/roll", methods=["POST"])
def roll(gid):
    game = games.get(gid)
    if not game:
        return {"error": "Game not found"}, 404
    data = request.json or {}
    pid = data.get("player_id")
    result, error = game.roll(pid)
    if error:
        return {"error": error}, 400
    return {"result": result, "state": game.state()}

@app.route("/game/<gid>/state", methods=["GET"])
def state(gid):
    game = games.get(gid)
    if not game:
        return {"error": "Game not found"}, 404
    return game.state()

if __name__ == "__main__":
    app.run(debug=True)
