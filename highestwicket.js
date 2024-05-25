const request=require('request');
const jsdom=require("jsdom");
const {JSDOM}=jsdom;
const link="https://www.espncricinfo.com/series/ipl-2021-1249214/chennai-super-kings-vs-kolkata-knight-riders-final-1254117/full-scorecard";

request(link,cb);

function cb(error,response,html)
{
    if(error)
      console.log(error);
    else{
        const dom=new JSDOM(html);
        const document =dom.window.document;
        let table=document.querySelectorAll(".ds-w-full.ds-table.ds-table-xs.ds-table-fixed");
        console.log(table.length);
        let highestwicketname="";
        let highestwickettake=0;
        for(let i=0;i<table.length;i++)
        {
            if(i%2!=0)
            {
               let rows=table[i].querySelectorAll("tbody tr");
               for(let j=0;j<rows.length;j++)
               {
                   let tds=rows[j].querySelectorAll("td");
                   if(tds.length>1)
                   {
                      let name=tds[0].textContent;
                      let wicket=tds[4].textContent;

                      if(wicket>highestwickettake)
                      {
                          highestwickettake=wicket;
                          highestwicketname=name;
                      }
                   }
               }
            }
        }

        console.log("Name of highest wicket taker--->",highestwickettake,"  wicket--->" ,highestwicketname);
    }
}