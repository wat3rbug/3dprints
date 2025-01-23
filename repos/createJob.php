<?php
require "Tables/JobRepository.php";

$name = $_POST["name"];
$photo = $_POST["photo"];
$joburl = $_POST["url"];

// $name = "Xeno";
// $photo = "";

if (isset($name)) {
    $db = new JobRepository();
    $db->createJob($name, $photo, $joburl);
}