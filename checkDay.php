<?php

include("./db/db.php");
session_start();
$id = $_SESSION["arrayid"]["idutente"];
$giorno = $_POST['date'];
$query = "SELECT * from diario where utente = $1 and giorno = $2 ";
$exeQuery = pg_query_params($dbconn, $query, array($id, $giorno));
while($r = pg_fetch_array($exeQuery, null, PGSQL_ASSOC)){
    $result[] = $r;
}
echo json_encode($result);
?>