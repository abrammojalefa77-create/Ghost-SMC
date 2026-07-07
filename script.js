// =====================================
// Ghost SMC PRO
// Version : 4.1.0
// File    : script.js
// Part    : 1/3
// Status  : Stable
// =====================================


// ===========================
// APP SETTINGS
// ===========================

const APP = {

symbol:"OANDA:XAUUSD",

timeframe:"15",

session:"Loading..."

};


let tvWidget;


// ===========================
// TRADINGVIEW CHART ENGINE
// ===========================

function loadChart(){


if(typeof TradingView === "undefined"){

console.log("TradingView waiting...");

return;

}


document.getElementById("tradingview_chart").innerHTML="";


tvWidget = new TradingView.widget({

container_id:"tradingview_chart",

width:"100%",

height:500,

symbol:APP.symbol,

interval:APP.timeframe,

timezone:"Etc/UTC",

theme:"dark",

style:"1",

locale:"en",

toolbar_bg:"#111111",

enable_publishing:false,

hide_side_toolbar:false,

allow_symbol_change:true

});


}


// ===========================
// SESSION ENGINE
// ===========================

function updateSession(){


let hour=new Date().getUTCHours();


let session="Asia";


if(hour>=7 && hour<12){

session="London";

}

else if(hour>=12 && hour<17){

session="New York";

}


APP.session=session;


let sessionBox=document.getElementById("session");


if(sessionBox){

sessionBox.textContent=session;

}


}

// ===========================
// TIMEFRAME CONTROL
// ===========================

function changeTimeframe(tf){


APP.timeframe=tf;


let label="M15";


if(tf==="1") label="M1";

if(tf==="5") label="M5";

if(tf==="15") label="M15";

if(tf==="60") label="H1";

if(tf==="240") label="H4";

if(tf==="D") label="D1";


let box=document.getElementById("timeframe");


if(box){

box.textContent=label;

}


loadChart();


}



// ===========================
// BUTTON CONNECTION
// ===========================

function setupButtons(){


let buttons=document.querySelectorAll(".timeframes button");


buttons.forEach(function(button){


button.addEventListener("click",function(){


let tf=button.getAttribute("data-tf");


changeTimeframe(tf);


});


});


}



// ===========================
// MARKET STATUS CONNECTION
// ===========================

function updateMarketStatus(){


let pair=document.getElementById("pair");

let trend=document.getElementById("trend");

let condition=document.getElementById("condition");

let signal=document.getElementById("signal");


if(pair){

pair.textContent=APP.symbol.replace("OANDA:","");

}


if(trend){

trend.textContent="Neutral";

}


if(condition){

condition.textContent="Building Structure";

}


if(signal){

signal.textContent="No Trade";

}


}



// ===========================
// APP STARTUP
// ===========================

function startGhostSMC(){


updateSession();

setupButtons();

updateMarketStatus();

loadChart();


setInterval(updateSession,60000);


}

// ===========================
// ENGINE START
// ===========================

window.addEventListener("load",function(){

startGhostSMC();

});


// ===========================
// DEBUG CONNECTION
// ===========================

function engineMessage(message){

console.log(
"Ghost SMC:",
message
);

}


engineMessage(
"Engine Started v4.1.0"
);
