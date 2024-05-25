const puppeteer= require('puppeteer');
const mail= "dajij94193@musezoo.com";
const pass="Ashish@123$";
const code = require('./code');

let browserPromise=puppeteer.launch({headless:false,defaultViewport: null,args: ['--start-fullscreen']});
let page;

browserPromise.then(function(browser){
    console.log("browser is opened");
    let pagePromise=browser.newPage();
    return pagePromise;
}).then(function(pageInstance){
    console.log("Page is opened");
    page=pageInstance;
    let urlPromise=page.goto('https://www.hackerrank.com/');
    return urlPromise;
}).then(function(){
    console.log("HackerRank is opened");
    return waitAndclick("ul.menu a");

}).then(function(){ 
    let waitPromise=page.waitForSelector(".fl-button-wrap.fl-button-width-auto.fl-button-left  a");
    return waitPromise;
}).then(function(){ 
    let domClickPromise=page.evaluate(function(){
        let buttons=document.querySelectorAll(".fl-button-wrap.fl-button-width-auto.fl-button-left  a");
        buttons[0].click();
        return;
    })
    return domClickPromise;
}).then(function(){
    let waitPromise=page.waitForSelector("#input-1");
    return waitPromise;
}).then(function(){
    let mailTypePromise=page.type('#input-1',mail,{delay:100});
    return mailTypePromise;
}).then(function(){
    let PassTypePromise=page.type('#input-2',pass,{delay:100});
    return PassTypePromise;
}).then(function(){
    let ClickPromise=page.click('button[data-analytics="LoginPassword"]');
    return ClickPromise;
}).then(function(){ 
    console.log("Login Successfully");
   return waitAndclick(".topic-name");
}).then(function(){
    return page.waitForSelector(".filter-group");
}).then(function(){
    let domSelectPromise=page.evaluate(function(){ 
        let allDiv=document.querySelectorAll(".filter-group");
        let Div=allDiv[3];
        let clickSelector=Div.querySelector(".ui-checklist-list-item input");
        clickSelector.click();
        return;
    })
  return domSelectPromise;
}).then(function(){
    console.log("Warmup Selected");
    return page.waitForSelector(".challenges-list .js-track-click.challenge-list-item");
}).then(function(){
    let arrPromise=page.evaluate(function(){
        let arr=[];
        let aTags=document.querySelectorAll(".challenges-list .js-track-click.challenge-list-item");
        for(let i=0;i<aTags.length; i++)
        {
            let link=aTags[i].href;
            arr.push(link);
        }
        return arr;
    })
    return arrPromise;
}).then(function(questionArr){
    console.log(questionArr);
    let questionPromise = questionSolver(questionArr[0],code.answers[0]);
})




function waitAndclick(selector)
{
    return new Promise(function(resolve, reject){
        let waitPromise=page.waitForSelector(selector);
        waitPromise.then(function(){
            let clickPromise=page.click(selector);
            return clickPromise;
        }).then(function(){
            resolve();
        })
    })

}

function questionSolver(question,answers)
{
    return new Promise(function(resolve, reject){
        let linkPromise=page.goto(question);
        linkPromise.then(function(){
            return waitAndclick(".checkbox-input");
        }).then(function(){ 
            return waitAndclick(".ui-tooltip-wrapper textarea");
        }).then(function(){
            console.log("on the text Area");
            let typePromise=page.type(".ui-tooltip-wrapper textarea",answers);
            return typePromise;
        }).then(function(){
           let holdControl=page.keyboard.down('Control');
           return holdControl;
        }).then(function(){ 
            let pressA=page.keyboard.press('A');
            return pressA;
        }).then(function(){
            let pressX=page.keyboard.press('X');
            return pressX;
        }).then(function(){
            let upControl=page.keyboard.up('Control');
            return upControl;
        }).then(function(){
            return waitAndclick(".monaco-editor.no-user-select.vs");
        }).then(function(){ 
            let holdControl=page.keyboard.down('Control');
            return holdControl;
        }).then (function(){
            let pressA=page.keyboard.press('A');
            return pressA;
        }).then(function(){
            let pressV=page.keyboard.press('V');
            return pressV;
        }).then(function(){ 
            return waitAndclick(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
        }).then(function(){
            console.log(" question Submit Successfully");
        })

    })
}