<?php
require "Tables/StatusRepository.php";
$status = $_POST["status"];

if (isset($status)) {
    $db = new StatusRepository();
    $db->createStatus($status);
}