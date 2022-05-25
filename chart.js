    function updateChart() {
        myChart.config.data.datasets[0].data = [
            contCarb[0] + contCarb[1] + contCarb[2] + contCarb[3]+0.0001,
            contProt[0] + contProt[1] + contProt[2] + contProt[3]+0.0001,
            contGras[0] + contGras[1] + contGras[2] + contGras[3]+0.0001
        ]
        myChart.update();
    };

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
                label: 'Popolazione',  //quello che trovo all'interno del grafico
                data: [
                    0.0001,0.0001,0.0001
                ],
                backgroundColor: [
                    '#B22727', //prima città
                    '#FF8D29', //seconda città
                    '#187498', //terza città, etc
                ],/*qui posso passare un solo colore oppure tanti colori, tramite array, per quanti sono
                 gli elmenti in label, vedere w3school per i colori e le sfumature*/
                 hoverOffset: 4,
                hoverBorderColor: 'transparent',
                borderColor: 'transparent',
                
            }]
        },
        options: {

            responsive: true,
            //qui ci metto delle opzioni aggiuntive
            maintainAspectRatio: false,
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
                        color: 'white'
                    },
                },
                labels: {
                    fontColor: 'white',
                },
                //questo funziona 
                tooltips: {  //tendina che viene mostrata nel momento in cui passo sopra un elemento del grafico
                    enabled: true,
                    
                }
            }


            
        },
        /* plugins: [centerText] */


    }

    const myChart = new Chart(myCanvas, config);
