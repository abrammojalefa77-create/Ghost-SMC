// =====================================
// Ghost SMC PRO
// Version : 4.2.0
// File    : structure.js
// Upgrade : BOS + CHoCH Engine
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
// SWING MEMORY
// ===========================

const SWING = {

highs:[],

lows:[],

length:5

};



// ===========================
// DISPLAY
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
// BOS CONFIRMATION ENGINE
// ===========================

function checkBOS(closePrice){


// Bullish BOS
// Candle close must break
// protected high

if(
STRUCTURE.protectedHigh!==null &&
closePrice > STRUCTURE.protectedHigh &&
STRUCTURE.highBroken===false
){


STRUCTURE.bos="Bullish BOS";

STRUCTURE.trend="Bullish";

STRUCTURE.highBroken=true;


}



// Bearish BOS
// Candle close must break
// protected low

if(
STRUCTURE.protectedLow!==null &&
closePrice < STRUCTURE.protectedLow &&
STRUCTURE.lowBroken===false
){


STRUCTURE.bos="Bearish BOS";

STRUCTURE.trend="Bearish";

STRUCTURE.lowBroken=true;


}


updateStructureDisplay();


}



// ===========================
// CHoCH CONFIRMATION ENGINE
// ===========================

function checkCHoCH(closePrice){


// Bearish change of character

if(
STRUCTURE.trend==="Bullish" &&
STRUCTURE.protectedLow!==null &&
closePrice < STRUCTURE.protectedLow &&
STRUCTURE.chochDone===false
){


STRUCTURE.choch="Bearish CHoCH";

STRUCTURE.trend="Bearish";

STRUCTURE.chochDone=true;


}



// Bullish change of character

if(
STRUCTURE.trend==="Bearish" &&
STRUCTURE.protectedHigh!==null &&
closePrice > STRUCTURE.protectedHigh &&
STRUCTURE.chochDone===false
){


STRUCTURE.choch="Bullish CHoCH";

STRUCTURE.trend="Bullish";

STRUCTURE.chochDone=true;


}


updateStructureDisplay();


}

// ===========================
// STRUCTURE RESET
// ===========================

function resetBreakState(){


STRUCTURE.highBroken=false;

STRUCTURE.lowBroken=false;


STRUCTURE.chochDone=false;


}



// ===========================
// UPDATE PROTECTED LEVELS
// ===========================

function updateProtectedLevels(){


if(STRUCTURE.lastHigh!==null){

STRUCTURE.protectedHigh=
STRUCTURE.lastHigh;

}


if(STRUCTURE.lastLow!==null){

STRUCTURE.protectedLow=
STRUCTURE.lastLow;

}


}



// ===========================
// STRUCTURE ENGINE RUNNER
// ===========================

function runStructureEngine(candles,closePrice){


processSwing(candles);


updateProtectedLevels();


checkBOS(closePrice);


checkCHoCH(closePrice);


updateStructureDisplay();


}



// ===========================
// ENGINE READY
// ===========================

console.log(

"Ghost SMC BOS + CHoCH Engine Loaded"

);
