<?php
require "Tables/PrinterRepository.php";

$name = $_POST["name"];
$manufacturer = $_POST["manufacturer"];
$model = $_POST["model"];
$multicolor = $_POST["multicolor"];
$status = $_POST["status"];
$pic = $_POST["pic"];
// $name ="Chiron";
// $manufacturer = "Bambu Labs";
// $model = "A1 Mini";
// $multicolor = "0";
// $status = "1";
// $pic = "";

// need to do something to load the picture

$dict = array(
    "name" => $name,
    "manufacturer" => $manufacturer,
    "model" => $model,
    "multicolor" => $multicolor,
    "status" => $status,
    "pic" => $pic
);
$db = new PrinterRepository();
$db->addPrinter($dict);