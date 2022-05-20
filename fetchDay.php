<?php
include("./db/db.php");
$id = $_POST["diario"]["utente"];
$data = $_POST["diario"]['giorno'];


//provare a sistemare con alimento.* oppure al.id etc...
$query = "SELECT pasto.nome, alimento.id, alimento.nome, alimento.calorie, alimento.proteine, alimento.grassi, alimento.carboidrati
            from alimento as al, alimpasto as alpas, pasto as pas
            where al.id = alpas.alimento and alpas.pasto = pas.id
            and pas.diarioutente = $1 and pas.diariogiorno = $2
            group by pasto.nome ";

$exeQuery = pg_query_params($dbconn, $query, array($id, $data));
while($r = pg_fetch_array($exeQuery, null, PGSQL_ASSOC)){
    $result[] = $r;
}
print json_encode($result);

?>