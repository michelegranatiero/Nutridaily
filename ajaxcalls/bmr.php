<?php
include("../db/db.php");
session_start();
$id = $_SESSION["arrayid"]["idutente"];

$query = "SELECT genere, extract('year' from age(nascita)) as eta, peso, altezza
            from utente
            where id = $1";
$exeQuery = pg_query_params($dbconn, $query, array($id));
if(!$exeQuery){
    echo false;
    exit();
}
else{
    if (pg_num_rows($exeQuery)==0) {
        echo false;
    }
    else{
        $result[] = pg_fetch_array($exeQuery, null, PGSQL_ASSOC);
        echo json_encode($result);
    }


}


?>