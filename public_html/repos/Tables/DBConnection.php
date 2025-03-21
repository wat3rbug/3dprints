<?php

class DBConnection {

    public $database;
    public $username;
    public $hostname;
    public $password;

    function __construct() {
        $this->password = "1990BMW325i!";
        $this->database = "3dprints";
	$this->hostname = "phobos";
        $this->username = "3dprintuser";
    }
}
?>
