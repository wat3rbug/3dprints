<?php
require "Tables/StatusRepository.php";
$id = $_POST["id"];
$status = $_POST["status"];

if (isset($id) && !empty($id) && isset($status)) {
    $db = new StatusRepository();
    $db->updateStatus($status, $id);
}