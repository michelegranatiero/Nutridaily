<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nutridaily: accedi o iscriviti</title>
  <link rel="shortcut icon" href="#" />
  <!-- Vue -->
  <script src="https://unpkg.com/vue@3"></script>
  <!-- JQuery -->
  <script src="//code.jquery.com/jquery-3.6.0.js"></script>
  <!-- bootstrap css -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <!-- styleLogin css -->
  <link rel="stylesheet" type="text/css" href="styleLogin.css">
</head>

<body>
  <div class="body-mask container-lg">
    <!-- login -->
    <div class="container-lg d-lg-flex shadow bd-ovflow p-0 bg-image-2">
      <!-- heading + image -->
      <div class="bg-image">
        <div class="mask d-flex flex-column justify-content-evenly align-items-center h-100 w-100 ">
          <div class="pt-5 pb-3 logo-disp-sm">
            <img src="../assets/nutrilogo.png" style="width:180px;">
          </div>
          <div class="text-center shadow-1-strong rounded text-white ">
            <h1 class="text-success fw-bold fs-0 tx-shad-black">Nutridaily</h1>
            <p class="fs-4 fw-bold tx-shad-black">
              <i> Il tuo diario alimentare giornaliero</i>
            </p>
          </div>
        </div>
      </div>
      <!-- login -->
      <div class="container-lg d-flex justify-content-evenly mask bg-lg-white h-100 p-lg-5">
        <div style="max-width: 30rem; width: 100%;" class="py-3 px-5 text-center back-empty input-group-lg">
          <div class="pb-4 logo-disp-lg">
            <img src="../assets/nutrilogo.png" style="width:180px;">
          </div>
          <h2 class="text-success">Login</h3>
            <!-- login form -->
            <form id="loginForm" action="validateLogin.php" method="POST">
              <input type="email" name="mailLogin" class="form-control my-3" placeholder="Email" required autofocus> <!-- autofocus -->
              <input type="password" name="passLogin" class="form-control my-3" placeholder="Password" required>
              <div class="form-check my-3 text-start">
                <input type="checkbox" class="form-check-input" name="rememberLogin" id="rembme">
                <label class="form-check-label" for="rembme">Resta connesso</label>
              </div>
              <a href="#">
                <button type="submit" name="loginButton" class="btn btn-success w-100 mb-3 p-2 fs-5 fw-bold">Accedi</button>
              </a>
            </form>
            <!-- create registration form -->
            <hr class="horizRowLogin">
            <div class="text-center my-4">
              <button class="btn btn-outline-success  btn-lg" data-bs-toggle="modal" data-bs-target="#createModal">Crea
                nuovo
                account</button>
            </div>

            <!-- create modal -->
            <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true"
              style="perspective: 2px;">
              <div class="modal-dialog">
                <div class="modal-content">
                  <!-- head -->
                  <div class="modal-header">
                    <div>
                      <h2 class="modal-title text-success" id="createModalLabel">
                        Iscriviti
                      </h2>
                      <p class="text-muted fs-7"> &Egrave semplice e veloce</p>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <!-- body -->
                  <div class="modal-body">
                    <form id="RegistrationForm" method="POST" action="validateRegistration.php">
                      <!-- nome -->
                      <div class="row">
                        <div class="col">
                          <input type="text" name="nomeReg" class="form-control" placeholder="Nome" required>
                        </div>
                        <div class="col">
                          <input type="text" name="cognomeReg" class="form-control" placeholder="Cognome" required>
                        </div>
                      </div>
                      <!-- email e pass -->
                      <input type="email" name="mailReg" class="form-control my-3" placeholder="Email" required>
                      <input type="password" name="passReg" class="form-control my-3" placeholder="Nuova password" required>
                      <!-- datanascita -->
                      <div class="row my-3">
                        <span class="text-muted fs-7 text-start">Data di nascita <i type="button"
                            class="fa-solid fa-circle-question" data-bs-container="body" data-bs-toggle="popover"
                            data-bs-placement="right" data-bs-content="Indica la tua data di nascita"></i></span>
                        <div class="col">
                          <select class="form-select date-of-b" id="day" name="dd">
                          </select>
                        </div>
                        <div class="col">
                          <select class="form-select date-of-b" id="month" name="mm" onchange="change_month(this)">
                          </select>
                        </div>
                        <div class="col">
                          <select class="form-select date-of-b" id="year" name="yyyy" onchange="change_year(this)">
                          </select>
                        </div>
                      </div>
                      <!-- genere -->
                      <div class="row my-3 text-start">
                        <span class="text-muted fs-7">Genere <i type="button" class="fa-solid fa-circle-question"
                            data-bs-container="body" data-bs-toggle="popover" data-bs-placement="right"
                            data-bs-content="Indica il tuo genere"></i></span>
                        <div class="col">
                          <label class="form-check-label d-flex" for="radbtnUomo">
                            <div class="border rounded p-2 w-100">
                              <input class="form-check-input" type="radio" name="genereReg" value="uomo"
                                id="radbtnUomo" checked>
                              Uomo
                            </div>
                          </label>
                        </div>
                        <div class="col">
                          <label class="form-check-label d-flex" for="radiobtnDonna">
                            <div class="border rounded p-2 w-100">
                              <input class="form-check-input" type="radio" name="genereReg" value="donna"
                                id="radiobtnDonna">
                              Donna
                            </div>
                          </label>
                        </div>
                      </div>
                      <!-- peso e altezza -->
                      <div class="row">
                        <!-- peso -->
                        <div class="col">
                          <div class="row">
                            <label class=" col col-form-label px-0" for="peso">
                              Peso:
                            </label>
                            <div class="col px-0">
                              <input type="number" name="pesoReg" min="1" max="999" class="form-control" id="peso" required>
                            </div>
                            <label class="col col-form-label px-0">
                              kg
                            </label>
                          </div>
                        </div>
                        <!-- altezza -->
                        <div class="col">
                          <div class="row">
                            <label class="col col-form-label px-0" for="altezza">
                              Altezza:
                            </label>
                            <div class="col px-0">
                              <input type="number" name="altezzaReg" min="1" max="999" class="form-control" id="altezza" required>
                            </div>
                            <label class="col col-form-label px-0">
                              cm
                            </label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- footer -->
                  <!-- Iscritivi -->
                  <div class="modal-footer">
                    <button type="submit" form="RegistrationForm" name="regButton" class="btn btn-success fs-5 px-5">Iscriviti</button>
                  </div>
                </div>
              </div>
            </div>
            <!-- end -->
        </div>

      </div>
    </div>
    <!-- footer -->

    <!-- dateofbirth validation -->
    <script>
      var forms = document.querySelectorAll("select.date-of-b");
      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener("change", function (e) {
          var CurrentDate = new Date();
          var SelectedDate = new Date(
            $('[id=year]').val(),
            months.indexOf($('[id=month]').val()),
            $('[id=day]').val()
          );
          if (CurrentDate <= SelectedDate) {
            //CurrentDate is more than SelectedDate
            $('[id=year]').addClass("is-invalid");
            $('[id=month]').addClass("is-invalid");
            $('[id=day]').addClass("is-invalid");
          } else {
            $('[id=year]').removeClass("is-invalid");
            $('[id=month]').removeClass("is-invalid");
            $('[id=day]').removeClass("is-invalid");
          }
        }, false);
      });
    </script>

    <script>
      function validaReg(){

      };
    </script>

    <!-- bootstrap js -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
      crossorigin="anonymous"></script>
    <!-- date_of_birth js-->
    <script src="./date_of_birth.js"></script>
  </div>
</body>

</html>