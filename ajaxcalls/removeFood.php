<?php

include("../db/db.php");

$alim = $_POST['idAlim'];

$query = "DELETE from alimpasto where id = $1";

$exeQuery = pg_query_params($dbconn, $query, array($alim));
if(!$exeQuery){
    echo false;
    exit();
}
else{
    echo "alimento rimosso";

}
?>