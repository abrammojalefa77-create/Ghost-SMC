// =====================================
// Ghost SMC PRO
// Version : v4.3.0
// File    : structure.js
// Upgrade : Market Data Connection
// Part    : 1/3
// =====================================


// ===========================
// STRUCTURE MEMORY
// ===========================

const STRUCTURE = {

trend:"Neutral",

lastHigh:null,

lastLow:null,

protectedHigh:null,

protectedLow:null,

externalHigh:null,

externalLow:null,

bos:"Waiting...",

choch:"Waiting...",

highBroken:false,

lowBroken:false,

chochDone:false

};



// ===========================
// SWING SETTINGS
// ===========================

const SWING = {

length:5

};



// ===========================
// STRUCTURE DISPLAY
// ===========================

function updateStructureDisplay(){


let bos=document.getElementById("bos");

let choch=document.getElementById("choch");


if(bos){

bos.textContent=STRUCTURE.bos;

}


if(choch){

choch.textContent=STRUCTURE.choch;

}


}

// ===========================
// REAL SWING DETECTION
// ===========================

function detectSwingHigh(candles,index){


let length=SWING.length;

let current=candles[index].high;


for(
let i=1;
i<=length;
i++
){


if(
candles[index-i].high>=current ||
candles[index+i].high>=current
){

return false;

}


}


return true;


}



// ===========================
// SWING LOW DETECTION
// ===========================

function detectSwingLow(candles,index){


let length=SWING.length;

let current=candles[index].low;


for(
let i=1;
i<=length;
i++
){


if(
candles[index-i].low<=current ||
candles[index+i].low<=current
){

return false;

}


}


return true;


}



// ===========================
// PROCESS MARKET DATA
// ===========================

function processMarketStructure(){


if(
typeof MARKET==="undefined" ||
MARKET.candles.length<20
){

return;

}



let candles=MARKET.candles;


let index=candles.length-1-SWING.length;



if(detectSwingHigh(candles,index)){


STRUCTURE.lastHigh=
candles[index].high;


}



if(detectSwingLow(candles,index)){


STRUCTURE.lastLow=
candles[index].low;


}


}

// ===========================
// EXTERNAL STRUCTURE UPDATE
// ===========================

function updateExternalStructure(){


if(
STRUCTURE.lastHigh!==null &&
(
STRUCTURE.externalHigh===null ||
STRUCTURE.lastHigh>STRUCTURE.externalHigh
)
){

STRUCTURE.externalHigh=
STRUCTURE.lastHigh;


STRUCTURE.protectedHigh=
STRUCTURE.externalHigh;


}



if(
STRUCTURE.lastLow!==null &&
(
STRUCTURE.externalLow===null ||
STRUCTURE.lastLow<STRUCTURE.externalLow
)
){

STRUCTURE.externalLow=
STRUCTURE.lastLow;


STRUCTURE.protectedLow=
STRUCTURE.externalLow;


}


}



// ===========================
// STRUCTURE ENGINE LOOP
// ===========================

function runStructureEngine(){


if(typeof MARKET==="undefined"){

return;

}


processMarketStructure();


updateExternalStructure();


if(MARKET.close){

checkBOS(MARKET.close);

checkCHoCH(MARKET.close);

}


updateStructureDisplay();


}



// ===========================
// START ENGINE
// ===========================

setInterval(

runStructureEngine,

1000

);



console.log(

"Ghost SMC Structure v4.3.0 Connected To Market"

);

// ===========================
// MARKET DEBUG MEMORY
// ===========================

const MARKET_DEBUG = {

candles:0,

price:"--",

status:"Checking..."

};



// ===========================
// MARKET DEBUG DISPLAY
// ===========================

function updateMarketDebug(){


let candleBox=document.getElementById("marketCandles");

let priceBox=document.getElementById("marketPrice");

let statusBox=document.getElementById("marketStatus");



if(candleBox){

candleBox.textContent=MARKET_DEBUG.candles;

}


if(priceBox){

priceBox.textContent=MARKET_DEBUG.price;

}


if(statusBox){

statusBox.textContent=MARKET_DEBUG.status;

}


}

// ===========================
// UPDATE MARKET DEBUG DATA
// ===========================

function runMarketDebug(){


if(typeof MARKET==="undefined"){

return;

}



MARKET_DEBUG.candles=
MARKET.candles.length;



MARKET_DEBUG.price=
MARKET.price;



if(
MARKET.candles.length>0
){

MARKET_DEBUG.status=
"Connected";


}

else{


MARKET_DEBUG.status=
"Waiting For Data";


}



updateMarketDebug();


}

// ===========================
// MARKET DEBUG LOOP
// ===========================

setInterval(

function(){


runMarketDebug();


},

1000

);



// ===========================
// START DEBUG
// ===========================

updateMarketDebug();


console.log(

"Ghost SMC Market Debug v5.3 Loaded"

);
