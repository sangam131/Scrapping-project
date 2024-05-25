const fs= require('fs');

console.log("Before");

fs.readFile("f1.txt",function (error,data){
   if(error)
   {
    console.log(error);
   }
   else{
    console.log(data+"");
    fs.readFile("f2.txt",function(error,data){
        if(error)
        {
            console.log(error);
        }
        else{
            console.log(""+data);
        }
    })
   }
})

// This code is known as CallBackHell  Readibility-difficulty;  This code has ordered