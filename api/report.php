<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Use a JOIN to retrieve department name from dept_table
    $sql = "SELECT employee_master.*, dept_table.dept_name
            FROM employee_master
            LEFT JOIN dept_table ON employee_master.dept_id = dept_table.dept_id";
            
    $stmt = $conn->query($sql);

    if ($stmt) {
        $employeeRecords = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['status' => 1, 'data' => $employeeRecords]);
    } else {
        echo json_encode(['status' => 0, 'message' => 'Failed to retrieve records.']);
    }
}
?>
