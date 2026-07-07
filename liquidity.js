// =====================================
// Ghost SMC PRO
// Version : v4.3.0
// File    : liquidity.js
// Upgrade : Live Candle Liquidity
// Part    : 1/3
// =====================================


// ===========================
// LIQUIDITY MEMORY
// ===========================

const LIQUIDITY = {

status:"Scanning...",

side:"None",

buySide:null,

sellSide:null,

equalHighs:[],

equalLows:[],

sweep:false,

orderBlock:"Searching...",

fvg:"Searching..."

};



// ===========================
// DISPLAY UPDATE
// ===========================

function updateLiquidityDisplay(){


let liquidity=document.getElementById("liquidity");

let orderblock=document.getElementById("orderblock");

let fvg=document.getElementById("fvg");



if(liquidity){

liquidity.textContent=LIQUIDITY.status;

}


if(orderblock){

orderblock.textContent=LIQUIDITY.orderBlock;

}


if(fvg){

fvg.textContent=LIQUIDITY.fvg;

}


}

// ===========================
// LIVE EQUAL HIGH SCAN
// ===========================

function scanEqualHighs(candles){


let tolerance=0.0005;


for(
let i=1;
i<candles.length;
i++
){


let previous=candles[i-1].high;

let current=candles[i].high;


if(
Math.abs(previous-current)<=tolerance
){


LIQUIDITY.equalHighs.push(current);


LIQUIDITY.buySide=current;


}


}


}



// ===========================
// LIVE EQUAL LOW SCAN
// ===========================

function scanEqualLows(candles){


let tolerance=0.0005;


for(
let i=1;
i<candles.length;
i++
){


let previous=candles[i-1].low;

let current=candles[i].low;


if(
Math.abs(previous-current)<=tolerance
){


LIQUIDITY.equalLows.push(current);


LIQUIDITY.sellSide=current;


}


}


}



// ===========================
// LIQUIDITY SCANNER
// ===========================

function processLiquidity(){


if(
typeof MARKET==="undefined" ||
MARKET.candles.length<10
){

return;

}


let candles=MARKET.candles;


scanEqualHighs(candles);


scanEqualLows(candles);


updateLiquidityDisplay();


}

// ===========================
// LIVE LIQUIDITY SWEEP
// ===========================

function detectLiquiditySweep(){


if(
typeof MARKET==="undefined"
){

return;

}


let high=MARKET.high;

let low=MARKET.low;

let close=MARKET.close;



// Buy-side liquidity taken

if(
LIQUIDITY.buySide!==null &&
high>LIQUIDITY.buySide &&
close<LIQUIDITY.buySide
){


LIQUIDITY.status=
"Buy-side Liquidity Swept";


LIQUIDITY.side=
"Bearish";


LIQUIDITY.sweep=true;


}



// Sell-side liquidity taken

if(
LIQUIDITY.sellSide!==null &&
low<LIQUIDITY.sellSide &&
close>LIQUIDITY.sellSide
){


LIQUIDITY.status=
"Sell-side Liquidity Swept";


LIQUIDITY.side=
"Bullish";


LIQUIDITY.sweep=true;


}


updateLiquidityDisplay();


}



// ===========================
// LIQUIDITY ENGINE LOOP
// ===========================

function runLiquidityEngine(){


processLiquidity();


detectLiquiditySweep();


}



// ===========================
// START ENGINE
// ===========================

setInterval(

runLiquidityEngine,

1000

);



console.log(

"Ghost SMC Liquidity v4.3.0 Connected To Market"

);
