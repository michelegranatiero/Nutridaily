<?php

use LDAP\Result;

include("./db/db.php");
session_start();
$id = $_SESSION["arrayid"]["idutente"];
$giorno = $_POST['date'];
$query = "SELECT p.nome as nomePasto, p.id as idPasto from diario as d, pasto as p where d.utente = $1 and d.giorno = $2";
$exeQuery = pg_query_params($dbconn, $query, array($id, $giorno));
//$result=array();
if(!$exeQuery){
    //$result[] = $exeQuery;
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

    /* while($r = pg_fetch_array($exeQuery, null, PGSQL_ASSOC)){
        $result[] = $r; //array push 
    } */
}
//echo json_encode($result);


?>