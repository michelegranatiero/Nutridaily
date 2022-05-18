<?php
session_start();
if (!isset($_SESSION["idutente"])) {
  header("Location: ./login/login.php");
  die();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Index</title>
  <!-- Bootstrap -->
  <link rel="stylesheet" type="text/css" href="./bootstrap/css/bootstrap.css" />
  <!--   <script type="application/javascript" src="./bootstrap/js/bootstrap.js"></script> -->
  <!-- Vue -->
  <script src="https://unpkg.com/vue@3"></script>
  <!-- JQuery -->
  <script src="//code.jquery.com/jquery-3.6.0.js"></script>
  <!-- style css -->
  <link rel="stylesheet" type="text/css" href="style.css" />
  <!-- google fonts -->
  <link rel="stylesheet" href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />



</head>

<body>
  <!-- navbar -->
  <header>
    <nav class="navbar navbar-expand-sm navbar-light bg-light shadow fixed-top rounding">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center fw-bold fs-3 nav-text-color" href="./index.php">
          <img src="./assets/nutrilogo.png" width="55px" class="d-inline-block">
          Nutridaily
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span> <!-- cambiare -->
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-sm-auto d-flex align-items-baseline">
            <li class="nav-item">
              <span class="fs-6 fw-bold nav-text-color">
                <?php
                echo $_SESSION["msg"] . " " . $_SESSION["nomeutente"];
                $_SESSION["msg"] = "Ciao";
                ?>
              </span>
            </li>
            <li class="nav-item ms-sm-5">
              <a class="nav-link active fs-5 nav-text-color" href="./logout.php">Esci</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main class="container">
    <!-- Diario Alimentare Titolo-->
    <div class="row align-self-start">
      <h2 class="">Diario Alimentare</h2>
    </div>
    <!-- Contenitore Principale -->
    <div class="row cont1 p-3">
      <!-- header tabella -->
      <div class="row">
        <div class="col calendar-header text-color fs-5">
          <!-- Data:&nbsp -->
          <input type="date" id="calendario">
        </div>
        <div class="col">
          Carboidrati
        </div>
        <div class="col">
          Proteine
        </div>
        <div class="col">
          Grassi
        </div>
        <div class="col">
          Calorie
        </div>
      </div>
      <!-- colazione -->

      <!-- tabella accordion (vue.js)-->
      <div class="accordion p-0" id="accordionMeals">
        <meal pasto="Colazione" coll-id="coll1"></meal>
        <meal pasto="Pranzo" coll-id="coll2"></meal>
        <meal pasto="Cena" coll-id="coll3"></meal>
        <meal pasto="Spuntini" coll-id="coll4"></meal>
      </div>
    </div>

    <!--Modal Alimento-->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input type="button" class="form-control" value="" id="searchedItem">
            <input type="text" class="form-control" placeholder="Inserisci un alimento" id="searchText" spellcheck="false">

            <!-- live search -->
            <div id="display"></div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" data-bs-dismiss="modal" id="add-button">Aggiungi</button>
          </div>
        </div>
      </div>
    </div>







  </main>


  <!-- eventi alimenti pasti-->
  <script>
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

    $(document).ready(function() {

      $('#accordion .panel').on("click", function() {
        $(this).siblings().find(".panel-heading").removeClass("panel-heading-active");
        $(this).find(".panel-heading").toggleClass("panel-heading-active");
      });

      //live search-------------------------------------------------------------------
      $('#searchedItem').hide();

      $('#searchedItem').click(function() {
        $('#searchedItem').hide();
        $('#searchText').show();
        $('#searchedItem').val("");
      });

      //On pressing a key on "Search box" in "search.php" file. This function will be called.
      $("#searchText").keyup(function() {
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
            success: function(html) {
              //Assigning result to "display" div in "search.php" file.
              $('#display').show();
              $("#display").html(html).show;
            }
          });
        }
      });


      //button aggiungi alimento
      $("#add-button").click(function() {
        if ($('#searchedItem').val() != "") {
          var alimento = $('#searchedItem').val();
          count += 1;
          let template1 = `
            <!-- header tabella -->
            <div class="row alim-row" id="riga${count.toString()}">
              <div class="col calendar-header text-color fs-5">
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
  </script>


  <!-- calendar deny future dates -->
  <script>
    var todayDate = new Date();
    var month = todayDate.getMonth() + 1; //04 - current month
    var year = todayDate.getFullYear(); //2021 - current year
    var tdate = todayDate.getDate(); // 27 - current date 
    if (month < 10) {
      month = "0" + month //'0' + 4 = 04
    }
    if (tdate < 10) {
      tdate = "0" + tdate;
    }
    var maxDate = year + "-" + month + "-" + tdate;
    $(document).ready(function() {
      $("#calendario").attr("max", maxDate);
      $("#calendario").attr("value", maxDate);
    });
  </script>


  <!-- bootstrap js -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous">
  </script>
  <!-- vue app -->
  <script type="application/javascript" src="app.js"></script>
</body>

</html>