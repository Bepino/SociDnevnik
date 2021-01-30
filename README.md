# SociDnevnik
Docs za dev, jer CARNET   :)
\
## Potrebno za rad 

#### [Node.js (LTS)](https://nodejs.org/en/download/)
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
    \- [Microsoft-365 Dev Dashboard](https://developer.microsoft.com/en-us/microsoft-365/profile/) jer mi se neda bookmarkati
    

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

#### Display service
-   Spaja vizualizacije iz `Add-on-service` i `Fetch-service` u nešto što korisnik zapravo može vidjeti

#### Add-on service
-   Stvara grafove i ostale vizualizacije itd..

#### Fetch service
-   dohvaća podatke od ocjene.skole.hr
-   pretvara ih u nešto korisno za `Add-on-service` i `Display-service`
    ![Fetch service flowchart bonanza](https://imgur.com/y7j01A8.png "Nice!!! very wow!!! :(")


### Git version control 

#### Prije rada napraviti sync 
\    Tako da se nebi dogodili konflikti kada pushate svoj cod na repo
    Nije nužno, ali pomaže u životu da ne morate 
![Do this](https://imgur.com/B8lxTgD.png "plz I beg of you")

#### Ostalo
-   Ako nadodate neki package (library) nadodaje te ga na listu

#### Komentirati
\   Komentirajte kod tako da kada netko drugi gleda kroz njega zbog kojih god razloga ne dobije glavobolju pokušavajući shvatiti šapgete
    (učite iz mojih patnji od osobe koja je 3 puta krenula raditi discord bot jer je bilo pre komplicirano skužiti špagete)
\   Ne treba nešto previše samo par riječi da je lagano skužiti što što radi.

#### Dokumentacija
> Ne znam jel trebamo source kod dokumentirati ili samo kako koristiti pa to ćemo vidjeti kome pripada ta patnja :)

\

\

> Ako imate pitanja Discord > Whatsapp :))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
> osim ako spavam