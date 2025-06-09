<?php
require "../Tables/SpoolTypeRepository.php";

$id = $_POST['id'];
$type = $_POST['name'];

if (isset($id) && isset($type)) {
    $db = new SpoolTypeRepository();
    $db->updateSpoolType($id, $type);
}