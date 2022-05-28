<?php

include("../db/db.php");

$alim = $_POST['idAlim'];
$pasto = $_POST['idpasto'];
$grams = $_POST['grams'];

$query = "INSERT into alimpasto(alimento, pasto, quant) values ($1, $2, $3) returning id as id";
$result=array();
$exeQuery = pg_query_params($dbconn, $query, array($alim, $pasto, $grams));
if(!$exeQuery){
    $result[] = $exeQuery;
}
else{
    $tuple = pg_fetch_array($exeQuery, null, PGSQL_ASSOC);
    $result[] = $tuple;
}
echo json_encode($result);
?>