import json
import os


folder_player = "../players/"


def check_player(player):
    file = folder_player + str(player) + ".json"
    if not os.path.isfile(file):
        f = open(file, "w")
        data = {"name": player, "score": {}}
        f.write(json.dumps(data))
        f.close()


def get_score_player(player):
    file = folder_player + str(player) + ".json"
    f = open(file, "r")
    data = json.loads(f.read())
    f.close()
    return data["score"]


def change_score_player(player, score, blindtest):
    file = folder_player + player + ".json"
    f = open(file, "r")
    data = json.loads(f.read())
    f.close()
    if blindtest in data["score"]:
        if data["score"][blindtest] > score:
            score = data["score"][blindtest]
    data["score"][blindtest] = score
    f2 = open(file, "w")
    f2.write(json.dumps(data))
    f2.close()
    return score
