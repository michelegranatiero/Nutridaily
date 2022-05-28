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
var bmrValue;

//popup scelta alimento
function vistaPasto() {
    //reset search on close
    if (!($(tbody).is($(window.event.target).closest(".accordion-header")))) {
        $('#searchText').val("");
        $("#display").html("");
        $('#searchedGroup').hide();
        $('#searchedItem').val("");
        $('#grams').val("100");
        $('#searchText').show();
    }
    tbody = $(window.event.target).closest(".accordion-header"); //accordion-header
    $("#addModalLabel").html(tbody.attr("id"));
}

//rimuovi alimento
function remove_tr(id_riga, alim, car, pro, gra, cal, sez) {
    let riga = $("#" + id_riga);
    $.ajax({
        type: 'POST',
        url: './ajaxcalls/removeFood.php',
        data: {
            idAlim: alim
        },
        success: function (data) {
            if (data) {
                collAccordions.forEach((elem, index) => {
                    if ($(sez).parent().attr("id") == elem) {
                        contCarb[index] -= parseFloat(car);
                        contProt[index] -= parseFloat(pro);
                        contGras[index] -= parseFloat(gra);
                        contCal[index] -= parseInt(cal);
                    }
                });
                riga.remove();
                updateChart();
            }
        }
    });



}

/* chiamata da search.php per inserire l'alimento selezionato nella casella*/
function fill(alim, carb, prot, gras, cal, idAlim) {
    //assegna valore alla ricerca.
    $('#searchedItem').val(alim);
    //nascondi.
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


function prepRemove(riga, alim, car, pro, gra, cal, sez) {
    $("#deleteReally").one('click', function (e) {
        e.preventDefault();
        remove_tr(riga, alim, car, pro, gra, cal, sez);
    });
}

function rowTemplate(sezione, alimId, alim, car, pro, gra, cal, grams) {
    count++;
    console.log("grammi", grams);
    car = Math.round(car/100*grams * 10)/10; //round 1 decimal
    pro = Math.round(pro/100*grams * 10)/10; //round 1 decimal
    gra = Math.round(gra/100*grams * 10)/10; //round 1 decimal
    cal = Math.round(cal/100*grams); //round int
    let template1 = `
    <div class="row alim-row overflow-hidden" id="riga${count.toString()}">
        <!-- bottone + alimento -->
        <div class="col-md-5 d-flex flex-row align-items-center alim-only ">
            <div class="row w-100">
                <div class="col px-1 px-md-2" style="max-width: fit-content;">
                    <button type="button" class="btn btn-danger del-button" data-bs-toggle="modal" data-bs-target="#remModal"
                    onclick="prepRemove('riga${count.toString()}',${alimId}, ${car}, ${pro}, ${gra}, ${cal}, '${sezione}')">
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

    collAccordions.forEach((elem, index) => {
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
            if (al[7] == pas[1]) {
                rowTemplate('#body-' + pas[0], al[0], al[1], al[2], al[3], al[4], al[5], al[6]);
            }
        });
    });
    /* solo dopo aver inserito gli alimenti */
    if (timeout < 1) {
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


function calcBMR(arr){
    //HARRIS-BENEDICT EQUATION
    let gender = arr[0];
    let age = arr[1];
    let weight = arr[2];
    let height = arr[3];
    if(gender == 'donna'){
        bmrValue = Math.round(655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age));
    }
    else if (gender == 'uomo'){
        bmrValue = Math.round(66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age));
    }
    //fattore di attività (1.2 sedentario, 1.375, 1.55, 1.725)
    let actFact = 1.2;
    bmrValue = Math.round(bmrValue * actFact);
}

function getBMR() {
    var bmrData = [];
    $.ajax({
        type: "POST",
        url: "./ajaxcalls/bmr.php",
        success: function (data) {
            if (data) { 
                var data = JSON.parse(data);
                objToArray(data, bmrData);
                calcBMR(bmrData[0]);
            }
            else{
                alert("errore nella richiesta al server");
            };
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
    //init
    count = 0;
    pastiArray = []; //svuota
    alimentiCorr = []; //svuota
    $("#body-colazione").html("");
    $("#body-pranzo").html("");
    $("#body-cena").html("");
    $("#body-spuntini").html("");
    contCarb = [0., 0., 0., 0.];
    contProt = [0., 0., 0., 0.];
    contGras = [0., 0., 0., 0.];
    contCal = [0, 0, 0, 0];

    //check esistenza diario
    var idPasti;
    $.ajax({
        type: 'POST',
        url: './ajaxcalls/checkDay.php',
        data: { date: date },
        success: function (data) {
            idPasti = data;
            if (!idPasti) { //se non esiste un diario 
                /* crea diario e pasti per id utente e giorno 'date' e i pasti*/
                $.ajax({
                    type: 'POST',
                    url: './ajaxcalls/addDay.php',
                    data: { date: date },
                    success: function (data) {
                        //ritorna array con id pasti
                        var arrOfObj = JSON.parse(data);
                        objToArray(arrOfObj, pastiArray); //aggiorna pastiArray
                        updateChart();

                    }
                });
            }
            else { //se esiste il diario
                //assegna id pasti
                idPasti = JSON.parse(data);
                objToArray(idPasti, pastiArray);//aggiorna pastiArray

                //prende in input 'date' e id utente
                var dbArray = []; //conterrà tutti gli alimenti associati ai pasti
                $.ajax({
                    type: "POST",
                    url: "./ajaxcalls/fetchDay.php",
                    data: { date: date },
                    success: function (data) {
                        var temp = data;
                        if (temp) { //se ci sono alimenti nel db
                            var temp = JSON.parse(data);
                            objToArray(temp, dbArray);
                            console.log(dbArray);
                            displayAlimenti(dbArray);
                        }
                        updateChart();
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


    getBMR();

    $('#searchDelete').click(function () {
        $('#searchedGroup').hide();
        $('#searchText').show();
        $('#searchedItem').val("");
        $('#grams').val("100");
        tempAlim = [];
    });

    //search keyup
    $("#searchText").keyup(function () {
        var text = $(this).val();
        //se text è vuoto.
        if (text == "") {
            $("#display").html("");
        }
        //se text non è vuoto.
        else {
            $.ajax({
                type: "POST",
                url: "./ajaxcalls/search.php",
                data: { search: text },
                success: function (html) {
                    //Risultato da mostrare in search
                    $('#display').show();
                    $("#display").html(html).show;
                }
            });
        }
    });


    //button aggiungi alimento
    $("#add-button").click(function () {
        let grams = $('#grams').val();
        if (grams <= 0 || grams >= 5000){
            alert("I grammi devono essere un numero compreso tra 1 e 5000");
        }
        else if ($('#searchedItem').val() != "") {
            var alimento = $('#searchedItem').val();
            var expand = tbody.next(); //da espandere DOPO
            tbody = tbody.next().find(".accordion-body").attr("id");
            $('#searchedItem').val("");
            var pasId;
            var accId = tbody.split('-')[1]; //nome pasto a cui è stato aggiunto l'alimento
            for (var i = 0; i < pastiArray.length; i++) {
                if (pastiArray[i][0] == accId) {
                    pasId = pastiArray[i][1];
                    break;
                }
            }
            $.ajax({
                type: 'POST',
                url: './ajaxcalls/addFood.php',
                data: {
                    idAlim: tempAlim[4],
                    idpasto: pasId,
                    grams: grams
                },
                success: function (data) {
                    if (data) {
                        var arrOfObj = JSON.parse(data);
                        let varId = [];
                        objToArray(arrOfObj, varId); //aggiorna varId
                        console.log(varId);
                        let idAl = varId[0][0];
                        console.log(idAl);
                        rowTemplate('#' + tbody, idAl, alimento, tempAlim[0], tempAlim[1], tempAlim[2], tempAlim[3], grams)
                        if (!$(expand).hasClass("show")) {
                            $(expand).collapse('toggle'); //espansione accordion all'aggiunta dell'alimento
                        };
                        updateChart();
                    }
                }
            });




        } else {
            alert('Inserisci un alimento');
        }
    });


    $("#calendario").change(function () {
        aggiornaData($("#calendario").val());
    });



})


