<?php

include("../db/db.php");
session_start();
$id = $_SESSION["arrayid"]["idutente"];
$giorno = $_POST['date'];
$query = "SELECT nome as nomePasto, id as idPasto from pasto where pasto.diarioutente = $1 and pasto.diariogiorno = $2";
$exeQuery = pg_query_params($dbconn, $query, array($id, $giorno));
if(!$exeQuery){
    exit();
}
else {
    if (pg_num_rows($exeQuery)==0) {
        echo false;
    }
    else{
        $arr = array();
        while($r = pg_fetch_array($exeQuery, null, PGSQL_ASSOC)){
            $arr[] = $r;
        }
        echo json_encode($arr);
    }
}


?>