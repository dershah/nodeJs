const fs = require('fs');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({message: 'saying Hi from Server Side', app: 'Natours'});
});
app.post('/', (req, res) => {
    res.status(200).send('To Post use this endpöoint');
});


const port = 3000;
app.listen(port, () => {
    console.log(`App is running on Port ${port}...`);
})