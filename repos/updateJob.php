<?php
require "Tables/JobRepository.php";
$id = $_POST["id"];
$name = $_POST["name"];
$photo = $_POST["photo"];
$status = $_POST["status"];
// $id = 6;
// $name = "ignition nut for BMW2";
// $photo = "";
// $status = 4;

if (isset($id) && isset($status) && isset($name)) {
    $db = new JobRepository();
    $db->updateJob($id, $name, $photo, $status);
}