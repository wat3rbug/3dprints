<?php
require "Tables/StatusRepository.php";

$id = $_POST['id'];

if (isset($id)) {
    $db = new StatusRepository();
    $db->deleteStatus($id);
}
?>