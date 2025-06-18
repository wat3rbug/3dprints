<?php
require "Tables/PrinterRepository.php";

$id = $_POST['id'];
// $id = "4";
if (isset($id)) {
    $db = new PrinterRepository();
    $data = $db->getPrinterById($id);
    header('Content-type: application/json');
    echo json_encode($data);
}
?>