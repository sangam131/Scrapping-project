const request=require('request');
const jsdom=require('jsdom');
const {JSDOM}=jsdom;

const link="https://www.espncricinfo.com/series/ipl-2021-1249214/chennai-super-kings-vs-kolkata-knight-riders-final-1254117/full-scorecard";

request(link,cb);

function cb(error,response,html){
  if(error)
   console.log(error);
  else{
      const dom=new JSDOM(html);
      const document=dom.window.document;
      let batsman=document.querySelectorAll('.ds-w-full.ds-table.ds-table-xs.ds-table-fixed .ds-min-w-max .ds-inline-flex.ds-items-center.ds-leading-none a');
      for(let i=0;i<batsman.length;i++)
      {
         let batsmanlink=batsman[i].href;
         let completelink="https://www.espncricinfo.com"+batsmanlink;
           request(completelink,cb2);
      }
  }
}

function cb2(error ,response,html){
    if(error)
    {
        console.log(error);
    }
    else{
        const dom=new JSDOM(html);
        const document=dom.window.document;
        let detaillinkbatsman= document.querySelectorAll('.ds-text-title-s.ds-font-bold.ds-text-ui-typo h5');
        let batsmanName=detaillinkbatsman[0].textContent;
        let dateofbirth=detaillinkbatsman[1].textContent;
        console.log("Name---->",batsmanName,"    dateofBirth -----> ",dateofbirth);
    }
}