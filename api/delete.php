<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';

// Assuming DbConnect class has a connect method
$objDb = new DbConnect;
$conn = $objDb->connect();

// Check if emp_id is provided
if (isset($_GET['emp_id'])) {
    $emp_id = $_GET['emp_id'];

    // Perform the delete operation
    $sql = "DELETE FROM employee_master WHERE emp_id = :emp_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':emp_id', $emp_id, PDO::PARAM_INT);

    try {
        $stmt->execute();
        echo "Employee with emp_id $emp_id has been deleted successfully.";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "emp_id not provided.";
}
?>
