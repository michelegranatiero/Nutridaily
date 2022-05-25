//eventi alimenti pasti
var tbody;
var count = 0;
var pastiArray = []; //[pasto,id]
var tempAlim = [];
var alimentiCorr = [];
var collAccordions = ["coll1", "coll2", "coll3", "coll4"];
var timeout = 0;
var contCarb;
var contProt;
var contGras;
var contCal;

//popup scelta alimento
function vistaPasto() {
    //reset search on close
    if (!($(tbody).is($(window.event.target).closest("div")))) {
        $('#searchText').val("");
        $("#display").html("");
        $('#searchedGroup').hide();
        $('#searchedItem').val("");
        $('#searchText').show();
    }
    tbody = $(window.event.target).closest(".accordion-header"); //accordion-header
    $("#addModalLabel").html(tbody.attr("id"));
    console.log(tbody);
}

//rimuovi alimento
function remove_tr(id_riga, alim, pasto, car, pro, gra, cal, sez) {
    let riga = $("#" + id_riga);
    $.ajax({
        type: 'POST',
        url: 'removeFood.php',
        data: {
            idAlim: alim,
            idPasto: pasto
        },

        success: function (data) {
            console.log(data);
        }
    });
    riga.remove();

    collAccordions.forEach((elem, index)=>{
        if ($(sez).parent().attr("id") == elem) {
            contCarb[index] -= parseFloat(car);
            contProt[index] -= parseFloat(pro);
            contGras[index] -= parseFloat(gra);
            contCal[index] -= parseInt(cal);
        }
    });

    updateChart();


}

/* chiamata da search.php per inserire l'alimento selezionato nella casella*/
function fill(alim, carb, prot, gras, cal, idAlim) {
    //Assigning value to "search" div in "search.php" file.
    $('#searchedItem').val(alim);
    //Hiding "display" div in "search.php" file.
    $('#display').hide();
    $("#searchText").hide();
    $('#searchedGroup').show();
    $('#searchText').val(null);
    tempAlim = []; //svuota
    tempAlim.push(carb);
    tempAlim.push(prot);
    tempAlim.push(gras);
    tempAlim.push(cal);
    tempAlim.push(idAlim);
}


function prepRemove(riga, alim, pasto, car, pro, gra, cal, sez){
    $("#deleteReally").one('click', function(e){
        e.preventDefault();
        remove_tr(riga, alim, pasto, car, pro, gra, cal, sez);
        $(this).prop('disabled', true);
        console.log("premuto");
    });
}

function rowTemplate(sezione, alim, car, pro, gra, cal, alId, pasId) {
    let template1 = `

    <div class="row alim-row overflow-hidden" id="riga${count.toString()}">
                <!-- bottone + alimento -->
                <div class="col-md-5 d-flex flex-row align-items-center alim-only ">
                    <div class="row w-100">
                        <div class="col px-1 px-md-2" style="max-width: fit-content;">
                            <button type="button" class="btn btn-danger del-button" data-bs-toggle="modal" data-bs-target="#remModal"
                            onclick="prepRemove('riga${count.toString()}',${alId}, ${pasId}, ${car}, ${pro}, ${gra}, ${cal}, '${sezione}')">
                                <i class="bi bi-x"></i>
                            </button>
                        </div>
                        <div class="col p-0 testo-alim">
                            ${alim}
                        </div>
                    </div>
                </div>
                <!-- header alimento mobile view-->
                <div class="d-md-none small-header p-1">
                    <div class="row">
                        <div class="col">
                            CAR
                        </div>
                        <div class="col">
                            PRO
                        </div>
                        <div class="col">
                            GRA
                        </div>
                        <div class="col text-black">
                            CAL
                        </div>
                    </div>
                </div>
                <!-- dati -->
                <div class="col bord-bl m-wid-car">
                    ${car}g
                </div>
                <div class="col m-wid-prot">
                    ${pro}g
                </div>
                <div class="col">
                    ${gra}g
                </div>
                <div class="col bord-br">
                    ${cal}
                </div>
            </div>
            `;

    $(sezione).append(template1);
    
    collAccordions.forEach((elem, index)=>{
        if ($(sezione).parent().attr("id") == elem) {
            contCarb[index] += parseFloat(car);
            contProt[index] += parseFloat(pro);
            contGras[index] += parseFloat(gra);
            contCal[index] += parseInt(cal);
        }
    });

}

function displayAlimenti(arr) {
    arr.forEach(al => {
        pastiArray.forEach(pas => {
            if (al[0] == pas[1]) {
                rowTemplate('#body-' + pas[0], al[1], al[2], al[3], al[4], al[5], al[6], al[0]);
            }
        });
    });
    updateChart();
    /* solo dopo aver inserito gli alimenti */
    if(timeout < 1){
        collAccordions.forEach(elem => {
            if (!$('#' + elem).hasClass("show")) {
                $('#' + elem).collapse('toggle'); //espansione accordion all'aggiunta dell'alimento
            };
        })
        timeout++
    }
}

//FUNZIONE CHE CONVERTE ARR OF OBJ IN ARR OF ARR
function objToArray(arrObj, arr) {
    arrObj.forEach((elem, index) => {
        arr.push([]);
        for (let key in elem) {
            arr[index].push(elem[key]);
        }
    });
}

/* function checkEmptyBody(){
    collAccordions.forEach(elem => {
        let body = $("#"+elem);
        if (body.html() == ""){
            body.html("Aggiungi Alimento");

        }
    });
    
}
 */
//aggiorna la pagina con la data dell'argomento
function aggiornaData(date) {
    //check esistenza diario
    count = 0; //azzera
    pastiArray.length = 0;
    pastiArray = []; //svuota
    alimentiCorr = []; //svuota
    $("#body-colazione").html("");
    $("#body-pranzo").html("");
    $("#body-cena").html("");
    $("#body-spuntini").html("");
    contCarb = [0.,0.,0.,0.];
    contProt = [0.,0.,0.,0.];
    contGras = [0.,0.,0.,0.];
    contCal  = [0,0,0,0];

    // $("#coll1").collapse("toggle"); -------------------------------------------------------

    var idPasti;
    $.ajax({
        type: 'POST',
        url: 'checkDay.php',
        data: { date: date },
        success: function (data) {
            idPasti = data;
            if (!idPasti) { //se non esiste un diario 
                /* crea diario e pasti per id utente e giorno 'date' e i pasti*/
                console.log("il diario non esiste");
                $.ajax({
                    type: 'POST',
                    url: 'addDay.php',
                    data: { date: date },
                    success: function (data) {
                        //ritorna array con id pasti
                        var arrOfObj = JSON.parse(data);
                        objToArray(arrOfObj, pastiArray); //aggiorna pastiArray
                        if (!pastiArray) {
                            alert("errore del database nella creazione del diario");
                        }

                    }
                });
            }
            else { //se esiste il diario
                //assegna id pasti
                console.log("esiste il diario");
                idPasti = JSON.parse(data);
                objToArray(idPasti, pastiArray);//aggiorna pastiArray

                /* prende in input 'date' e id utente */
                var dbArray = []; //conterrà tutti gli alimenti associati ai pasti
                $.ajax({
                    type: "POST",
                    url: "fetchDay.php",
                    data: { date: date },
                    success: function (data) {
                        var temp = data;
                        if (temp) { //se ci sono alimenti nel db
                            var temp = JSON.parse(data);
                            objToArray(temp, dbArray); //aggiorna db
                            displayAlimenti(dbArray);
                        }
                    }
                });

            }

        }
    });
}


/*----------------DOCUMENT READY------------------------- */
$(document).ready(function () {

    //live search
    $('#searchedGroup').hide();

    $('#searchDelete').click(function () {
        $('#searchedGroup').hide();
        $('#searchText').show();
        $('#searchedItem').val("");
        tempAlim = [];
    });

    //On pressing a key on "Search box" in "search.php" file. This function will be called.
    $("#searchText").keyup(function () {
        //Assigning search box value to javascript variable named as "txt".
        var text = $(this).val();
        //Validating, if "txt" is empty.
        if (text == "") {
            //Assigning empty value to "display" div in "search.php" file.
            $("#display").html("");
        }
        //If name is not empty.
        else {
            //AJAX is called.
            $.ajax({
                //AJAX type is "Post".
                type: "POST",
                //Data will be sent to "search.php".
                url: "search.php",
                //Data, that will be sent to "search.php".
                data: { search: text },
                //If result found, this funtion will be called.
                success: function (html) {
                    //Assigning result to "display" div in "search.php" file.
                    $('#display').show();
                    $("#display").html(html).show;
                }
            });
        }
    });


    //button aggiungi alimento
    $("#add-button").click(function () {
        if ($('#searchedItem').val() != "") {
            var alimento = $('#searchedItem').val();
            count += 1;
            var expand = tbody.next(); //da espandere DOPO
            tbody = tbody.next().find(".accordion-body").attr("id");
            $('#searchedItem').val("");
            var pasId;
            console.log(tbody);
            var accId = tbody.split('-')[1]; //nome pasto a cui è stato aggiunto l'alimento
            console.log(accId);
            for (var i = 0; i < pastiArray.length; i++) {
                if (pastiArray[i][0] == accId) {
                    pasId = pastiArray[i][1];
                    break;
                }
            }
            rowTemplate('#'+tbody, alimento, tempAlim[0], tempAlim[1], tempAlim[2], tempAlim[3], tempAlim[4], pasId)
            if (!$(expand).hasClass("show")) {
                $(expand).collapse('toggle'); //espansione accordion all'aggiunta dell'alimento
            };
            updateChart();
            $.ajax({
                type: 'POST',
                url: 'addFood.php',
                data: {
                    idAlim: tempAlim[4],
                    idpasto: pasId
                },
                success: function (data) {
                    console.log(data);
                }
            });




        } else {
            alert('Inserisci un alimento');
        }
    });


    $("#calendario").change(function () {
        aggiornaData($("#calendario").val());
        updateChart();
        
    });



})


