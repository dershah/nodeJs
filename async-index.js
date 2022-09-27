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

readFilePro(`${__dirname}/3-asynchronous-JS/starter/dog.txt`).then(data => {
    console.log(`Breed: ${data}`);

    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then(res =>{
        console.log(res.body.message);

        fs.writeFile(`${__dirname}/3-asynchronous-JS/starter/dog-img.txt`, res.body.message, err => {
            if(err) return console.log(err.message);
            console.log("random dog image saved into the file");
        });
    }).catch(err => {
        console.log(err.message);
    });
})
