<?php
require "Tables/PrinterRepository.php";

$db = new PrinterRepository();
$data = $db->getAllPrinters();
header('Content-type: application/json');
echo json_encode($data);
?>
