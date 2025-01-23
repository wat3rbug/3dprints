<?php 
require "../Tables/CommentRepository.php";

$author = $_POST["author"];
$comment = $_POST['comment'];
$jobid = $_POST["job"];

// $author = "doug";
// $comment = "test";
// $jobid = 1;
if (isset($comment) && isset($jobid) && isset($author)) {
    $db = new CommentRepository();
    $db->createCommentToJob($comment, $jobid, $author);
}
?>