<?php
require "Tables/JobRepository.php";
$id = $_POST["id"];
// $id = "1";
if (isset($id)) {
    $db = new JobRepository();
    $db->undoJob($id);
}