## 🎮 `game.py`

import random # lets us roll dice randomly.
import uuid #generates unique IDs (for games & players).

# snakes and ladders map
JUMPS = {
    16: 6, 46: 25, 49: 11, 62: 19, 64: 60, 74: 53,
    89: 68, 92: 88, 95: 75, 99: 80,   # snakes
    2: 38, 7: 14, 8: 31, 15: 26, 21: 42, 28: 84,
    36: 44, 51: 67, 71: 91, 78: 98, 87: 94  # ladders
} #this dictionary shows where snakees and ladders are

class Game:# represents one snake and one ladder game
    def __init__(self, max_players=4, target=100): #constrctor in which it runs when you make a new game
        self.id = str(uuid.uuid4())# each game gets a unique id to be found later    
        self.max_players = max_players#stores how many players can play
        self.target = target#shows the winning  square
        self.players = []  # list of dicts to keep track of players
        self.turn = 0#keeps track of whose turn it is (an index into the players list).
        self.winner = None#store the winner
        self.started = False#shows if the game has startedand becomes true when max players join

    def add_player(self, name):# a method to add a player to the game
        if len(self.players) >= self.max_players:
            return None #if game is full dont add player
        player = {"id": str(uuid.uuid4()), "name": name, "position": 0}# create new playor dictionary
        self.players.append(player)#add new player to list
        if len(self.players) == self.max_players:
            self.started = True# if max players reached start game
        return player#return the new player information

    def roll(self, player_id):#method to roll the dice
        if not self.started or self.winner:
            return None, "Game not ready or already finished"#if game hasnt started or is finisheed do not allow rolliong

        current_player = self.players[self.turn]# get player whose turn it is
        if current_player["id"] != player_id:
            return None, "Not your turn"#if someone tries to roll and is not their turn block it

        dice = random.randint(1, 6)#roll the dice get a random number frim 1 to 6
        new_pos = current_player["position"] + dice #move pplayer

        if new_pos > self.target:
            new_pos = current_player["position"]  # overshoot, no move (going beyond 100 )

        # snakes or ladders
        new_pos = JUMPS.get(new_pos, new_pos)# if the square has a snake or ladder move to mapped square..ifnot stay landed
        current_player["position"] = new_pos#update player position

        result = {
            "player": current_player["name"],
            "roll": dice,
            "new_position": new_pos
        }# store results of what happened

        # check winner
        if new_pos == self.target:
            self.winner = current_player
            result["winner"] = current_player["name"]# if player reach 100 is a win

        # next turn
        self.turn = (self.turn + 1) % len(self.players)#change turn to next player
        return result, None# return the result of the roll

    def state(self):# shows game current state
        return {
            "id": self.id,
            "players": self.players,
            "turn": self.turn,
            "winner": self.winner,
            "started": self.started
        }#return everything about the game  
