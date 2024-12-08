import json
from bson import ObjectId
import os

bt_folder = "../blindtest/"


def get_all_playlists(bt_db):
    result = []
    for bt in bt_db.find():
        bt["_id"] = str(bt["_id"])
        result.append(bt)
    return result


def blindtest(id, round, bt_db):
    query = {"_id": id, blindtest: {"round": round}}
    result = bt_db.find_one(query)
    print(result)
    file = bt_folder + str(id) + ".json"
    f = open(file, "r")
    json_recup = f.read()
    json_formatte = json.loads(json_recup)
    non_trouve = True
    x = 0
    if len(json_formatte["blindtest"]) < int(round):
        return {"answer": "FIN", "guesses": "FIN", "track": "FIN"}
    while non_trouve:
        if json_formatte["blindtest"][x]["round"] == int(round):
            print(json_formatte["blindtest"][x])
            non_trouve = False
        else:
            x = x + 1
    f.close()
    return json_formatte["blindtest"][x]


def get_blindtest(blindtest, bt_db):
    file = bt_folder + str(blindtest) + ".json"
    f = open(file, "r")
    data = json.loads(f.read())
    f.close()
    return data


def get_score_bt(blindtest, bt_db):
    file = bt_folder + str(blindtest) + ".json"
    f = open(file, "r")
    data = json.loads(f.read())
    f.close()
    return data["score"]


def change_score_bt(player, score, blindtest, bt_db):
    file = bt_folder + blindtest + ".json"
    f = open(file, "r")
    data = json.loads(f.read())
    f.close()
    if player in data["score"]:
        if data["score"][player] > score:
            score = data["score"][player]

    data["score"][player] = score
    f2 = open(file, "w")
    f2.write(json.dumps(data))
    f2.close()
    return score
