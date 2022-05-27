<?php
    $dbconn = pg_connect("host=localhost dbname=Nutridaily port=5432 user=postgres password=postgres");
    if (!$dbconn){
        $error = error_get_last();
        echo "Connessione fallita: ". $error['message'];
     }
?>