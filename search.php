<?php
//Including Database configuration file.
$dbconn = pg_connect("host=localhost dbname=Nutridaily port=5432 user=postgres password=postgres");
if (!$dbconn){
   $error = error_get_last();
   echo "Connessione fallita: ". $error['message'];
}
//Getting value of "search" variable from "script.js".
if (isset($_POST['search'])) {
   
//Search box value assigning to $Name variable.
   $alim = $_POST['search'];
//Search query.
   $query = "SELECT * from alimento where nome like UPPER('$alim%') limit 7";
   /* strtoupper() */
//Query execution------------------------------------------------------------------
   $exeQuery = pg_query($dbconn, $query);
//Creating unordered list to display result.
   echo '<ul>';
   //Fetching result from database.
   while ($result=pg_fetch_array($exeQuery, null, PGSQL_ASSOC)) {
       ?>
   <!-- Creating unordered list items.
        Calling javascript function named as "fill" found in "script.js" file.
        By passing fetched result as parameter. -->
      
        <li onclick='fill("<?php echo $result['nome']; ?>")'>
      <a>
   <!-- Assigning searched result in "Search box" in "search.php" file. -->
      <?php echo $result['nome']; ?>
      </li></a>
   <!-- Below php code is just for closing parenthesis. Don't be confused. -->
      <?php
}}
?>
</ul>
