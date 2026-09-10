<?php
header('Content-Type: application/json; charset=utf-8');

try {
    $config = require 'config.php';
    
    // Koneksi database
    $conn = new mysqli(
        $config['db']['host'],
        $config['db']['user'],
        $config['db']['pass'],
        $config['db']['name']
    );
    
    if ($conn->connect_error) {
        throw new Exception('Database connection failed: ' . $conn->connect_error);
    }
    
    $conn->set_charset('utf8mb4');
    
    // Query data pelajar
    $query = "SELECT * FROM students ORDER BY id ASC";
    $result = $conn->query($query);
    
    if (!$result) {
        throw new Exception('Query failed: ' . $conn->error);
    }
    
    $students = [];
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
    
    // Hitung ID counter
    $idCounter = count($students) + 1;
    
    // Return response
    echo json_encode([
        'success' => true,
        'data' => [
            'students' => $students,
            'idCounter' => $idCounter
        ]
    ]);
    
    $conn->close();
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
