// Kako hakirati CARNET Mainframe
const puppeteer = require('puppeteer');
const fs = require('fs');
const info = require('./info.json')

//JSON structure
let dataset = {
   ime : 'NoUser',
   prezime : 'NoUser',
   razred : 'NoRazred',
   skola : 'NoSkola',
   razrednik : 'NoRazrednik',
   predmeti : [],
   ispiti : '',
   biljeske : '',
   izostanci : '',
   vladanja  : ''
}

if(info.username == "CARNET e-mail") {
  console.error('\x1b[41m%s\x1b[0m', 'Forgot to set info.json')
  return;
}

//Manual start
GetPageHtml(info.username, info.password);

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
  const list = await page.$$('#page-wrapper > div.content-wrapper > div.content > ul > li > a');

  await StartPred(list, browser);
  console.log('---------------------\nPredmeti collected');

  //Ispiti
  //Backend magija, da znam, mislite nije moguće, kako zanju kada mi je ispit???
  // - MAGIJA !!!
  let ispiti = await page.$('#class-administration-menu > div.class-menu > ul > li:nth-child(3) > a')
  dataset.ispiti = await GetInnerHtml(browser, ispiti, '#page-wrapper > div.content-wrapper > div.content');
  console.log('---------------------\nIspiti collected');

  //Bilješke
  let bilj = await page.$('#class-administration-menu > div.class-menu > ul > li:nth-child(2) > a')
  dataset.biljeske = await GetInnerHtml(browser, bilj, '#page-wrapper > div.content-wrapper > div');
  console.log('---------------------\nBilješke collected');

  //Izostanci
  let izostanci = await page.$('#class-administration-menu > div.class-menu > ul > li:nth-child(4) > a');
  dataset.izostanci = await GetInnerHtml(browser, izostanci, '#page-wrapper > div.content-wrapper > div.content');
  console.log('---------------------\nIzostanci collected');

  //Vladanje
  let vladanja = await page.$('#class-administration-menu > div.class-menu > ul > li:nth-child(5) > a');
  dataset.vladanja = await GetInnerHtml(browser, vladanja, '#page-wrapper > div.content-wrapper > div');
  console.log('---------------------\nVladanja collected');

  browser.close();
  console.log('---------------------\n..Pupetter Ended');

  //saves the gotten html to eDnevnik/src/components/dataset.json
  let stringify = JSON.stringify(dataset);
  fs.writeFileSync('eDnevnik/src/components/tempset.json', stringify, err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
    console.log('---------------------\n\n\nSaved "dataset.json" ');
  })
}

//nice and frictionless design
async function GetInnerHtml(browser, element, selector) {
  const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())))
  await element.click({button: 'middle'});
  const temppage = await newPagePromise;

  //weird thing.. if we don't do this, code breaky break
  await temppage.screenshot({path: `image.png`})

  let html = await temppage.$eval(selector, (element) => {
    return element.innerHTML;
  });

  html = html.replace(/"/g, '\"')

  return html;
}

//weird how everything breaks if this isnt in a separete function :|
async function StartPred(list, browser) {
  //we start at 2, because 0,1 are href to "sve ocjene","sve"(ali u pdf)
  let end = list.length;
  console.log(list.length + ' <--- this is its lenght')
  for(let i = 0; i < end; i++) {
    const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())))
    await list[i].click({button: 'middle'});
    const temppage = await newPagePromise;

    //weird thing, if we don't do this, code breaky break
    await temppage.screenshot({path: `image.png`})

    let name = await temppage.$eval('#page-wrapper > div.content-wrapper > div.content-menu > div.section-menu-title > span', (element) => {
      return element.innerHTML;
    });

    let html = await temppage.$eval('.content', (element) => {
      return element.innerHTML;
    });

    html = html.replace(/"/g, '\"')

    console.log(i + ': ' + name)

    dataset.predmeti.push([name, html]);
  }

  console.log('Predmeti finished')
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
