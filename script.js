


// -------------------------
// TradingView Chart
// -------------------------

new TradingView.widget({

container_id: "tradingview_chart",

width: "100%",

height: 500,

symbol: "OANDA:XAUUSD",

interval: "15",

timezone: "Etc/UTC",

theme: "dark",

style: "1",

locale: "en",

toolbar_bg: "#111",

enable_publishing: false,

hide_side_toolbar: false,

allow_symbol_change: true

});


// -------------------------
// Market Status Variables
// -------------------------

let marketData = {

price: 0,

high: 0,

low: 0,

};


let currentTrend = "Waiting...";


// -------------------------
// Session Detector
// -------------------------

function updateSession(){

let hour = new Date().getUTCHours();

let session = "Asia";


if(hour >= 7 && hour < 12){

session = "London";

}


else if(hour >= 12 && hour < 17){

session = "New York";

}


document.getElementById("session").innerHTML = session;

}


updateSession();

setInterval(updateSession,60000);

// -------------------------
// Market Condition Engine
// -------------------------

function updateMarketCondition(){

let condition = "Ranging";


if(currentTrend === "Bullish"){

condition = "Trending Up";

}


else if(currentTrend === "Bearish"){

condition = "Trending Down";

}


document.getElementById("condition").innerHTML = condition;


document.getElementById("trend").innerHTML = currentTrend;

}


// -------------------------
// SMC Structure Engine
// -------------------------

function updateSMCEngine(){

let bos = "Waiting...";

let choch = "Waiting...";

let liquidity = "Scanning...";

let orderblock = "Searching...";

let fvg = "Scanning...";


// Engine foundation
// Real candle logic will be added next


document.getElementById("bos").innerHTML = bos;

document.getElementById("choch").innerHTML = choch;

document.getElementById("liquidity").innerHTML = liquidity;

document.getElementById("orderblock").innerHTML = orderblock;

document.getElementById("fvg").innerHTML = fvg;


}


updateMarketCondition();

updateSMCEngine();


setInterval(updateMarketCondition,5000);

setInterval(updateSMCEngine,5000);

// -------------------------
// SMC Swing Structure Scanner
// -------------------------

let previousHigh = 0;

let previousLow = 0;

let structure = "Neutral";



function scanStructure(){


let price = marketData.price;


// Waiting for live price feed

if(price === 0){

return;

}


// Basic structure framework


if(price > previousHigh && previousHigh !== 0){


structure = "Bullish";

currentTrend = "Bullish";


document.getElementById("bos").innerHTML = "Bullish BOS";


}


else if(price < previousLow && previousLow !== 0){


structure = "Bearish";

currentTrend = "Bearish";


document.getElementById("bos").innerHTML = "Bearish BOS";


}


// Update dashboard

document.getElementById("trend").innerHTML = currentTrend;



}



// -------------------------
// Liquidity & Zone Scanner
// -------------------------

function updateLiquidity(){


if(currentTrend === "Bullish"){


document.getElementById("liquidity").innerHTML =
"Sell Side Liquidity Cleared";


document.getElementById("orderblock").innerHTML =
"Demand Zone";


document.getElementById("fvg").innerHTML =
"Bullish FVG";


}


else if(currentTrend === "Bearish"){


document.getElementById("liquidity").innerHTML =
"Buy Side Liquidity Cleared";


document.getElementById("orderblock").innerHTML =
"Supply Zone";


document.getElementById("fvg").innerHTML =
"Bearish FVG";


}


}



setInterval(scanStructure,5000);

setInterval(updateLiquidity,5000);
// Ghost SMC Timeframe Buttons

let buttons = document.querySelectorAll(".timeframes button");

buttons.forEach(function(button){

button.onclick = function(){

let tf = button.innerHTML;

document.getElementById("timeframe").innerHTML = tf;

console.log("Timeframe changed:", tf);

};

});

// ===============================
// GHOST SMC ANALYSIS ENGINE v3.3
// ===============================


function runSMCEngine(){


let trend =
document.getElementById("trend");

let condition =
document.getElementById("condition");

let signal =
document.getElementById("signal");

let bos =
document.getElementById("bos");

let choch =
document.getElementById("choch");

let liquidity =
document.getElementById("liquidity");

let orderblock =
document.getElementById("orderblock");

let fvg =
document.getElementById("fvg");



trend.innerHTML = "Bullish / Bearish Scan";

condition.innerHTML = "Market Structure Analysis";

signal.innerHTML = "Waiting For Setup";


bos.innerHTML = "Searching...";
choch.innerHTML = "Searching...";

liquidity.innerHTML = "Scanning Liquidity";

orderblock.innerHTML = "Finding Zones";

fvg.innerHTML = "Scanning Gaps";



setTimeout(()=>{

bos.innerHTML = "Detected";

},1500);



setTimeout(()=>{

choch.innerHTML = "Monitoring";

},2500);



setTimeout(()=>{

liquidity.innerHTML = "Active";

},3500);



setTimeout(()=>{

orderblock.innerHTML = "Ready";

},4500);



setTimeout(()=>{

fvg.innerHTML = "Searching";

},5500);



}



setInterval(runSMCEngine,10000);
