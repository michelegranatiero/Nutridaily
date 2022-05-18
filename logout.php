<?php
    session_start();
    unset($_SESSION["idutente"]);
    header("Location: ./login/login.php");

?>