<?php
require "Tables/CommentRepository.php";

$id = $_POST['id'];
// $id = 1;
if (isset($id)) {
    $db = new CommentRepository();
    $data = $db->getCommentsForId($id);
    header('Content-type: application/json');
    echo json_encode($data);
}
?>