<?php
require "Tables/JobRepository.php";
$id = $_POST["id"];
// $id = "1";
if (isset($id)) {
    $db = new JobRepository();
    $data = $db->getJobById($id);
    $name = $data[0]['name'];
    $joburl = $data[0]['url'];
    $photo = $data[0]['photo'];
    $db->addJob($name, $photo, $joburl);
}