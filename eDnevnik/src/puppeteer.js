// Kako hakirati CARNET Mainframe
const puppeteer = require('puppeteer');
const { StringDecoder } = require('string_decoder');

//JSON structure
let dataset = {
   ime : 'NoUser',
   prezime : 'NoUser',
   razred : 'NoRazred',
   skola : 'NoSkola',
   razrednik : 'NoRazrednik',
   predmeti : [],
   ispiti : {}
}

//Manual start
GetPageHtml('jakov.ivankovic4@skole.hr', 'by49AJWx');

// Retrives content from html out of <span></span>
async function GetSpan(html, span = 50) {
  let temp = await (html.slice( html.indexOf('<span')+6, html.indexOf('<span')+span)).slice(0, (html.slice( html.indexOf('<span')+6, html.indexOf('<span')+span)).indexOf('</span>'))
  
  //cleanup for the spans that have classes and other [redacted]
  if(temp.includes('>'))
    temp = temp.substr(temp.indexOf('>')+1);
  
  if(temp.includes('<'))
    temp = temp.slice(0, temp.indexOf('<'));

  return temp;
}

/////////////////////////////////////////////////////
//   The Main Entry   ///////////////////////////////
/////////////////////////////////////////////////////
//STEP 1: 
async function GetPageHtml(username, password) {
  console.log('Puppeteer starting..')
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://ocjene.skole.hr');
  
  await page.type('[name=username]' , username, {delay:100});
  await page.type('[name=password]' , password, {delay:100});

  await page.click('[value=PRIJAVA]');

  //zašto čekati CARENT? nema potrebe???
  //await page.waitForNavigation({timeout:10000});

  let html = await page.content();
  
  //console.log(html);

  ////////////////////////////////////////////////////
  //    Kolekcijska zona !!!  ////////////////////////
  ////////////////////////////////////////////////////
  //Ime,prezime, skola...
  GetGeneralInfo(html);

  //Predmeti
  const list = await page.$$('[href*="/grade/"]');

  await StartPred(list, browser);
  console.log('---------------------\nPredmeti collected')

  //Ispiti
  //Backend magija, da znam, mislite nije moguće, kako zanju kada mi je ispit???
  // - MAGIJA !!!
  dataset.ispiti = {
    "Veljača" : [
      ["Matematika", "3. ispit znanja", "10.2."],
      ["Hrvatski jezik", "Druga školska zadaća", "23.2."],
      ["Građa Računala", "2. računalna provjera znanja A grupa", "24.2."]
    ],
    "Ožujak" : [
      ["Dijagnostika i održavanje informacijskih sustava (izborni)", "2. pismena provjera znanja", "1.3."],
      ["Mikroupravljači", "2. pismena provjera znanja", "2.3."],
      ["Građa računala", "2. računalna provjera znanja B grupa", "3.3."],
      ["Fizika", "Pismena provjera znanja", "8.3."],
      ["Matematika", "4.ispit znanja - Gruopa 1", "15.3."],
      ["Hrvatski jezik", "Pismena provjera znanja", "16.3."]
    ]
  }
  //Izostanci
  //Ne za sada

  //Vladanje
  //Iovako ionako ovo nikada nije ispunjeno :)

  browser.close();
  console.log('---------------------\n..Pupetter Ended');

  console.log('---------------------\n\n\n' + JSON.stringify(dataset));
}

//wierd how everything breaks if this isnt in a separete function :|
async function StartPred(list, browser) {
  //we start at 2, because 0,1 are href to "sve ocjene","sve"(ali u pdf)
  let end = list.length;
  for(let i = 2; i < end; i++) {
    const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())))
    await list[i].click({button: 'middle'});
    const temppage = await newPagePromise;

    //wierd thing, if we don't do this, code breaky break
    await temppage.screenshot({path: `image.png`})

    let temphtml = await temppage.content();

    await GetPredmet(temphtml, i-2);
  }

  console.log('Predmeti finished')
}

// 
async function GetPredmet(html, index) {
  const predmet = {
    name : '',
    nastavnik : '',
    ocjene : [],
    biljeske : []
  }

  let indx = html.slice(html.indexOf('class="section-menu-title"')+10, html.indexOf('class="section-menu-title"')+100)
  predmet.name = await GetSpan(indx);

  const ocjena = {
    name : "",
    mjesec : []
  }

  let ocjena_index = 0;

  for(let inc = 0; inc < 2500; inc+=900) {
    let temphtml = html.substr(html.indexOf('<div class="flex-table row">')+30+inc, 900+inc );
    let ex = temphtml.slice(0, temphtml.lastIndexOf('<div class="flex-table row">'));
    let list = ex.replace(/<div class="flex-row grade">/g, '')
      .replace(/<\/div>/g, '')
      .replace(/\n/g, '')
      .replace(/	/g, '')
      .replace(/ /g, '')
      .trim().split('</span>');

    //naziv kriterija
    ocjena.name =  temphtml.slice(temphtml.indexOf('<div class="flex-row first">')+28, temphtml.indexOf('<div class="flex-row first">')+58);
    if (ocjena.name.includes('<'))
      ocjena.name = ocjena.name.slice(0, ocjena.name.indexOf('<'));

    //ocjene po mjesecima
    for(let i = 0; i < list.length-1; i++){
      let j = list[i].substr(list[i].length-1);

      if(isNaN(j))
        ocjena.mjesec[i] = 0;
      else
        ocjena.mjesec[i] = j;
    }

    predmet.ocjene[ocjena_index] = ocjena;
    ocjena_index++;
  }

  //Bilješke
  /////////////
  var temphtml = html.substr(html.indexOf(' notes-table'));
  const templist = temphtml.slice(0, 2420)
    .replace(/\n/g, '')
    .replace(/	/g, '')
    .split('</div>');

  //clearing list form empty elements
  var list = [];
  let bilj_indx = 0;
  for(let i = 4; i < templist.length;) {
    //gets us three indexes for bilješka ['note', 'date', 'grade']
    for(let k = 0; k < 3; k++) {
      // if j index is empty j++, and loop back until not empty
      let j = i;

      if( i >= templist.length)
          break;

      let x = await GetSpan(templist[j]);
      for(j; x.length < 1; ) {
        j++;
        x = await GetSpan(templist[j]);
        if( j >= templist.length)
          break;
      } 
      list[k] = x;
      i = j+1;
    }

    predmet.biljeske[bilj_indx] = list;
    bilj_indx++;
  }

  dataset.predmeti[index] = predmet;

  console.log(`${index}: ${dataset.predmeti[index].name}`);
}

// Scrapes html for general info about student
async function GetGeneralInfo(html) {
  console

  //Ime i prezime
  let username = await GetSpan(html.slice( html.indexOf('class="user-name">'), html.indexOf('class="user-name">')+100));
  username = username.split(" ");
  dataset.ime = username[0];
  dataset.prezime = username[1];
  //Razred
  dataset.razred = await GetSpan(html.slice( html.indexOf('class="class">'), html.indexOf('class="class">')+100));
  //Škola
  dataset.skola = await GetSpan(html.slice( html.indexOf('class="school-name">'), html.indexOf('class="school-name">')+200));
  //Razrednik
  dataset.razrednik = await GetSpan(html.slice( html.indexOf('class="schoolyear">')+50, html.indexOf('class="schoolyear">')+200));
  
  // console.log(`Username: ${JSON.ime} ${JSON.prezime}`);
  // console.log(`Razred: ${JSON.razred}`);
  // console.log(`Skola: ${JSON.skola}`);
  // console.log(`Razrednik: ${JSON.razrednik}`);

  console.log('---------------------\nGeneral info collected');
}
