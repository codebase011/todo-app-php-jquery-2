<?php
// db/conexion-bd.php
// Desarrollo: mostrar errores (quitar en producción)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function getPDO() {
    // Si "localhost" falla por socket, usa 127.0.0.1
    $host = '127.0.0.1';
    $db   = 'todo_app';
    $user = 'root';
    $pass = '';
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";

    try {
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        return $pdo;
    } catch (PDOException $e) {
        // Dev: respuesta clara y exit. En producción, registrar y devolver genérico.
        http_response_code(500);
        echo json_encode(['error' => 'DB connection error: ' . $e->getMessage()]);
        exit;
    }
}
