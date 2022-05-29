<?php
include("../db/db.php");
if (isset($_POST['search'])) {
   $alim = $_POST['search'];

   $query = "SELECT * from alimento where nome LIKE UPPER('%$alim%')
      ORDER BY CASE WHEN nome LIKE UPPER('$alim%') THEN 1 ELSE 2 END";

   $exeQuery = pg_query($dbconn, $query);

   echo '<div class="list-group">';

   while ($result = pg_fetch_array($exeQuery, null, PGSQL_ASSOC)) {
      $nome = $result["nome"];
      $nome = str_replace("'", "&#039", $nome);
      $carb = $result["carboidrati"];
      $prot = $result["proteine"];
      $gras = $result["grassi"];
      $cal = $result["calorie"];
      $idAlim = $result["id"];
   
?>
        
      <a class="list-group-item list-group-item-action fs-search" onclick='fill("<?php echo $nome ?>", "<?php echo $carb ?>", "<?php echo $prot ?>", "<?php echo $gras ?>", "<?php echo $cal ?>", "<?php echo $idAlim ?>")'>

         <?php echo $nome; ?>
      </a>

<?php
   }
   echo '</div>';
}

?>