<?php 
require "Tables\CommentRepository.php";
// $comment = $_POST["comment"];
$comment = "test this";
// $jobid = $_POST["jobid"];
$jobid = "1";

if (isset($comment) && isset($jobid) && $jobid > 0) {
    $db = new CommentRepository();
    $db->addCommentToJob($comment, $jobid);
}
?>