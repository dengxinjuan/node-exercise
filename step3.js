const fs = require('fs');
const process = require('process');
const axios = require('axios');


function cat(path){

fs.readFile(path,'utf8',function(err,data){
    if(err){
        console.log(`Error reading ${path}: ${err}`);
        process.exit(1)
    }
    console.log(`This is ${data}`);
    return data;

}) 
    }



async function webCat(url){
    try {
        let resp = await axios.get(url);
        console.log(resp.data);
      } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
      }

}



function catWrite(path,filename){

    let content = cat(filename)

    fs.writeFile(path,content,"utf8",function(err){
        if(err){
            console.err(err);
            process.exit(1);
        }
        console.log('sucessfully wrote to file!')
    })

}


let path;


if(process.argv[2]=== '--out'){
    path = process.argv[3];
    out = process.argv[4];
    catWrite(path,out);
}else{
    path = process.argv[2]
}


path.slice(0,4) ==='http'? webCat(path) : cat(path)
