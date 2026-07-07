// =====================================
// Ghost SMC PRO
// Version : v4.2.0
// File    : debug.js
// Upgrade : Intelligence Dashboard
// Part    : 1/3
// =====================================


// ===========================
// DEBUG MEMORY
// ===========================

const DEBUG = {

engine:"Starting...",

trend:"Neutral",

bos:"Waiting...",

choch:"Waiting...",

liquidity:"Scanning...",

trade:"Waiting..."

};



// ===========================
// DISPLAY CONNECTION
// ===========================

function updateDebugDisplay(){


let engine=document.getElementById("debugEngine");

let trend=document.getElementById("debugTrend");

let bos=document.getElementById("debugBOS");

let choch=document.getElementById("debugCHoCH");

let liquidity=document.getElementById("debugLiquidity");

let trade=document.getElementById("debugTrade");



if(engine){

engine.textContent=DEBUG.engine;

}


if(trend){

trend.textContent=DEBUG.trend;

}


if(bos){

bos.textContent=DEBUG.bos;

}


if(choch){

choch.textContent=DEBUG.choch;

}


if(liquidity){

liquidity.textContent=DEBUG.liquidity;

}


if(trade){

trade.textContent=DEBUG.trade;

}


}

// ===========================
// ENGINE CONNECTION
// ===========================

function readEngineStatus(){



// Structure connection

if(typeof STRUCTURE!=="undefined"){


DEBUG.trend=STRUCTURE.trend;


DEBUG.bos=STRUCTURE.bos;


DEBUG.choch=STRUCTURE.choch;


}



// Liquidity connection

if(typeof LIQUIDITY!=="undefined"){


DEBUG.liquidity=
LIQUIDITY.status;


}



// Trade connection

if(typeof TRADE!=="undefined"){


if(
TRADE.direction!=="None"
){

DEBUG.trade=
TRADE.direction+" Setup";


}

else{


DEBUG.trade=
"Waiting...";


}


}



DEBUG.engine=
"Running";


}



// ===========================
// DEBUG UPDATE LOOP
// ===========================

function runDebugEngine(){


readEngineStatus();


updateDebugDisplay();


}

// ===========================
// ENGINE HEARTBEAT
// ===========================

setInterval(

function(){


runDebugEngine();


},

1000

);



// ===========================
// START DEBUG ENGINE
// ===========================

runDebugEngine();


console.log(

"Ghost SMC Debug Engine v4.2.0 Loaded"

);
