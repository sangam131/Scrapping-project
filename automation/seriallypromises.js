const fs= require('fs');

let filekaPromise=fs.promises.readFile("f1.txt");


filekaPromise.then(function(data){
 console.log(data+"");
 let filekaPromise2=fs.promises.readFile("f2.txt");
   return filekaPromise2;
}).then(function(data){
    console.log(data+"");
}).catch(function(error){
    console.log(error);
})

//orderly followed by file