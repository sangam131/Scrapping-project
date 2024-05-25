const fs= require('fs');

let filekaPromise=fs.promises.readFile("f1.txt");
// console.log(filekaPromise);

console.log("Before");
filekaPromise.then(function(data){
 console.log(data+"");
})

filekaPromise.catch(function(error){
 console.log(error);
})

console.log("After");