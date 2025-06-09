<?php 
require "Tables/CommentRepository.php";

$comment = $_POST['comment'];
$jobid = $_POST["job"];

// $author = "doug";
// $comment = "test";
// $jobid = 1;
if (isset($comment) && isset($jobid)) {
    $db = new CommentRepository();
    $db->createCommentToJob($comment, $jobid);
}
?>