<?php

include("./db/db.php");
session_start();
$id = $_SESSION["arrayid"]["idutente"];
$data = $_POST['date'];

$query = "INSERT into diario (giorno, utente) values ($1, $2)";

$exeQuery = pg_query_params($dbconn, $query, array($data, $id));
$result=array();
if($exeQuery){
    $pastiArr=array("colazione","pranzo","cena","spuntini");
    foreach($pastiArr as $value){
        $query2 = "INSERT into pasto (nome, diarioutente, diariogiorno) values ($1, $2, $3) returning $1 as pasto, id as id"; // !!!
        $exeQuery2 = pg_query_params($dbconn, $query2, array($value, $id, $data));
        if(!$exeQuery2){
            $result[] = $exeQuery2;
            break;
        }
        else{
            //manda id pasto al client
            $tuple = pg_fetch_array($exeQuery2, null, PGSQL_ASSOC);
            $result[] = $tuple;
        }
    }
}
else{
    $result[] = $exeQuery;
}

echo json_encode($result);

?>