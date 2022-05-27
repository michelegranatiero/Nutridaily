<?php
//Including Database configuration file.
include("./db/db.php");
//Getting value of "search" variable from "script.js".
if (isset($_POST['search'])) {
   //Search box value assigning to $Name variable.
   $alim = $_POST['search'];
   //Search query.
   $query = "SELECT * from alimento where nome LIKE UPPER('%$alim%')
      ORDER BY CASE WHEN nome LIKE UPPER('$alim%') THEN 1 ELSE 2 END";
   //Query execution------------------------------------------------------------------
   $exeQuery = pg_query($dbconn, $query);
   //Creating unordered list to display result.
   echo '<div class="list-group">';
   //Fetching result from database.
   while ($result = pg_fetch_array($exeQuery, null, PGSQL_ASSOC)) {
      $nome = $result["nome"];
      $nome = str_replace("'", "&#039", $nome);
      $carb = $result["carboidrati"];
      $prot = $result["proteine"];
      $gras = $result["grassi"];
      $cal = $result["calorie"];
      $idAlim = $result["id"];


      
      
?>
      <!-- Creating unordered list items.
        Calling javascript function named as "fill" found in "script.js" file.
        By passing fetched result as parameter. -->
        
      <a class="list-group-item list-group-item-action fs-search" onclick='fill("<?php echo $nome ?>", "<?php echo $carb ?>", "<?php echo $prot ?>", "<?php echo $gras ?>", "<?php echo $cal ?>", "<?php echo $idAlim ?>")'>
         <!-- Assigning searched result in "Search box" in "search.php" file. -->
         <?php echo $nome; ?>
      </a>
      <!-- Below php code is just for closing parenthesis and close ul tag. -->
<?php
   }
   echo '</div>';
}

?>