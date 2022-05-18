//eventi alimenti pasti
var tbody;
var count = 0;

function vistaPasto() {
    //reset search on close
    if (!($(tbody).is($(event.target).closest("div")))) {
        $('#searchText').val("");
        $("#display").html("");
        $('#searchedItem').hide();
        $('#searchedItem').val("");
        $('#searchText').show();
    }

    tbody = $(event.target).closest("div");
    $("#exampleModalLabel").html(tbody.attr("id"));
}

function remove_tr(id_riga) {
    let riga = $("#" + id_riga);
    riga.remove();
}

/* live search.......... */
function fill(value) {
    //Assigning value to "search" div in "search.php" file.
    $('#searchedItem').val(value);
    //Hiding "display" div in "search.php" file.
    $('#display').hide();
    $("#searchText").hide();
    $('#searchedItem').show();
    $('#searchText').val(null);

}

$(document).ready(function () {

    $('#accordion .panel').on("click", function () {
        $(this).siblings().find(".panel-heading").removeClass("panel-heading-active");
        $(this).find(".panel-heading").toggleClass("panel-heading-active");
    });

    //live search-------------------------------------------------------------------
    $('#searchedItem').hide();

    $('#searchedItem').click(function () {
        $('#searchedItem').hide();
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
                    //Assigning value of "name" into "search" variable.
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
            console.log($('#searchedItem').val());
            $('#searchedItem').val("");
            console.log($('#searchedItem').val());
            var expand = tbody.next(); //da espandere dopo
            tbody = tbody.next().find(".accordion-body");
            $(tbody).append(template1);
            if (!$(expand).hasClass("show")) {
                $(expand).collapse('toggle'); //espansione al click
            }; //azzera search
        } else {
            alert('Inserisci un alimento');
        }
    });

})

