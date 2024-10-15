import json
import os

bt_folder = "../blindtest/"


def get_all_playlists():
    tab = []
    files = os.listdir(bt_folder)
    files = [file for file in files if os.path.isfile(os.path.join(bt_folder, file))]
    if not files:
        print("the folder is empty.")
    else:
        for blindtest in files:
            id = blindtest.split(".")[0]
            f = open(bt_folder + blindtest, "r")
            data = json.loads(f.read())
            f.close()
            name = data["name"]
            creator = data["creator"]
            length = len(data["blindtest"])
            bl = {"id": id, "creator": creator, "name": name, "length": length}
            tab.append(bl)
    return tab


def blindtest(id, round):
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


def get_blindtest(blindtest):
    file = bt_folder + str(blindtest) + ".json"
    f = open(file, "r")
    data = json.loads(f.read())
    f.close()
    return data


def get_score_bt(blindtest):
    file = bt_folder + str(blindtest) + ".json"
    f = open(file, "r")
    data = json.loads(f.read())
    f.close()
    return data["score"]


def change_score_bt(player, score, blindtest):
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
