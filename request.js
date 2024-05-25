const request = require('request');
const jsdom=require('jsdom');
const {JSDOM}=jsdom;

const link='https://www.espncricinfo.com/series/ipl-2021-1249214/chennai-super-kings-vs-kolkata-knight-riders-final-1254117/full-scorecard';

request(link,cb);
    
  function cb(error, response, html)
   {
     if(error)
      console.error('error:', error); 
    else{
         const dom=new JSDOM(html);
         const document=dom.window.document;
         let teamName=document.querySelectorAll('.ds-text-tight-l.ds-font-bold');
         console.log(teamName[0].textContent);
         console.log(teamName[1].textContent);
    }
  }
;