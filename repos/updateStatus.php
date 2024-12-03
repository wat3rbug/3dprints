<?php
require "Tables/StatusRepository.php";
$id = $_POST["id"];
$status = $_POST["name"];
// $id = "10";
// $status = "test2";

if (isset($id) && !empty($id) && isset($status)) {
    $db = new StatusRepository();
    $db->updateStatus($status, $id);
}