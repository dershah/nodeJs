const EventEmitter = require('events');

const myEmitter = new EventEmitter();

myEmitter.on("newSale", () => {
    console.log("A Sale is going on!!!");
});
myEmitter.on("newSal", () => {
    console.log("It is sale on Everything");
});


myEmitter.emit("newSale");