const request = require('request');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require("fs");
const xlsx = require("json-as-xlsx");
const link = "https://www.espncricinfo.com/series/ipl-2021-1249214/match-results";

let leaderboard = [];
let counter = 0;
request(link, cb);

function cb(error, response, html) {
    if (error) {
        console.log(error)
    }
    else {
        const dom = new JSDOM(html);
        const document = dom.window.document;
        const scorecardlink = document.querySelectorAll(".ds-flex.ds-mx-4.ds-pt-2.ds-pb-3");
        //   console.log(scorecardlink.length);
        for (let i = 0; i < scorecardlink.length; i++) {
            const finalscoretaglink = scorecardlink[i].querySelectorAll("a")[2].href;
            const completelink = "https://www.espncricinfo.com" + finalscoretaglink;
            counter++;
            request(completelink, cb2);
        }
    }
}

function cb2(error, response, html) {
    if (error) {
        console.log(error);
    }
    else {
        const dom = new JSDOM(html);
        const document = dom.window.document;
        const batsmanlink = document.querySelectorAll(".ds-w-full.ds-table.ds-table-xs.ds-table-fixed.ci-scorecard-table tbody tr");
        for (let i = 0; i < batsmanlink.length; i++) {
            let cells = batsmanlink[i].querySelectorAll("td");
            if (cells.length == 8) {
                let name = cells[0].textContent;
                let runs = cells[2].textContent;
                let balls = cells[3].textContent;
                let fours = cells[5].textContent;
                let sixes = cells[6].textContent;
                //    console.log("name: ",name ,"runs",runs,"balls",balls,"fours",fours,"sixes ",sixes);
                processPlayer(name, runs, balls, fours, sixes);
            }
        }
        counter--;
        if (counter == 0) {
            console.log(leaderboard);
            let data = JSON.stringify(leaderboard);
            fs.writeFileSync('BatsmanStat.json', data);
            let dataExcel = [
                {
                    sheet: "IPLStats",
                    columns: [
                        { label: "Name", value: "Name" }, // Top level data
                        { label: "Runs", value:"Runs"  },
                        { label: "Balls", value:"Balls"  }, 
                        { label: "Fours", value:"Fours"  }, 
                        { label: "Sixes", value:"Sixes"  }, 
                        { label: "Innings", value:"Innings"  }, 
                    ],
                    content: leaderboard
                },
            ]

            let settings = {
                fileName: "BatsmenDetail", // Name of the resulting spreadsheet
                extraLength: 3, // A bigger number means that columns will be wider
                writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
            }

            xlsx(dataExcel, settings) // Will download the excel file
        }
    }
}


// processPlayer('Ashish','20','10','5','2');
// processPlayer('Sumit','40','10','3','4');
// processPlayer('Ashish','30','20','2','1');
// console.log(leaderboard);


function processPlayer(name, runs, balls, fours, sixes) {
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);

    for (let i = 0; i < leaderboard.length; i++) {
        let playerobj = leaderboard[i];
        if (playerobj.Name == name) {
            playerobj.Runs += runs;
            playerobj.Balls += balls;
            playerobj.Fours += fours;
            playerobj.Sixes += sixes;
            playerobj.Innings += 1;
            return;
        }
    }

    let obj = {
        Name: name,
        Runs: runs,
        Balls: balls,
        Fours: fours,
        Sixes: sixes,
        Innings: 1,
    }
    leaderboard.push(obj);

}