import deezer

##import spotify
import random
import json
import os


class Guess:
    def __init__(self, title, artist, album):
        self.title = title
        self.artist = artist
        self.album = album


# Récupération des creds du client Deezer
def init_deezer(creds):
    return deezer.Client(
        app_id=creds["app_id"],
        app_secret=creds["app_secret"],
        access_token=creds["access_token"],
    )


def init_spotify(creds):
    return spotify.Client(creds["app_id"], creds["app_secret"])
    spotify.User.from_token(creds["access_token"])


def getting_playlist_user(platform, creds):
    if platform == "deezer":
        client = init_deezer(creds)
        user = client.get_user()
        playlists = user.get_playlists()
    else:
        if platform == "spotify":
            client = init_spotify(creds)
            user = spotify.User.from_token(creds["access_token"])
            playlists = user.get_playlists()
        else:
            return []
    tab = []
    for i in range(5):
        temp = {"id": playlists[i].id, "title": playlists[i].title}
        tab.append(temp)
    return tab


def getting_specific_playlists(platform, creds, query1):
    if platform == "deezer":
        client = init_deezer(creds)
        playlists = client.search_playlists(query1)
    else:
        if platform == "spotify":
            client = init_spotify(creds)
            playlists = client.search(query1, types=["playlist"], limit=5)
        else:
            return []

    tab = []
    for i in range(5):
        temp = {
            "id": playlists[i].id,
            "title": playlists[i].title,
            "creator": playlists[i].creator.name,
        }
        tab.append(temp)
    return tab


def create_json_blindtest(platform, creds, id, id_playlist, pseudo, nb_round):
    if platform == "deezer":
        client = init_deezer(creds)
        playlist = client.get_playlist(id_playlist)
    else:
        if platform == "spotify":
            client = init_spotify(creds)
            playlist = client.get_playlist(id_playlist)
        else:
            return []

    list_song = playlist.get_tracks()
    titres_choisis = set()
    random.seed(id)
    dicts = []
    print(len(list_song))
    if len(list_song) < nb_round:
        return True
    antiblocage = 0
    round = 1
    while nb_round >= round:
        if antiblocage > 15:
            break
        print(titres_choisis)
        titre_choisi = random.choice(list_song)
        if titre_choisi.preview != "":
            if titre_choisi.title not in titres_choisis:
                antiblocage = 0
                g = Guess(
                    titre_choisi.title,
                    titre_choisi.artist.name,
                    titre_choisi.album.cover_small,
                )
                song_list = [g]
                titres_choisis.add(titre_choisi.title)
                while len(song_list) < 4:
                    song2 = random.choice(list_song)
                    g2 = Guess(song2.title, song2.artist.name, song2.album.cover_small)
                    for song in song_list:
                        if g2.title == song.title:
                            song_list.remove(song)
                    song_list.append(g2)
                random.shuffle(song_list)
                dict_round = {
                    "round": round,
                    "answer": titre_choisi.title,
                    "guesses": [
                        vars(song_list[0]),
                        vars(song_list[1]),
                        vars(song_list[2]),
                        vars(song_list[3]),
                    ],
                    "track": titre_choisi.preview,
                }
                dicts.append(dict_round)
                round = round + 1
        antiblocage = antiblocage + 1
    dict_global = {
        "name": playlist.title,
        "creator": pseudo,
        "blindtest": dicts,
        "score": {},
    }
    file = "blindtest/" + str(id) + ".json"
    f = open(file, "a")
    f.write(json.dumps(dict_global))
    f.close()
    return False


def blindtest(id, round):
    file = "blindtest/" + str(id) + ".json"
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
    file = "blindtest/" + str(blindtest) + ".json"
    f = open(file, "r")
    data = json.loads(f.read())
    f.close()
    return data


def check_player(player):
    file = "players/" + str(player) + ".json"
    if not os.path.isfile(file):
        f = open(file, "w")
        data = {
            "name": player,
            "score" : {}
        }
        f.write(json.dumps(data))
        f.close()

def get_score_player(player):
    file = "players/" + str(player) + ".json"
    f = open(file, "r")
    data = json.loads(f.read())
    f.close()
    return data["score"]

def change_score_player(player, score, blindtest):
    file = "players/" + str(player) + ".json"
    f = open(file, "r")
    data = json.loads(f.read())
    f.close()
    data["score"][str(blindtest)] = score
    f2 = open(file, "w")
    f2.write(json.dumps(data))
    f2.close()
    return score


def get_score_bt(blindtest):
    file = "blindtest/" + str(blindtest) + ".json"
    f = open(file, "r")
    data = json.loads(f.read())
    f.close()
    return data["score"]

def change_score_bt(player, score, blindtest):
    file = "blindtest/" + str(blindtest) + ".json"
    f = open(file, "r")
    data = json.loads(f.read())
    f.close()
    data["score"][str(player)] = score
    f2 = open(file, "w")
    f2.write(json.dumps(data))
    f2.close()
    return score


def get_all_playlists():
    tab = []
    folder_path = "blindtest/"
    files = os.listdir(folder_path)
    files = [file for file in files if os.path.isfile(os.path.join(folder_path, file))]
    if not files:
        print("the folder is empty.")
    else:
        for blindtest in files:
            id = blindtest.split(".")[0]
            f = open(folder_path + blindtest, "r")
            data = json.loads(f.read())
            f.close()
            name = data["name"]
            creator = data["creator"]
            length = len(data["blindtest"])
            bl = {"id": id, "creator": creator, "name": name, "length": length}
            tab.append(bl)
    return tab
