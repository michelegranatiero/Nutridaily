//eventi alimenti pasti
var tbody;
var count = 0;
var pastiArray = []; //[pasto,id]
var tempAlim = [];


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
    tbody = $(window.event.target).closest("div"); //accordion-header
    $("#exampleModalLabel").html(tbody.attr("id"));
}

//rimuovi alimento
function remove_tr(id_riga) {
    let riga = $("#" + id_riga);
    riga.remove();
}

/* chiamata da search.php per inserire l'alimento selezionato nella casella*/
function fill(alim, carb, prot, gras, cal) {
    //Assigning value to "search" div in "search.php" file.
    $('#searchedItem').val(alim);
    //Hiding "display" div in "search.php" file.
    $('#display').hide();
    $("#searchText").hide();
    $('#searchedGroup').show();
    $('#searchText').val(null);
    tempAlim = []; //svuota
    tempAlim.push[carb];
    tempAlim.push[prot];
    tempAlim.push[gras];
    tempAlim.push[cal];
}

function rowTemplate(sezione, alim, car, pro, gra, cal) {
    let template1 = `
            <!-- header tabella -->
            <div class="row alim-row" id="riga${count.toString()}">
              <div class="col">
                <button type="button" onclick="remove_tr('riga${count.toString()}')" class="button-remove">-</button>
                ${alim}
              </div>
              <div class="col">
                ${car}
              </div>
              <div class="col">
                ${pro}
              </div>
              <div class="col">
                ${gra}
              </div>
              <div class="col">
                ${cal}
              </div>
            </div>
            `;

    $(sezione).append(template1);
}

function displayAlimenti(arr){
     arr.forEach(al =>{
         pastiArray.forEach(pas=>{
             if (al[0] == pas[1]){
                 rowTemplate('#body-'+pas[0], al[1], al[2], al[3], al[4], al[5]);
             }
         });
     } );
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

/* function objToArray2(arrObj, arr) {
    arrObj.forEach((elem, index) => {
        arr.push([]);
        for (let key in elem) {
            arr[index].push([key, elem[key]]);
        }
    });
} */

//aggiorna la pagina con la data dell'argomento
function aggiornaData(date) {
    //check esistenza diario
    var idPasti;
    $.ajax({
        type: 'POST',
        url: 'checkDay.php',
        data: { date: date },
        success: function (data) {
            idPasti = data;
            console.log(data);            
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
                        console.log(arrOfObj);
                        pastiArray = []; //svuota
                        objToArray(arrOfObj, pastiArray); //aggiorna pastiArray
                        console.log(pastiArray);
                        console.log(pastiArray[0]);
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
                pastiArray = []; //svuota
                objToArray(idPasti, pastiArray);//aggiorna pastiArray
                console.log(pastiArray);
                /* prende in input 'date' e id utente */
                var dbArray = []; //conterrà tutti gli alimenti associati ai pasti
                $.ajax({ //------------------------------------
                    type: "POST",
                    url: "fetchDay.php",
                    data: {date: date},
                    success: function (data) {
                        console.log(data);
                        var temp = data;
                        console.log(temp);
                        if(temp){ //se ci sono alimenti nel db
                            var temp = JSON.parse(data);
                            objToArray(temp, dbArray); //aggiorna db
                            console.log(dbArray);
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

    $('#accordion .panel').on("click", function () {
        $(this).siblings().find(".panel-heading").removeClass("panel-heading-active");
        $(this).find(".panel-heading").toggleClass("panel-heading-active");
    });

    //live search-------------------------------------------------------------------
    $('#searchedGroup').hide();

    $('#searchDelete').click(function () {
        $('#searchedGroup').hide();
        $('#searchText').show();
        $('#searchedItem').val("");
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
                data: {search: text},
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
            
            
            var expand = tbody.next(); //da espandere dopo
            tbody = tbody.next().find(".accordion-body");
            //$(tbody).append(template1);
            rowTemplate(tbody, alimento, tempAlim[0], tempAlim[1], tempAlim[2], tempAlim[3])
            $('#searchedItem').val("");
            if (!$(expand).hasClass("show")) {
                $(expand).collapse('toggle'); //espansione al click
            }; //azzera search

            var accId = tbody.attr("id");
            accId = accId.split('-')[1];
            console.log(accId);
            console.log(pastiArray);

            //-----------------------------------
            
            for(var i = 0; i < pastiArray.length; i++){
                if(pastiArray[i] == accId){

                }
            }
            $.ajax({
                type: 'POST',
                url: 'addFood.php',
                data: { alimento: alimento},
                success: function (data) {
                    console.log(data); 
                }
            });



        } else {
            alert('Inserisci un alimento');
        }
    });


    $(calendario).change(function () {
        aggiornaData($("calendario").val());

    });



})

