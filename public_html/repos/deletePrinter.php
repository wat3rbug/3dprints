<?php
require "Tables/PrinterRepository.php";

$id = $_POST['id'];

if (isset($id)) {
    $db = new PrinterRepository();
    $db->deletePrinter($id);
}
?>