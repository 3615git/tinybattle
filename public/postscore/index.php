<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Content-Type");

// $content = file_get_contents('php://input');
$content = json_decode(file_get_contents('php://input'), true);

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

$sql = 'INSERT INTO scores (
        name, 
        run_rounds, 
        run_maxlevel, 
        game_runs, 
        game_rounds, 
        game_maxlevel,
        game_battles,
        game_battles_defeats,
        game_battles_victories,
        alltime_runs,
        alltime_rounds
    ) VALUES (
        "'.$mysqli->real_escape_string($content["name"]).'",
        "'.$content["run_rounds"].'",
        "'.$content["run_maxlevel"].'",
        "'.$content["game_runs"].'",
        "'.$content["game_rounds"].'",
        "'.$content["game_maxlevel"].'",
        "'.$content["game_battles"].'",
        "'.$content["game_battles_defeats"].'",
        "'.$content["game_battles_victories"].'",
        "'.$content["alltime_runs"].'",
        "'.$content["alltime_rounds"].'"
    )';
$mysqli->query($sql);

echo json_encode([`Ok`]);
?>