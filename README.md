# SociDnevnik
Docs za dev, jer CARNET   :)
\
## Potrebno za rad 

#### [Node.js (LTS opciju)](https://nodejs.org/en/download/)
   **Zašto?**\
      └─ Javascript već ućimo, C# ne znam koliko znate, plus node.js ima
        više dostupnih paketa pa brže i lakše idu stvari

   **Libraries :**\
      ├─ Node-fetch [ za raditi https zahtjeve ocjene.skole.hr ]\
      ├─ Graph.js  [ [ za crtanje grafova itd.. ](https://www.chartjs.org/docs/latest/getting-started/installation.html#npm) ]\
      └─ Neka stvar za pretvarati dobiveni response od ocjene.skole.hr u stranicu iz koje zapravo mozemo uzimat podatke

#### [Microsoft Developer E5 račun](https://docs.microsoft.com/en-us/microsoftteams/platform/build-your-first-app/build-first-app-overview#set-up-your-development-account)
-  Sa CARNET računom se ne može sideloadati aplikacije na Teams pa moramo napraviti zasebni Dev račun sa zasebnim e-mailom 
    - outlook radi, ne znam za ostale
    - samo prati link , odma te stavi na dio stranice sa tim dijelom, i trebao bi biti drop down\ ![Slika kako bi dropdown trebao izgledati](https://imgur.com/LagiYU6.png "Izgled drop downa")
    - [Microsoft-365 Dev Dashboard](https://developer.microsoft.com/en-us/microsoft-365/profile/) jer mi se neda bookmarkati
    

#### [VS Code (Notepad na steroidima, potrebno zbog Teams toolkit ekstenzije)](https://code.visualstudio.com) 

    Extensions:
     ├─ Microsoft Teams Toolkit  » Da možemo napraviti app
     ├─ Debbuger for Edge  » Ovo gore tu ga zahtjeva iz nekog razloga
     ├─ Debbuger for Chrome  » Ovo gore tu ga zahtjeva iz nekog razloga
     ├─ ESLint » Javascript stvar
     └─ HTML CSS Support  » da .css i .html fileovi izgledaju bolje 

## Docs / Workflow 

Ideje i stvari

### Preprouka za rad aplikcaije 

\   ![Flowchart bonanza](https://imgur.com/AZXCa8x.png "Wow!!!")    
    ![Fetch service flowchart bonanza](https://imgur.com/y7j01A8.png "Nice!!! very wow!!! :(")


### git version control 

#### Prije rada napraviti sync