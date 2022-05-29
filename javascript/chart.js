/* css circ progress */
let progBar = $(".circ-progress");
let contVal = $(".cont-value");
let progVal = 0;
let endVal = 1500;
let totVal = 1800; //BMR
let speed = 5;
let fract = 360.0 / totVal;


function interv(prog) {
    contVal.text(`${progVal}/${totVal}`);
    let backg = `conic-gradient( 
                #fff ${progVal * fract}deg,
                #198754 ${progVal * fract}deg
             )`;
    progBar.css("background-image", backg);
    if (progVal == endVal) {
        clearInterval(prog);
    }
}

function updateCalChart() {
    endVal = contCal[0] + contCal[1] + contCal[2] + contCal[3];
    totVal = bmrValue;
    fract = 360.0 / totVal;

    let act = progVal;
    let progress = setInterval(() => {
        if(endVal > act){
            let incr = 50;
            if((endVal-progVal)<50){
                incr = 1;
            }
            progVal += incr;
        }
        else if(endVal < act){
            let incr = 50;
            if((progVal-endVal)<50){
                incr = 1;
            }
            progVal -= incr;
        }
        interv(progress);

    }, speed);

}




/* chart js */
function updateChart() {
    myChart.config.data.datasets[0].data = [
        contCarb[0] + contCarb[1] + contCarb[2] + contCarb[3] + 0.0001,
        contProt[0] + contProt[1] + contProt[2] + contProt[3] + 0.0001,
        contGras[0] + contGras[1] + contGras[2] + contGras[3] + 0.0001
    ]
    myChart.update();
    //update calChart
    updateCalChart();
    //update visibility head-large
    let headers = $(".acc-header");
    Array.prototype.slice.call(headers).forEach(header => {
        let body = $(header).next();
        if ( $(body).children().length == 0){
            $(header).hide();
            $(body).html("Questo pasto è vuoto, aggiungi un alimento con il pulsante +");
        }
    });
}

/* MACRONUT */
const myCanvas = $('#chartTotale');


/* const centerText = {
    id:"centerText",
    afterDatasetsDraw(chart, args, options){
        const {ctx, chartArea: {left,right,top,bottom,width,height}} =
            chart;
        ctx.save();
 
        ctx.font = "bolder 20px Arial";
        ctx.fillStyle = '#EB5353';
        ctx.textAlign = 'center';
        ctx.fillText('Calorie:', width/2 + left, height/2 + top);
 
        ctx.font = "bolder 20px Arial";
        ctx.fillStyle = '#EB5353';
        ctx.textAlign = 'center';
        ctx.fillText('Calorie:', width/2 + left, height/2 + top);
    }
}
 */


const config = {
    type: 'doughnut',
    data: {
        labels: [
            'Carboidrati',
            'Proteine',
            'Grassi'
        ],
        datasets: [{ //riceve degli oggetti
            label: 'Macronutrienti',
            data: [
                0.0001, 0.0001, 0.0001
            ],
            backgroundColor: [
                '#B22727',
                '#FF8D29',
                '#187498',
            ],
            hoverOffset: 4,
            hoverBorderColor: 'transparent',
            borderColor: 'transparent',

        }]
    },
    options: {

        responsive: false,
        maintainAspectRatio: true,
        aspectRatio: 2,

        plugins: {
            title: {
                display: false,
                color: 'white',
                text: 'Totale',

            },
            legend: {

                display: true,
                position: 'left',
                labels: {
                    color: 'white',
                    font: {
                        size: 13
                    },
                    boxWidth: 13,
                },
            },
            labels: {
                fontColor: 'white',
                fontSize: 15
            },
            tooltips: {
                enabled: true,

            }
        }



    },
    /* plugins: [centerText] */


}

const myChart = new Chart(myCanvas, config);
