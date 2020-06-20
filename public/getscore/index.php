<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// DB connect
define('DB_HOST', 'blackpingvdata.mysql.db');
define('DB_USER', 'blackpingvdata');
define('DB_PASS', 'UhxftQ8y487fwD');
define('DB_NAME', 'blackpingvdata');
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

$sql = 'SELECT * FROM scores WHERE `abyss` > 0 ORDER BY `abyss` DESC LIMIT 0,100';
$abyss = getMysqli($mysqli, $sql);

$data = [
  'run' => $run,
  'game'=> $game,
  'abyss' => $alltime,
];

echo json_encode($data);
?>