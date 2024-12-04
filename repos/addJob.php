<?php
require "Tables/JobRepository.php";

$name = $_POST["name"];
$photo = $_POST["photo"];

// $name = "Xeno";
// $photo = "";

if (isset($name)) {
    $db = new JobRepository();
    $db->addJob($name, $photo);
}