// =====================================
// GHOST SMC PRO v3.5.0
// PART 1 - CORE ENGINE
// =====================================

// ---------- APP STATE ----------

const APP={

symbol:"OANDA:XAUUSD",

timeframe:"15",

trend:"Waiting...",

session:"Loading..."

};

let chart=null;


// ---------- SESSION ENGINE ----------

function updateSession(){

const hour=new Date().getUTCHours();

let session="Asia";

if(hour>=7&&hour<12) session="London";

else if(hour>=12&&hour<17) session="New York";

APP.session=session;

document.getElementById("session").innerHTML=session;

}


// ---------- CHART ENGINE ----------

function loadChart(){

document.getElementById("tradingview_chart").innerHTML='<div id="tv_chart"></div>';

chart=new TradingView.widget({

container_id:"tv_chart",

width:"100%",

height:500,

symbol:APP.symbol,

interval:APP.timeframe,

timezone:"Etc/UTC",

theme:"dark",

style:"1",

locale:"en",

toolbar_bg:"#111",

enable_publishing:false,

hide_side_toolbar:false,

allow_symbol_change:true

});

}


// ---------- TIMEFRAME ENGINE ----------

function changeTF(tf){

APP.timeframe=tf;

let label="M15";

if(tf==="1") label="M1";
if(tf==="5") label="M5";
if(tf==="15") label="M15";
if(tf==="60") label="H1";
if(tf==="240") label="H4";
if(tf==="D") label="D1";

document.getElementById("timeframe").innerHTML=label;

loadChart();

}


// ---------- START ----------

window.onload=function(){

updateSession();

loadChart();

setInterval(updateSession,60000);

};

// =====================================
// PART 2 - MARKET STATUS ENGINE
// =====================================

const STATUS={

trend:"Waiting...",

condition:"Analyzing...",

signal:"None"

};


function updateMarketStatus(){

document.getElementById("trend").innerHTML=STATUS.trend;

document.getElementById("condition").innerHTML=STATUS.condition;

document.getElementById("signal").innerHTML=STATUS.signal;

}


function setBullish(){

STATUS.trend="Bullish";

STATUS.condition="Trending Up";

STATUS.signal="Looking for Buy";

updateMarketStatus();

}


function setBearish(){

STATUS.trend="Bearish";

STATUS.condition="Trending Down";

STATUS.signal="Looking for Sell";

updateMarketStatus();

}


// INITIAL DISPLAY

updateMarketStatus();

// =====================================
// PART 3 - GHOST SMC STRUCTURE ENGINE
// =====================================

const STRUCTURE={

trend:"Neutral",

bos:"Waiting...",

choch:"Waiting...",

lastSwingHigh:null,

lastSwingLow:null

};


function updateStructure(){

document.getElementById("bos").innerHTML=STRUCTURE.bos;

document.getElementById("choch").innerHTML=STRUCTURE.choch;

}


function bullishBOS(){

STRUCTURE.trend="Bullish";

STRUCTURE.bos="Bullish BOS";

STRUCTURE.choch="Waiting...";

STATUS.trend="Bullish";

STATUS.condition="Trending Up";

STATUS.signal="Looking for Buy";

updateStructure();

updateMarketStatus();

}


function bearishBOS(){

STRUCTURE.trend="Bearish";

STRUCTURE.bos="Bearish BOS";

STRUCTURE.choch="Waiting...";

STATUS.trend="Bearish";

STATUS.condition="Trending Down";

STATUS.signal="Looking for Sell";

updateStructure();

updateMarketStatus();

}


updateStructure();

// =====================================
// PART 4 - LIQUIDITY ENGINE
// =====================================

const LIQUIDITY={

status:"Scanning...",

orderBlock:"Searching...",

fvg:"Searching..."

};


function updateLiquidity(){

document.getElementById("liquidity").innerHTML=LIQUIDITY.status;

document.getElementById("orderblock").innerHTML=LIQUIDITY.orderBlock;

document.getElementById("fvg").innerHTML=LIQUIDITY.fvg;

}


function bullishLiquidity(){

LIQUIDITY.status="Sell Side Liquidity";

LIQUIDITY.orderBlock="Demand Zone";

LIQUIDITY.fvg="Bullish FVG";

updateLiquidity();

}


function bearishLiquidity(){

LIQUIDITY.status="Buy Side Liquidity";

LIQUIDITY.orderBlock="Supply Zone";

LIQUIDITY.fvg="Bearish FVG";

updateLiquidity();

}


updateLiquidity();

// =====================================
// PART 5 - GHOST STRUCTURE FRAMEWORK
// =====================================

const GHOST={

externalHigh:null,

externalLow:null,

trend:"Neutral",

waitingForBreak:true

};


function updateGhostEngine(){

// Placeholder for real candle data.
// In the next version this will use actual
// TradingView candle information.

if(GHOST.trend==="Bullish"){

STATUS.trend="Bullish";

STATUS.condition="Trending Up";

STATUS.signal="Waiting for BOS";

}

else if(GHOST.trend==="Bearish"){

STATUS.trend="Bearish";

STATUS.condition="Trending Down";

STATUS.signal="Waiting for BOS";

}

else{

STATUS.trend="Neutral";

STATUS.condition="Building Structure";

STATUS.signal="No Trade";

}

updateMarketStatus();

}


setInterval(updateGhostEngine,3000);
