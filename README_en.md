# Blindtest Deezer

This app is linked to your deezer account and allows you to create music quizz from your own private playlists or public ones.
The number of created quizz is unlimited and you can play them an unlimited of times too. A score system is implemented to keep track of your high scores.

# Installation

## Dependencies

This project is made in Python (version 3+) and React JS. You need to install before launching it :

- Python 3
- PIP (Python installer)
- NPM (JS installer)

Then go in the console in the root of the project :

```
pip install -r requirements.txt
cd deezer-front
npm install
```

## Ask for a deezer app

You need to create an app in [Deezer](https://developers.deezer.com/) to be able to communicate between this app and your account.
You need an id `app`, a password `app_secret` and an access token `access_token`.
Once these 3 keys done, put them in `config.json` in the right place (between "")

## Server Configuration

### Localhost

If you want to play it locally in your computer, put `"localhost"` in `config.json` in the right place and keep port 5000.

### Local network

If you want to share the quizz for everyone connected to the network, run the react code a first time :
`npm start`
The IP shown is the one the other players will use to connect to the app,keep it and put it in `config.json` in `"ip"`

# Run the Server

Open a shell, go to project root with `cd` and then :

```
python3 app.py & npm start --prefix deezer-front
```

In case of a problem follow the commands below to track the error :

- In the root, Linux :`/`, Windows : `\`;

```
python3 app.py
```

- In the folder, Linux : `/deezer-front/`, Windows : `\deezer-front\`:

```
npm start
```

## Start to play

The first time you'll play, you will need to accept the diffusion of media on your computer automatically (function restricted to avoid some reasonable issue in the main sites). This choice is made next to the micro and camera, up where the search bar is.
Once done, you shouldn't not have further media problem.

#### Good Luck Have Fun.

## Limitations

A blindtest can't have more rounds than songs in the original playlist.
Each song can appear only once.
If the preview doesn't exist in the deezer database, the song can't be an answer but can be in the choices shown.
Too much participants is not well taken into account for the moment, it can be a bit messy.
