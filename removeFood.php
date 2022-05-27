<?php

include("./db/db.php");

$alim = $_POST['idAlim'];
$pasto = $_POST['idPasto'];

$query = "DELETE from alimpasto where alimento = $1 and pasto = $2";

$exeQuery = pg_query_params($dbconn, $query, array($alim, $pasto));
if(!$exeQuery){
    echo false;
    exit();
}
else{
    echo "alimento rimosso";

}
?>