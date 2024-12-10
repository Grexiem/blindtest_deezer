import deezer

##import spotify
import random
import json


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


def getting_playlist_user(creds):
    client = init_deezer(creds)
    user = client.get_user()
    playlists = user.get_playlists()
    tab = []
    for i in range(5):
        temp = {"id": playlists[i].id, "title": playlists[i].title}
        tab.append(temp)
    return tab


def getting_specific_playlists(creds, query1):
    client = init_deezer(creds)
    playlists = client.search_playlists(query1)
    tab = []
    for i in range(5):
        temp = {
            "id": playlists[i].id,
            "title": playlists[i].title,
            "creator": playlists[i].creator.name,
        }
        tab.append(temp)
    return tab


def create_json_blindtest(creds, id_playlist, pseudo, nb_round, bt_db):
    client = init_deezer(creds)
    playlist = client.get_playlist(id_playlist)
    list_song = playlist.get_tracks()
    titres_choisis = set()
    dicts = []
    print(len(list_song))
    if len(list_song) < nb_round:
        return True
    antiblocage = 0
    round = 1
    while nb_round >= round:
        if antiblocage > 100:
            break
        titre_choisi = random.choice(list_song)
        if titre_choisi.preview != "" and titre_choisi.preview[-4:] == ".mp3":
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
    bt_db.insert_one(dict_global)
    return False
