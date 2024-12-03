<?php
require "Tables/StatusRepository.php";

$id = $_POST['id'];
$status = $_POST['status'];

if (isset($id) && isset($status)) {
    $db = new StatusRepository();
    $data = $db->updateStatus($status, $id);
}
?>
