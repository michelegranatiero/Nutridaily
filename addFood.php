<?php

include("./db/db.php");

$alim = $_POST['alimento'];
$pasto = $_POST['pastoid'];

echo $pasto;

//$query = "INSERT into alimpasto(alimento, pasto) values ($1, $2)";

/* $exeQuery = pg_query_params($dbconn, $query, array($alim, $id));
if($exeQuery){
    if (pg_num_rows($exeQuery)==0){
        echo "0";
    }
    else{
        $pastiArr=array("colazione", "pranzo", "cena", "spuntini");
        foreach($pastiArr as &$value){
            $query2 = "INSERT into pasto (nome, diarioutente, diariogiorno) values ($1, $2, $3)";
            $exeQuery2 = pg_query_params($dbconn, $query2, array($value, $id, $data));
            if(!$exeQuery2 || (pg_num_rows($exeQuery2)==0)){
            echo "0";
            break;
            }
        }
        echo "1";
    }

}
else{
    echo "0";
} */
?>