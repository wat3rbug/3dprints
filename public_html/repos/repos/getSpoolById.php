<?php
require "Tables/SpoolRepository.php";

$id = $_POST["id"];

if (isset($id)) {
    $db = new SpoolRepository();
    $data = $db->getSpoolById($id);
    header('Content-type: application/json');
    echo json_encode($data);
}