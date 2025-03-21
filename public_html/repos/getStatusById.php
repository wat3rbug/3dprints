<?php
require "Tables/StatusRepository.php";

$id = $_POST['statId'];

if (isset($id)) {
    $db = new StatusRepository();
    $data = $db->getStatusById($id);
    header('Content-type: application/json');
    echo json_encode($data);
}
?>
