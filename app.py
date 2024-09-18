from flask import Flask, jsonify, request
from main import (
    blindtest,
    create_json_blindtest,
    get_score_player,
    change_score_player,
    change_score_bt,
    getting_playlist_user,
    getting_specific_playlists,
    get_blindtest,
    get_all_playlists,
    check_player,
)
from flask_cors import CORS, cross_origin
import random
import json
import string

with open("config.json") as config_file:
    config_data = json.load(config_file)

app = Flask(__name__)

server_settings = config_data["server_settings"]
creds = config_data["deezer_settings"]
platform = config_data["platform"]

CORS(app, supports_credentials=True)


# Call qui récupère mes playlists pour les avoir rapidement.
@app.route("/get_own_playlists/", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_own_playlists():
    tab_playlists = getting_playlist_user(platform, creds)
    return jsonify({"playlists": tab_playlists})


# Call qui récupèrent des playlists selon une query (text)
@app.route("/get_specific/", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_specific():
    query = request.args
    print(query["query"])
    tab_playlists = getting_specific_playlists(platform, creds, query["query"])
    return jsonify({"playlists": tab_playlists})


# Call pour créer le JSON du blindtest grâce à l'id de la playlist et le nombre de round demandé
@app.route("/generate_blindtest/<id_playlist>/<pseudo>/<nb_round>/", methods=["GET"])
@cross_origin(supports_credentials=True)
def create_blindtest(id_playlist, pseudo, nb_round):
    id_blindtest = random.choices(string.ascii_letters + string.digits, k=6)
    id = ""
    for k in id_blindtest:
        id = id + str(k)
    if len(pseudo) > 4:
        bt_name = pseudo[0:4] + id
    else:
        bt_name = pseudo + id
    error = create_json_blindtest(
        platform, creds, bt_name, id_playlist, pseudo, int(nb_round)
    )
    if error:
        id_blindtest = "TOO MUCH"
    return jsonify({"id": bt_name})


# Call qui appelle l'instance de round d'un blindtest
@app.route("/blindtest/<id>/<round>/", methods=["GET"])
@cross_origin(supports_credentials=True)
def launch_blindtest(id, round):
    result = blindtest(id, round)
    return jsonify(
        {
            "result": result["answer"],
            "songs": result["guesses"],
            "track": result["track"],
        }
    )


# Call pour récupérer le score d'un joueur
@app.route("/score/<player>/<id>/", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def score(player, id):
    if request.method == "GET":
        score = get_score_player(player)
        for bt in score:
            if bt["id"] == id:
                return jsonify({"score": bt["score"]})
        return jsonify({"score": 0})
    if request.method == "POST":
        temp = request.get_json()
        print(str(temp))
        score = change_score_player(player, temp["score"], id)
        print(score)
        score = change_score_bt(player, temp["score"], id)
        print(score)
        return jsonify({"score": score})


# Call qui récupère tous les scores d'un blindtest
@app.route("/get_all_score/<id>/", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_bt_scores(id):
    blindtest = get_blindtest(id)
    return jsonify({"score": blindtest["score"]})


# Call qui récupère tous les scores d'un blindtest
@app.route("/get_all_playlists/", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_playlists():
    playlists = get_all_playlists()
    return jsonify({"playlists": playlists})


# Call création si besoin d'un joueur
@app.route("/get_player/", methods=["POST"])
@cross_origin(supports_credentials=True)
def get_player():
    temp = request.get_json()
    check_player(temp["name"])
    return temp


# Call pour récupérer les scores d'un joueur
@app.route("/get_score/<id>/", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_player_score(id):
    score = get_score_player(id)
    tab = []
    for k, v in score.items():
        bt = get_blindtest(k)
        info = {"nom": bt["name"], "score": v, "rounds": len(bt["blindtest"])}
        tab.append(info)
    return jsonify({"scores": tab})


if __name__ == "__main__":
    app.run(
        host=server_settings["ip"],
        port=server_settings["port"],
        debug=True,
        threaded=False,
    )
