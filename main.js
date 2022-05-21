//eventi alimenti pasti
var tbody;
var count = 0;
var pastiArray = []; //[pasto:id]

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
    tbody = $(window.event.target).closest("div");
    $("#exampleModalLabel").html(tbody.attr("id"));
}

//rimuovi alimento
function remove_tr(id_riga) {
    let riga = $("#" + id_riga);
    riga.remove();
}

/* chiamata da search.php per inserire l'alimento selezionato nella casella*/
function fill(value) {
    //Assigning value to "search" div in "search.php" file.
    $('#searchedItem').val(value);
    //Hiding "display" div in "search.php" file.
    $('#display').hide();
    $("#searchText").hide();
    $('#searchedGroup').show();
    $('#searchText').val(null);
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

//FUNZIONE CHE CONVERTE ARR OF OBJ IN ARR OF ARR
function objToArray(arrObj, arr){
    arrObj.forEach(elem => {
        for (let key in elem){
            arr.push([key, elem[key]]);
        }
    });
}


//aggiorna la pagina con la data dell'argomento
function aggiornaData(date) {
    //check esistenza diario
    var diario;
    $.ajax({
        type: 'POST',
        url: 'checkDay.php',
        data: { date: date },
        success: function (data) {
            diario = JSON.parse(data);
            console.log(Array.isArray(diario));
            console.log(diario);
            console.log(typeof (diario[0]));
            if (!diario[0]) { //se non esiste un diario
                /* crea diario per id utente e giorno 'date' e i pasti*/
                console.log("prova");
                $.ajax({
                    type: 'POST',
                    url: 'addDay.php',
                    data: { date: date },//checkpoint
                    success: function (data) {
                        var arrOfObj = JSON.parse(data);
                        console.log(arrOfObj);
                        //FUNZIONE CHE CONVERTE ARR OF OBJ IN ARR OF ARR
                        objToArray(arrOfObj, pastiArray);
                        
                        console.log(pastiArray);
                        console.log(pastiArray[0]);
                        if (!pastiArray) {
                            alert("errore del database nella creazione del diario");
                        }

                    }
                });
            }
            else { //se esiste il diario
                /* prende in input 'date' e id utente */
                var dbArray;
                $.ajax({
                    type: "POST",
                    url: "fetchDay.php",
                    data: { diario: diario },
                    success: function (data) {
                        dbArray = JSON.parse(data);
                    }
                });
                /* PHP: (array con 4 array dentro) per ogni pasto esegui query per ogni alimento*/
                /* template client o server??? */
                /* $(#body).html(..array1..) */
                dbArray.forEach(row => {
                    for (const key in pastiArray) {
                        const value = pastiArray[key];
                        if (row[0] === key) {
                            rowTemplate('#body-' + key, row[1], row[2], row[3], row[4], row[5]);
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
        var txt = $(this).val();
        //Validating, if "txt" is empty.
        if (txt == "") {
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
                data: {
                    //Assigning value of "txt" into "search" variable.
                    search: txt
                },
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
            let template1 = `
            <!-- header tabella -->
            <div class="row alim-row" id="riga${count.toString()}">
              <div class="col">
                <button type="button" onclick="remove_tr('riga${count.toString()}')" class="button-remove">-</button>
                ${alimento}
              </div>
              <div class="col">
                10
              </div>
              <div class="col">
                20
              </div>
              <div class="col">
                30
              </div>
              <div class="col">
                60
              </div>
            </div>
            `;
            $('#searchedItem').val("");
            var expand = tbody.next(); //da espandere dopo
            tbody = tbody.next().find(".accordion-body");
            $(tbody).append(template1);
            if (!$(expand).hasClass("show")) {
                $(expand).collapse('toggle'); //espansione al click
            }; //azzera search

            $.ajax({
                type: 'POST',
                url: 'addFood.php',
                data: { alimento: alimento },
                success: function (data) {
                    console.log(data); //da rivedere-------------------
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

