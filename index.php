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
  <title>Nutridaily</title>
  <!-- Bootstrap -->
  <link rel="stylesheet" type="text/css" href="./bootstrap/css/bootstrap.css" />
  <!-- Bootstrap icons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.2/font/bootstrap-icons.css">
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

  <main class="container-lg container-fluid">
    <!-- riga diario e calendario-->
    <div class="row w-100">
      <!-- Diario Alimentare Titolo-->
      <div class="col flex-row pb-3 space-nowrap">
        <h2 class="m-0">Diario Alimentare</h2>
      </div>
      <!-- Calendario-->
      <div class="col flex-row calendar-header pb-3">
        <div>Data:&nbsp</div>
        <input type="date" id="calendario" class="text-center">
      </div>
    </div>
    <!-- Contenitore Principale -->
    <div class="row cont1">
      <!-- header tabella desktop-->
      <div class="row pb-3 head-large">
        <div class="col">
          Alimento
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
      <!-- header tabella mobile-->
      <div class="row head-small">
        <div class="col">
          Alimento
        </div>
        <div class="col">
          car
        </div>
        <div class="col">
          pro
        </div>
        <div class="col">
          gra
        </div>
        <div class="col">
          cal
        </div>
      </div>

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
  <!-- main js -->
  <script type="application/javascript" src="main.js"></script>

  <!-- bootstrap js -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous">
  </script>
  <!-- vue app -->
  <script type="application/javascript" src="app.js"></script>
</body>

</html>