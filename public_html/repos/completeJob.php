<?php
require "Tables/JobRepository.php";
$id = $_POST["id"];

if (isset($id)) {
    $db = new JobRepository();
    $db->completeJob($id);
}