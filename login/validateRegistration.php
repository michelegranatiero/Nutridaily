<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <?php
    if (!isset($_POST["regButton"])) {
        header("Location: ./login.php");
    } else {
        $dbconn = pg_connect("host=localhost dbname=Nutridaily port=5432 user=postgres password=postgres");
        $email = $_POST["mailReg"];
        $query = "SELECT * from utente where email=$1";
        $result = pg_query_params($dbconn, $query, array($email));
        if ($tuple = pg_fetch_array($result, null, PGSQL_ASSOC)) {
            //query ajax: indirizzo email già registrato
            echo "Registrazione fallita <br/>";
            echo "E' già presente un account con la mail inserita";
        } else {
            $nome = $_POST["nomeReg"];
            $cognome = $_POST["cognomeReg"];
            $pass = $_POST["passReg"];
            $passwd = hash("sha512", $pass);
            //nascita
            $day = $_POST["dd"];
            $monthName= $_POST["mm"];
            $year = $_POST["yyyy"];
            $arrMonths = array("Gennaio"=>'01', "Febbraio"=>'02', "Marzo"=>'03', "Aprile"=>'04', "Maggio"=>'05', "Giugno"=>'06', "Luglio"=>'07', "Agosto"=>'08', "Settembre"=>'09', "Ottobre"=>'10', "Novembre"=>'11', "Dicembre"=>'12');
            $month = $arrMonths[$monthName];
            $nascita = $year.'-'.$month.'-'.$day;
            //end nascita
            $genere = $_POST["genereReg"];
            $peso = $_POST["pesoReg"];
            $altezza = $_POST["altezzaReg"];
            $query2 = "INSERT into utente (nome,cognome,email,passwd,nascita,genere,peso,altezza) values ($1,$2,$3,$4,$5,$6,$7,$8) returning id as id";
            $result = pg_query_params($dbconn, $query2, array($nome, $cognome, $email, $passwd, $nascita, $genere, $peso, $altezza));
            if($result){
                $tuple = pg_fetch_array($result, null, PGSQL_ASSOC);
                session_start();
                $_SESSION["idutente"] = $tuple["id"];
                $_SESSION["nomeutente"] = $nome;
                $_SESSION["msg"] = "Benvenuto/a";
                header("Location: ../index.php");
                echo "La registrazione e' andata a buon fine <br/>";
            }
            else{
                //da rimuovere
                die("C'è stato un errore");
            }
        }
    }

    ?>


</body>

</html>