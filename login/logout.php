<?php
    session_start();
    unset($_SESSION["arrayid"]);
    setcookie("userarray", null, time()-30, '/');
    header("Location: ./login.php");

?>