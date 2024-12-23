from bson import ObjectId
import pymongo

folder_player = "../players/"


def check_player(player, player_db):
    mydict = {"name": player}
    result = player_db.find_one(mydict)
    if result == None:
        player_db.insert_one(mydict)


def get_score_player(player, player_db):
    result = player_db.find_one({"name": player})
    print(result)
    for key in result.keys():
        if key == "score":
            return result["score"]
    return {}


def change_score_player(player, score, blindtest, player_db):
    myquery = {"name": player}
    result = player_db.find_one(myquery)
    if list(result.keys()).count("score") == 0:
        newvalues = {"$set": {"score": {blindtest: score}}}
        player_db.update_one(myquery, newvalues)
        return score

    if list(result["score"].keys()).count(blindtest) == 0:
        newvalues = {"$set": {"score": {blindtest: score}}}
        player_db.update_one(myquery, newvalues)
    if blindtest in result["score"]:
        if result["score"][blindtest] > score:
            score = result["score"][blindtest]
            newvalues = {"$set": {"score": {blindtest: score}}}
            player_db.update_one(myquery, newvalues)
    return score
