<?php
require "Tables/SpoolRepository.php";

$color = $_POST['color'];
$type = $_POST['type'];
$size = $_POST["size"];

if (isset($color) && isset($type) && isset($size)) {
    $db = new SpoolRepository();
    $db->createSpool($color, $type, $size);
}