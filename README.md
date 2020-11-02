# izneo-downloader
Un outil basique pour télécharger des bandes dessinées sur Izneo

# Installation
Cette outil utilise [NodeJS (> 15.0.0)](https://nodejs.org/en/download/current/).

Une fois NodeJS installé, vous pouvez installer cet outil:
```
npm i -g izneo-downloader
```

# Configuration

Récupérer votre Cookie une fois connecté à Izneo.

#### Chrome  
Menu --> Plus d'outils --> Outils de développements  
Application / Storage / Cookies  
et recherchez le cookie "https://www.izneo.com".

#### Firefox  
Menu --> Developpement web --> Inspecteur de stockage --> Cookies  
et recherchez le cookie "https://www.izneo.com".

Il faut ensuite ajouter une variable d'environnement nommée (voir ce [tuto de Twilio](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html) si vous ne savez pas comment faire). 

Donnez à cette variable la valeur du Cookie récupérée sur le navigateur

# Utilisation
Cet outil n'offre aucune option, il a pour vocation à être extrêmement simple et flexible pour ceux qui veulent mettre les mains dans le cambouis.

Il s'utilise evec un terminal (console ou ligne de commande selon votre OS)

Télécharger avec l'identifiant du livre:
```
izneo-downloader 12345
```

Avec l'adresse complète copiée de votre navigateur:
```
izneo-downloader "https://www.izneo.com/fr/roman-graphique/action-aventure/le-chat-du-rabbin-13312/le-chat-du-rabbin-tome-9-la-reine-de-shabbat-61987/read/16?exiturl=https:/"
```

