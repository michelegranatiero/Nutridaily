<?php

include("./db/db.php");
session_start();
$id = $_SESSION["arrayid"]["idutente"];
$data = $_POST['date'];

$query = "INSERT into diario values(giorno, utente) ($1, $2)";

$exeQuery = pg_query_params($dbconn, $query, array($data, $id));
if($exeQuery){
    $pastiArr=array("colazione", "pranzo", "cena", "spuntini");
    foreach($pastiArr as &$value){
        $query2 = "INSERT into pasto values(nome, diarioutente, diariogiorno) ($1, $2, $3) returning id"; // !!!
        $exeQuery2 = pg_query_params($dbconn, $query2, array($value, $id, $data));
        if(!$exeQuery2){
            echo "0";
        }
    }
    echo "1";
}
else{
    echo "0";
}



?>