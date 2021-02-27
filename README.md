# SociDnevnik

> **NOTE:** Za korištenje fetch.js treba pomijeniti `username` i `password` u info.js
> Pupeteer je malo nestabilan pa je potrebno 

- - - -
 Tema              | Verzija                                | opis
------             | ------                                 | -----
 Potrebno za rad   | [v1.0.1](#potrebno-za-rad)             | IDE, Node.js, Dev račun
 Folders?          | [v1.0.0](#Folder-explantion)                  | Sto je koji folder
 Kako Koristiti    | [v1.0.1](#kako-koristiti-aplikaciju)   | How to what do?
 Rad applikacije   | [v1.0.1](#Preporučeni-način-rada-aplikcaije) | Flowchart galore, interakicija unutar programa
 Teams Toolkit env | [v1.0.1](https://github.com/Bepino/SociDnevnik/tree/main/Docs) | Kako pokrenuti app lokalno

- - - -
## Potrebno za rad 

#### [Node.js (LTS)](https://nodejs.org/en/download/)

   **Libraries :**\
       ├─ Puppeteer (fetch.js / Heroku>package.json) \
       ├─ readline (samo za fetch.js ) \
       ├─ fs (samo za fetch.js) \
       ├─ React (uključen u eDnevnik>package.json) \
       ├─ Express (uključen u Heroku>package.json)  
       ├─ Bull (uključen u Heroku>package.json) \
       └─ Throng (uključen u Heroku>package.json) 

#### [Microsoft Developer E5 račun](https://docs.microsoft.com/en-us/microsoftteams/platform/build-your-first-app/build-first-app-overview#set-up-your-development-account)
    └─┬ Sa CARNET računom se ne može sideloadati aplikacije na Teams pa moramo napraviti zasebni Dev račun sa zasebnim e-mailom 
      ├─ outlook radi, ne znam za ostale
      └─ Bepino@Blavor.onmicrosoft.com/5dRux6JgvHzXgB1 <- korišten za ovaj MS Teams extensioN
      
![Slika kako bi dropdown trebao izgledati](https://imgur.com/LagiYU6.png "Izgled drop downa")
- [Microsoft-365 Dev Dashboard](https://developer.microsoft.com/en-us/microsoft-365/profile/) jer mi se neda bookmarkati
    

#### [VS Code (Notepad na steroidima, potrebno zbog Teams toolkit ekstenzije)](https://code.visualstudio.com) 

    Extensions:
     ├─ Microsoft Teams Toolkit  » Da možemo napraviti app u MS Teams
     ├─ Debbuger for Edge  » Ovo gore tu ga zahtjeva (auto-install)
     ├─ Debbuger for Chrome  » Ovo gore tu ga zahtjeva (auto-install)
     ├─ ESLint » Javascript čistač
     └─ HTML CSS Support  » da .css i .html fileovi izgledaju bolje 

# Docs / Workflow 

## Folder explantion

1. Docs - ništa posebno
2. Heroku - File koji bi se trebali pokrenuti na heroku serveru za fetchanje svih potrebnih podataka
3. eDnevnik - Extension files (unutar njega se pokreće sve važno)

## Kako koristiti aplikaciju

### Fetch service
 1. Heroku server ne radi ispravno, pa fetch.js file zamjenjuje njegovu ulogu
 2. promijeniti vrijednosti `username` i `password` u info.json
 3. Pokrenuti `node fetch.js` dok puppeteer ne uspiješno scrapea podatke sa eDnevnik.

### Extension u teams
 1. Unutar eDnevnik foldera pokrenuti `npm install` zatim `npm start`, možda bude trebalo resetirati ručunalo da ispravno radi
 2. 
    1. pritiskom F5 unutar launchanog browsera otvoriti `https://localhost:3000`
    2. unutar bilo kojeg browsera kojeg ćete korsiti za otvaranje teams ekstenzije otvoriti `https://localhost:3000`
3. Unutar browsera otovriti teams u unutar `Apps` kartice otovriti ekstenziju, trebalo bi biti na vrhu stranice (može se korsiti bilo koji račun koji ima pristup aplikaciji, )
> npm start mora biti pokrenut prije otvaranja tab ekstenzije da se pokrene development server koji hosta stranicu koja se loada kao tab u teams

## Preporučeni način rada aplikcaije 

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

