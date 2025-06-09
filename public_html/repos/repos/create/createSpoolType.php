<?php
require "../Tables/SpoolTypeRepository.php";

$type = $_POST['type'];
if (isset($type)) {
    $db = new SpoolTypeRepository();
    $db->createSpoolType($type);
}