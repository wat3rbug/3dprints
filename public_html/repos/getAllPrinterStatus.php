<?php
require "Tables/PrinterRepository.php";

$db = new PrinterRepository();
$data = $db->getAllPrinterStatus();
header('Content-type: application/json');
echo json_encode($data);
?>
