# SociDnevnik

> **NOTE:** Za korištenje fetch.js treba pomijeniti `username` i `password` u info.js

- - - -
 Tema              | Verzija                                | opis
------             | ------                                 | -----
 Potrebno za rad   | [v1.0.0](#potrebno-za-rad)             | IDE, Node.js, Dev račun
 Rad applikacije   | [v1.0.0](#preprouka-za-rad-aplikcaije) | Flowchart galore, interakicija unutar programa
 Teams Toolkit env | [v1.0.0](https://github.com/Bepino/SociDnevnik/tree/main/Docs) | Kako pokrenuti app lokalno

- - - -
## Potrebno za rad 

#### [Node.js (LTS)](https://nodejs.org/en/download/)

   **Libraries :**\
       ├─ Puppeteer (samo za fetch.js) \
       ├─ readline (samo za fetch.js ) \
       └─ fs (samo za fetch.js)

#### [Microsoft Developer E5 račun](https://docs.microsoft.com/en-us/microsoftteams/platform/build-your-first-app/build-first-app-overview#set-up-your-development-account)
    └─┬ Sa CARNET računom se ne može sideloadati aplikacije na Teams pa moramo napraviti zasebni Dev račun sa zasebnim e-mailom 
      ├─ outlook radi, ne znam za ostale
      └─ samo prati link , odma te stavi na dio stranice sa tim dijelom, i trebao bi biti drop down
      
![Slika kako bi dropdown trebao izgledati](https://imgur.com/LagiYU6.png "Izgled drop downa")
- [Microsoft-365 Dev Dashboard](https://developer.microsoft.com/en-us/microsoft-365/profile/) jer mi se neda bookmarkati
    

#### [VS Code (Notepad na steroidima, potrebno zbog Teams toolkit ekstenzije)](https://code.visualstudio.com) 

    Extensions:
     ├─ Microsoft Teams Toolkit  » Da možemo napraviti app
     ├─ Debbuger for Edge  » Ovo gore tu ga zahtjeva iz nekog razloga
     ├─ Debbuger for Chrome  » Ovo gore tu ga zahtjeva iz nekog razloga
     ├─ ESLint » Javascript stvar
     └─ HTML CSS Support  » da .css i .html fileovi izgledaju bolje 

# Docs / Workflow 

Ideje i stvari 

## Preprouka za rad aplikcaije 

![Flowchart bonanza](https://imgur.com/AZXCa8x.png "Wow!!!")    

> *Edit:* viewer -> tab 

### Display service
-   Spaja vizualizacije iz `Add-on-service` i `Fetch-service` podatke u nešto što korisnik zapravo može vidjeti

### Add-on service
-   Stvara grafove i ostale vizualizacije itd..

### Fetch service
-   dohvaća podatke od ocjene.skole.hr
-   pretvara ih u nešto korisno za `Add-on-service` i `Display-service`

    ![Fetch service flowchart bonanza](https://imgur.com/y7j01A8.png "Nice!!! very wow!!! :(")

