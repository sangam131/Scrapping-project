function promissifiedFxn(){
    return new Promise(function(resolve, reject){
        //code
        let a=1;
        let b=1;
        if(a==b){
            resolve("Equal");
        }
        else{
            reject("UnEqual");
        }
    })
}

let somePromissified=promissifiedFxn();

somePromissified.then(function(x){
   console.log(x);
})
somePromissified.catch(function(err){
   console.log(err);
})