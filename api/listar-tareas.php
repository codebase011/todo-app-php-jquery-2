<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'db/conexion-bd.php';
/* header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type"); */
header("Content-Type: application/json; charset=UTF-8");

try {
    $pdo = getPDO();
    $stmt = $pdo->query("SELECT * FROM todo");
    $tareas = $stmt->fetchAll();

    echo json_encode($tareas);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}