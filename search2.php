<?php
//Including Database configuration file.
$dbconn = pg_connect("host=localhost dbname=Nutridaily port=5432 user=postgres password=postgres");
$output ="";
$query= "SELECT * from alimento where nome LIKE '%".$_POST['search']."%' LIMIT 5";
$result = pg_query($dbconn, $query);
if(pg_num_rows($result)>0){
    $output .= '<ul>';
    while ($row=pg_fetch_array($result)){
        $output .= '<li>'.$row["nome"].'</li>';
    }
    $output .= '</ul>';
    echo $output;
}
else{
    echo 'DATA NOT FOUND';
}
?>