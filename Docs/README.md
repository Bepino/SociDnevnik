# Postavljanje Teams app za rad
    Mentalna oznaka: "ima još Readme u eDnevnik folderu koje genrira Teams toolkit koji možda pojasne neke stvari bolje"
    
    Uputstva na docs.microsoft ako ovo ne radi (ako budete išli po njima rađe pushajte u ne master branch nego napravite zaseban pa da se ne dogode ne sreće 🙃

https://docs.microsoft.com/en-us/microsoftteams/platform/build-your-first-app/build-and-run#3-build-and-run-your-app\

Sve datoteke bi se treble već nalaziti unutar repositorja u `eDnevnik` folderu. \

Samo trebate unutar Teams Toolkita spremiti aplikaciju negdje i uploadati u Teams\
[Apps > Upload custom app]

## Pokretanje kroz Terminal/Cmd

1. U VS Code terminalu ako već niste u eDnevnik folderu unutar Terminala

```
../SociDnevnik > cd eDnevnik
```
> npm install možda bude potrajalo neko vrijme (10-20min) ovisno o tome koliko lib treba instalirati 
```
../SociDnevink/eDnevnik > npm install
```

```
../SociDnevink/eDnevnik > npm start
```
2. Zatim bi aplikacija trebala biti pokrenuta i dostupna na `https://localhost:3000`

3. Ako je aplikacija već sideloadana u Teams ažurirati paket, ako ne treba uploadati paket

4. Trebalo bi sve funkcionirati ako ne molim te nadodaj to ovdje

## Pokretanje kroz VS Code 
> i za prvi put/ nešto ne radi

1. Trebate u VS Code pod `File > Open Folder ` otvoriti eDnevinik folder od ovog repostorija.
2. Zatim u `Run` kartici VS Code pokrenuti aplikaciju ili samo pritisnuti <kbd>F5</kbd>