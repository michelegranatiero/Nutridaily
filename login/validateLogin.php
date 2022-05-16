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
            header("Location: ./login.php");
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
                $pass = $_POST["passLogin"];
                $password = hash("sha512", $pass);
                
                $query2 = "SELECT * from utente where email=$1 and passwd=$2";
                $result = pg_query_params($dbconn, $query2, array($email, $password));
                if ($tuple=pg_fetch_array($result, null, PGSQL_ASSOC)){
                    
                    //passare nome al link tramite get...?name=$nome
                    $nome = $tuple["nome"];
                    //session
                    $_SESSION["id_utente"] = $tuple["id"];
                    if (!empty($_POST["rememberLogin"])){
                        $remember_checkbox = $_POST["rememberLogin"];
                        //set cookie
                        setcookie("email", $email, time()+3600*24*7);
                        setcookie("password", $pass, time()+3600*24*7);
                    }
                    else{
                        //expire cookie
                        setcookie("email", $email, 30);
                        setcookie("password", $pass, 30);
                    }


                    echo "Il login e' andato a buon fine";
                }
                else echo "Il login non e' andato a buon fine <br/> La password e' errata";
            }
        }
    ?>

</body>
</html>