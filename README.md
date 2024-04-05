# Blindtest Deezer

[README ENGLISH](/README_en.md)

Cette application est liée à votre compte deezer et permet de créer des blindtests à partir de vos playlists privées et des playlists publiques.
Le nombre de blindtests créé est illimité et vous pouvez rejouer autant de fois que vous voulez. Un système de score permet de garder en mémoire les meilleurs performances.

# Installation

## Dépendences

Ce projet est à la fois en Python (version 3+) et en React JS. Vous aurez donc besoin d'avoir installé au préalable sur votre ordinateur Python 3, PIP (Installateur Python), NPM (Installateur JS)

Vous devrez donc une fois dans la racine du projet inscrire ces commandes :

```
pip install -r requirements.txt
cd deezer-front
npm install
```

## Faire une demande d'application Deezer

Vous devrez créer une application du côté du développement de [Deezer](https://developers.deezer.com/)
Vous aurez besoin d'un ID de l'application `app`, de son mot de passe `app_secret` ainsi que d'un token d'accès `access_token`.
Une fois ces 3 données récupérées, mettez-les dans `config.json` à l'endroit prévu (entre les "")

## Configuration Serveur

### Localhost

Si vous souhaitez seulement tester sur votre ordinateur, indiquez `"localhost"` dans `config.json` à l'endroit défini tout en gardant le port 5000.

### Réseau local

Si vous souhaitez diffuser à tous les utilisateurs d'un réseau local, lancez le code react :
`npm start`
Récupérez l'ip utilisée qui sera toujours la même temps que vous restez sur ce réseau avec cet ordinateur.
Mettez cet IP dans `config.json` dans `"ip"`

# Lancer le Serveur

Ouvrez une console de commande, déplacez vous vers la racine du projet avec `cd` puis inscrivez cette commande :

```
python3 app.py & npm start --prefix deezer-front
```

En cas de problème, ouvrez 2 console de commandes :

- l'une à la racine du projet, Linux :`/`, Windows : `\`;

```
python3 app.py
```

- l'autre dans le dossier, Linux : `/deezer-front/`, Windows : `\deezer-front\`:

```
npm start
```

## Commencer à jouer

La première fois que vous jouez vous aurez besoin d'accepter la diffusion de média automatiquement. Normalement situé en haut sur la barre de recherche avec un micro ou une caméra.
En effet le jeu nécessite de lancer la musique dès que vous ouvrez la page.
Une fois accepté vous pouvez jouer à l'infini.

#### Bonne session de jeu.

## Limitations

Un blindtest ne peut pas avoir plus de rounds que de chansons.
Une chanson ne peut apparaître qu'une seule fois en tant que réponse.
Si la preview n'existe pas la chanson ne peut pas être la réponse, cependant elle peut tout de même apparaître en tant que choix possible.
Un nombre trop important de score n'est pas prévu pour le moment mais devrait tout de même s'enregistrer normalement.
