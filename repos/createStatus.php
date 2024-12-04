<?php
require "Tables/StatusRepository.php";
$status = $_POST["name"];

// $status = "to hell and back";

if (isset($status)) {
    $db = new StatusRepository();
    $db->createStatus($status);
}