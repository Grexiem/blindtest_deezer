import json
from bson import ObjectId

bt_folder = "../blindtest/"


def get_all_playlists(bt_db):
    result = []
    for bt in bt_db.find():
        bt["_id"] = str(bt["_id"])
        result.append(bt)
    return result


def blindtest(id, round, bt_db):
    query = {"_id": ObjectId(id)}
    print(query)
    print("round : " + round)
    pipeline = [
        {"$match": query},
        {"$unwind": "$blindtest"},
        {"$match": {"blindtest.round": int(round)}},
    ]
    pipeline_result = bt_db.aggregate(pipeline)
    result = pipeline_result.to_list()
    if pipeline_result == None or len(result) == 0:
        return {"answer": "FIN", "guesses": "FIN", "track": "FIN"}
    print(result)

    result = result.pop()["blindtest"]
    return {
        "answer": result["answer"],
        "guesses": result["guesses"],
        "track": result["track"],
    }


def get_blindtest(id_blindtest, bt_db):
    query = {"_id": id_blindtest}
    result = bt_db.find_one(query)
    return result


def get_score_bt(id_blindtest, bt_db):
    query = {"_id": id_blindtest}
    result = bt_db.find_one(query)
    return result["score"]


def change_score_bt(player, score, id_blindtest, bt_db):
    query = {"_id": id_blindtest}
    result = bt_db.find_one(query)
    update_query = {"$set": {player: score}}
    if player in result["score"]:
        if result["score"][player] > score:
            bt_db.update_one(query, update_query)
    else:
        bt_db.update_one(query, update_query)
    return score
