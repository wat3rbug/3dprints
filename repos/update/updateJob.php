<?php
require "../Tables/JobRepository.php";
$id = $_POST["id"];
$name = $_POST["name"];
$photo = $_POST["photo"];
$status = $_POST["status"];
$url = $_POST["url"];
// $id = 7;
// $name = "Xeno";
// $photo = "";
// $status = 1;

if (isset($id) && isset($status) && isset($name)) {
    $db = new JobRepository();
    $db->updateJob($id, $name, $photo, $status, $url);
}