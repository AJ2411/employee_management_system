<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user = json_decode(file_get_contents('php://input'));

    if (empty($user->email) || empty($user->password)) {
        $response = ['status' => 0, 'message' => 'All fields are required.'];
        echo json_encode($response);
    } else {
        // Check if the email exists in the database
        $sql = "SELECT * FROM employee_master WHERE email = :email";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $user->email);
        $stmt->execute();

        // Fetch the result
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
          // Verify the password
          if (password_verify($user->password, $result['password'])) {
              $response = [
                  'status' => 1,
                  'message' => 'Login successful.',
                  'emp_id' => $result['emp_id'],
                  'privacy' => $result['privacy']
              ];
          } else {
              $response = [
                  'status' => 0,
                  'message' => 'Invalid password.',
                  'providedPassword' => $user->password,
                  'storedHash' => $result['password']
              ];
          }
      } else {
          $response = [
              'status' => 0,
              'message' => 'Invalid email or password.'
          ];
      }
      
      echo json_encode($response);
    }
  }
?>
