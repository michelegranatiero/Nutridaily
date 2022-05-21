<?php
include("./db/db.php");
$id = $_POST["diario"]["utente"];
$data = $_POST["diario"]['giorno'];


//provare a sistemare con alimento.* oppure al.id etc...
$query = "SELECT pasto.nome, alimento.nome, alimento.carboidrati, alimento.proteine, alimento.grassi, alimento.calorie
            from alimento as al, alimpasto as alpas, pasto as pas
            where al.id = alpas.alimento and alpas.pasto = pas.id
            and pas.diarioutente = $1 and pas.diariogiorno = $2
            group by pasto.nome ";
$result=array();
$exeQuery = pg_query_params($dbconn, $query, array($id, $data));
if(!$exeQuery){
    $result[] = $exeQuery2;
}
else{
    while($r = pg_fetch_array($exeQuery, null, PGSQL_ASSOC)){
        $result[] = $r;
    }
}
echo json_encode($result);

?>