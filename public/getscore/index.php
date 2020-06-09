<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');

if ($_SERVER['SERVER_ADDR'] == "127.0.0.1" OR $_SERVER['SERVER_ADDR'] == "::1") {
	define('DB_HOST', 'localhost');
	define('DB_USER', 'root');
	define('DB_PASS', 'root');
	define('DB_NAME', 'mhd20');
} else {
	define('DB_HOST', 'blackpingvdata.mysql.db');
	define('DB_USER', 'blackpingvdata');
	define('DB_PASS', 'UhxftQ8y487fwD');
	define('DB_NAME', 'blackpingvdata');
}

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
// Check connection
if ($mysqli->connect_error) { trigger_error('Database connection failed: '  . $mysqli->connect_error, E_USER_ERROR); }
$mysqli->set_charset("utf8mb4"); // Set UTF8mb4

// Execute mysqli query, returns associative array
function getMysqli($mysqli,$sql) {
	$rs = $mysqli->query($sql);
	if ($rs->num_rows > 0) 
	{
        $rs->data_seek(0);
        while ($data = $rs->fetch_assoc()) { $rsAssoc[] = $data; }
        return $rsAssoc;
	} 
	else { return false; }
}

$sql = 'SELECT * FROM scores ORDER BY `run_maxlevel` DESC, `run_rounds` ASC LIMIT 0,100';
$run =  getMysqli($mysqli, $sql);

$sql = 'SELECT * FROM scores ORDER BY `game_maxlevel` DESC, `game_runs` ASC LIMIT 0,100';
$game =  getMysqli($mysqli, $sql);

$sql = 'SELECT * FROM scores ORDER BY `alltime_rounds` DESC LIMIT 0,100';
$alltime = getMysqli($mysqli, $sql);

$data = [
  'run' => $run,
  'game'=> $game,
  'alltime' => $alltime,
];

echo json_encode($data);
?>