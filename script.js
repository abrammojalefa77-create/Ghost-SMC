// =================================
// Ghost SMC PRO v3.2.0
// TradingView Foundation + Dashboard
// =================================


// ================================
// STATE
// ================================

const state = {

    pair: "XAUUSD",

    timeframe: "15",

    trend: "Waiting...",

    signal: "None",

    bos: "Waiting...",

    choch: "Waiting...",

    liquidity: "Waiting...",

    orderblock: "Waiting...",

    fvg: "Waiting..."

};



// ================================
// UPDATE DASHBOARD
// ================================

function updateDashboard(){


    document.getElementById("pair").textContent = state.pair;

    document.getElementById("timeframe").textContent = "M" + state.timeframe;


    document.getElementById("trend").textContent = state.trend;

    document.getElementById("signal").textContent = state.signal;


    document.getElementById("bos").textContent = state.bos;

    document.getElementById("choch").textContent = state.choch;

    document.getElementById("liquidity").textContent = state.liquidity;

    document.getElementById("orderblock").textContent = state.orderblock;

    document.getElementById("fvg").textContent = state.fvg;

}



// ================================
// TIMEFRAME BUTTONS
// ================================

function setTimeframe(tf){


    state.timeframe = tf;


    updateDashboard();


}





// ================================
// TRADINGVIEW WIDGET
// ================================


function loadTradingView(){


    const script = document.createElement("script");


    script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";


    script.async = true;



    script.innerHTML = JSON.stringify({

        "autosize": true,

        "symbol": "OANDA:XAUUSD",

        "interval": "15",

        "timezone": "Etc/UTC",

        "theme": "dark",

        "style": "1",

        "locale": "en",

        "hide_top_toolbar": false,

        "hide_legend": false,

        "allow_symbol_change": true,

        "container_id": "tradingview_chart"

    });



    document.getElementById("tradingview_chart")
    .appendChild(script);


}






// ================================
// DEMO SMC ENGINE
// ================================

function startDemoEngine(){


setInterval(()=>{


let chance = Math.random();



if(chance > 0.65){


state.trend="Bullish";

state.signal="BUY";

state.bos="✅ BOS Confirmed";

state.choch="Waiting...";

state.liquidity="Buy Side Liquidity";

state.orderblock="Bullish Order Block";

state.fvg="FVG Present";


}



else if(chance < 0.35){


state.trend="Bearish";

state.signal="SELL";

state.bos="Waiting...";

state.choch="⚡ CHoCH Detected";

state.liquidity="Sell Side Liquidity";

state.orderblock="Bearish Order Block";

state.fvg="FVG Present";


}



else{


state.trend="Ranging";

state.signal="WAIT";

state.bos="Waiting...";

state.choch="Waiting...";

state.liquidity="Searching";

state.orderblock="None";

state.fvg="None";


}



updateDashboard();



},3000);



}







// ================================
// START APP
// ================================


document.addEventListener("DOMContentLoaded",()=>{


updateDashboard();



const buttons =
document.querySelectorAll(".timeframes button");



buttons.forEach(button=>{


button.addEventListener("click",()=>{


let text = button.textContent;


let tf = text.replace("M","").replace("H","").replace("D","");



state.timeframe = tf;



updateDashboard();



});


});



loadTradingView();


startDemoEngine();



});
