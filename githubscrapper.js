const request = require('request');
const jsdom=require('jsdom');
const {JSDOM}=jsdom;
const fs=require('fs');

const link="https://github.com/topics";
request(link,cb);

let answer=[];
function cb(error, response, html){
    if(error)
    {
        console.log(error);
    }
    else{
        const dom=new JSDOM(html);
        const document=dom.window.document;
        const allAnchorTag=document.querySelectorAll(".no-underline.d-flex.flex-column.flex-justify-center");
        for(let i=0;i<allAnchorTag.length; i++)
        {
            let link=allAnchorTag[i].href;
            let completeLink="https://github.com"+link;
            // console.log(completeLink);
            request(completeLink,cb2);
        }
    }
}

function cb2(error, response, html){
    if(error)
    {
        console.log(error);
    }
    else{
        const dom=new JSDOM(html);
        const document=dom.window.document;
        const another = document.querySelectorAll(".f3.color-fg-muted.text-normal.lh-condensed a");
        for(let i=1;i<16;i+=2)
        {
          let issuegolink=another[i].href;
          let completeissuelink="https://github.com"+issuegolink+"/issues";
          request(completeissuelink,cb3);
        }
    }
}

function cb3(error, response, html){
    if(error)
    {
        console.log(error);
    }
    else{
        const dom=new JSDOM(html);
        const document=dom.window.document;
        let ourlink=document.querySelectorAll(".Link--primary.v-align-middle.no-underline.h4");
        for(let i=0;i<5;i++)
        {
            let issuename=ourlink[i].textContent;
            let issuelink=ourlink[i].href;
            let anslink="https://github.com"+issuelink;
           
            storingelement(issuename,anslink);
        }
        let data = JSON.stringify(answer);
        fs.writeFileSync('GithubScrapper.json', data);
    }
}

function storingelement(issuename,anslink){
    let obj = {
        Name:issuename,
        LInk:anslink,
    }
    answer.push(obj);
}