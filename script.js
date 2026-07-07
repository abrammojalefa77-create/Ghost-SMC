// =================================
// Ghost SMC PRO v3.1.0
// Dashboard Engine Fixed
// =================================


const state = {

    pair: "XAUUSD",
    timeframe: "M15",
    trend: "Waiting...",
    signal: "None",

    bos: "Waiting...",
    choch: "Waiting...",
    liquidity: "Waiting...",
    orderblock: "Waiting...",
    fvg: "Waiting..."

};



// ================================
// UPDATE SCREEN
// ================================

function updateDashboard(){

    document.getElementById("pair").textContent = state.pair;

    document.getElementById("timeframe").textContent = state.timeframe;

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



document.addEventListener("DOMContentLoaded",function(){


    updateDashboard();


    const buttons = document.querySelectorAll(".timeframes button");


    buttons.forEach(function(button){

        button.addEventListener("click",function(){

            setTimeframe(button.textContent);

        });

    });


    startDemoEngine();


});




// ================================
// DEMO SMC ENGINE
// ================================

function startDemoEngine(){


    setInterval(function(){


        let chance = Math.random();



        if(chance > 0.65){


            state.trend = "Bullish";

            state.signal = "BUY";

            state.bos = "✅ BOS Confirmed";

            state.choch = "Waiting...";

            state.liquidity = "Buy Side Liquidity";

            state.orderblock = "Bullish Order Block";

            state.fvg = "FVG Present";


        }


        else if(chance < 0.35){


            state.trend = "Bearish";

            state.signal = "SELL";

            state.bos = "Waiting...";

            state.choch = "⚡ CHoCH Detected";

            state.liquidity = "Sell Side Liquidity";

            state.orderblock = "Bearish Order Block";

            state.fvg = "FVG Present";


        }


        else{


            state.trend = "Ranging";

            state.signal = "WAIT";

            state.bos = "Waiting...";

            state.choch = "Waiting...";

            state.liquidity = "Searching";

            state.orderblock = "None";

            state.fvg = "None";


        }


        updateDashboard();


    },3000);


}
