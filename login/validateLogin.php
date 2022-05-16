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
        if (!isset($_POST["mailLogin"])){
            header("Location: ./login.html");
        }
        else{
            $dbconn = pg_connect("host=localhost dbname=Nutridaily port=5432 user=postgres password=postgres");
            $email = $_POST["mailLogin"];
            $query = "SELECT * from utente where email=$1";
            $result = pg_query_params($dbconn, $query, array($email));
            if (!($tuple=pg_fetch_array($result, null, PGSQL_ASSOC))){
                echo "Il login non e' andato a buon fine <br/>";
                echo "Nel sistema non e' presente un account con l'email indicata <br/>";
            }
            else{
                $password = hash("sha512", $_POST["passLogin"]);
                //$password = $_POST["passLogin"];
                $query2 = "SELECT * from utente where email=$1 and passwd=$2";
                $result = pg_query_params($dbconn, $query2, array($email, $password));
                if ($tuple=pg_fetch_array($result, null, PGSQL_ASSOC)){
                    $nome = $tuple["nome"];
                    //passare nome al link tramite get...?name=$nome
                    echo "Il login e' andato a buon fine";
                }
                else echo "Il login non e' andato a buon fine <br/> La password e' errata";
            }
        }
    ?>

</body>
</html>