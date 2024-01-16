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
    if (isset($_GET['emp_id'])) {
        $emp_id = $_GET['emp_id'];

        // Use prepared statement to prevent SQL injection
        $sql = "SELECT employee_master.*, dept_table.dept_name
                FROM employee_master
                INNER JOIN dept_table ON employee_master.dept_id = dept_table.dept_id
                WHERE employee_master.emp_id = :emp_id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':emp_id', $emp_id, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt) {
            $employeeRecord = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($employeeRecord) {
                echo json_encode(['status' => 1, 'data' => $employeeRecord]);
            } else {
                echo json_encode(['status' => 0, 'message' => 'Record not found.']);
            }
        } else {
            echo json_encode(['status' => 0, 'message' => 'Failed to retrieve record.']);
        }
    } else {
        echo json_encode(['status' => 0, 'message' => 'emp_id parameter is missing.']);
    }
}
?>
