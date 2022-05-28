<?php
include("../db/db.php");
session_start();
$id = $_SESSION["arrayid"]["idutente"];
$data = $_POST['date'];

$query = "SELECT alpas.id as idAlim, al.nome, al.carboidrati, al.proteine, al.grassi, al.calorie, alpas.quant, pas.id as idPasto
            from alimento as al, alimpasto as alpas, pasto as pas
            where al.id = alpas.alimento and alpas.pasto = pas.id
            and pas.diarioutente = $1 and pas.diariogiorno = $2
            order by pas.id";
$exeQuery = pg_query_params($dbconn, $query, array($id, $data));
if(!$exeQuery){
    echo false;
    exit();
}
else{
    if (pg_num_rows($exeQuery)==0) {
        echo false;
    }
    else{
        $result=array();
        while($r = pg_fetch_array($exeQuery, null, PGSQL_ASSOC)){
            $result[] = $r;
        }
        echo json_encode($result);
    }


}


?>