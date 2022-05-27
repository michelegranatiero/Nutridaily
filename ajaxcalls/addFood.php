<?php

include("../db/db.php");

$alim = $_POST['idAlim'];
$pasto = $_POST['idpasto'];

$query = "INSERT into alimpasto(alimento, pasto) values ($1, $2)";

$exeQuery = pg_query_params($dbconn, $query, array($alim, $pasto));
if(!$exeQuery){
    echo false;
    exit();
}
else{
    echo "alimento inserito";

}
?>