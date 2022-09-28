const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, rejects) => {
        fs.readFile(file, (err, data) => {
            if(err) rejects('Sorry, No such file is Found :p')

            resolve(data);
        })
    })
}
const writeFilePro = (file, data) => {
    return new Promise((resolve, reject)=>{
        fs.writeFile(file, data, err=> {
            if(err) reject("unable to write the file");

            resolve("sucess");
        })
    })
}

//-------------------------------------------------------await/Async------------------------------------------------------

const getDogPic = async () => {
    try {
        
        const data = await readFilePro(`${__dirname}/3-asynchronous-JS/starter/dog.txt`);
        console.log(`Breed: ${data}`);

        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);

        await writeFilePro(`${__dirname}/3-asynchronous-JS/starter/dog-img.txt`, res.body.message);
        console.log("Random dog image has been saved");

    } catch (err) {
        console.log(err);
    }
    return "2. Ready ('-')";

}

console.log("1. Will get the Dog Picture!");

getDogPic();
console.log("3. Finish getting the Dog Picture!");



/* 
readFilePro(`${__dirname}/3-asynchronous-JS/starter/dog.txt`)
.then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
})
.then(res =>{
    console.log(res.body.message);
    return writeFilePro(`${__dirname}/3-asynchronous-JS/starter/dog-img.txt`, res.body.message);
})
.then(() =>{
    console.log("Random dog image has been saved");
}).catch(err => {
        console.log(err.message);
});
 */