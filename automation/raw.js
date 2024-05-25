 const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://example.com');
//   await page.screenshot({ path: 'example.png' });

//   await browser.close();
// })();

let BrowserPromise=puppeteer.launch({headless:false});

BrowserPromise.then(function(Browser){
    console.log("Browser is Open");
    let pagePromise=Browser.newPage();
    return pagePromise;
}).then(function(page){
    console.log("Page is opened");
    let urlPage=page.goto("https://www.google.co.in/");
    return urlPage;
}).then(function(){
    console.log("google is opened");
})