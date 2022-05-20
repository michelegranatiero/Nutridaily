<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nutridaily: Login</title>
</head>
<body>
    
    <?php
        
        if (!isset($_POST["loginButton"])){
            header("Location: ./login.php");
        }
        else{
            include("../db/db.php");
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
                    
                    //session
                    session_start();
                    $arrayid = array("idutente"=>$tuple["id"],"nomeutente"=>$tuple["nome"],"msg"=>"Ciao");
                    $_SESSION["arrayid"] = $arrayid;

                    if (isset($_POST["rememberLogin"])){
                        setcookie("userarray", json_encode($arrayid), time()+500, '/');
                    }
                    header("Location: ../index.php");
                    
                    echo "Il login e' andato a buon fine";
                }
                else echo "Il login non e' andato a buon fine <br/> La password e' errata";
            }
        } 
    ?>

</body>
</html>