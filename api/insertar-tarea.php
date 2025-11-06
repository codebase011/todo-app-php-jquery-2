<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'db/conexion-bd.php'; // ajustar ruta si es necesario

header("Content-Type: application/json; charset=UTF-8");

try {
    $pdo = getPDO();

    // obtener datos de forma segura (www-urlencoded)
/*     $title = isset($_POST['title']) ? trim($_POST['title']) : '';
    $description = isset($_POST['description']) ? trim($_POST['description']) : '';
 */
    // En lugar de $_POST (contentType: 'application/json' desde ajax)
    $input = json_decode(file_get_contents("php://input"), true);
    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';


    // validación simple
    if ($title === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'El título es obligatorio']);
        exit;
    }

    $stmt = $pdo->prepare(
        "INSERT INTO todo (title, description) VALUES (:title, :description)"
    );

    $stmt->execute([
        ':title' => $title,
        ':description' => $description
    ]);

    $lastId = $pdo->lastInsertId();

    // respuesta JSON correcta
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'id' => $lastId,
        'title' => $title,
        'description' => $description
    ]);
    exit;
} catch (PDOException $e) {
    error_log("Error al insertar todo: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error del servidor al insertar la tarea']);
    exit;
}
