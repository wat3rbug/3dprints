<?php
require "Tables/SpoolRepository.php";
// $id = "1";
$id = $_POST["id"];

if (isset($id)) {
    $db = new SpoolRepository();
    $db->deleteSpool($id);
}