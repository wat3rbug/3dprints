<?php
require "../Tables/SpoolTypeRepository.php";

$id = $_POST["id"];
// $id = "2";

if (isset($id)) {
    $db = new SpoolTypeRepository();
    $db->deleteSpoolType($id);
}