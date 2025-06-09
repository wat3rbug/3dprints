<?php
require "Tables/SpoolRepository.php";

$id = $_POST["id"];
$type = $_POST["type"];
$size = $_POST["size"];
$color = $_POST["color"];

if (isset($id) && isset($type) && isset($color) && isset($size)) {
    $db = new SpoolRepository();
    $db->updateSpool($id, $color, $type, $size);
}