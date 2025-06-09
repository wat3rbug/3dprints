<?php
require "Tables/SpoolRepository.php";
$spool = $_POST["id"];
// $spool = "43";

if (isset($spool)) {
    $db = new SpoolRepository();
    $db->emptySpool($spool);
}
?>