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
    $content_type = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if ($content_type === "application/json") {
        // JSON data
        $user = json_decode(file_get_contents('php://input'), true);
    } else {
        // Form data
        $user = $_POST;
    }

    // Validate and sanitize input
    $requiredFields = ['full_name', 'mobile_number', 'dept_id', 'address_line_1', 'address_line_2', 'district', 'tehsil', 'city_village', 'pincode', 'salary', 'resign', 'start_date', 'email', 'password'];
    foreach ($requiredFields as $field) {
        if (empty($user[$field])) {
            $response = ['status' => 0, 'message' => "Field '$field' is required."];
            echo json_encode($response);
            exit;
        }
    }

    // Handle file upload
    $uploadDirectory = '../uploads/';

    $uploadedFile = $uploadDirectory . basename($_FILES['photo']['name']);
    $fileType = pathinfo($uploadedFile, PATHINFO_EXTENSION);

    // Check if the file is an image
    $isValid = getimagesize($_FILES['photo']['tmp_name']);
    if (!$isValid) {
        $response = ['status' => 0, 'message' => 'Invalid file. Please upload an image.'];
        echo json_encode($response);
        exit;
    }

    // Move the uploaded file to the specified directory
    if (move_uploaded_file($_FILES['photo']['tmp_name'], $uploadedFile)) {
        // Hash the password before storing it in the database
        $hashedPassword = password_hash($user['password'], PASSWORD_DEFAULT);

        // Adjust the SQL query to handle optional end_date
        $sql = "INSERT INTO employee_master (full_name, mobile_number, dept_id,
            photo, address_line_1, address_line_2, district, tehsil, city_village, pincode, salary, resign, start_date, end_date, email, password) 
            VALUES (:full_name, :mobile_number, :dept_id, :photo, :address_line_1,
            :address_line_2, :district, :tehsil, :city_village, :pincode, :salary, :resign, :start_date, :end_date, :email, :password)";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':full_name', $user['full_name']);
        $stmt->bindParam(':mobile_number', $user['mobile_number']);
        $stmt->bindParam(':dept_id', $user['dept_id']);
        $stmt->bindParam(':photo', basename($_FILES['photo']['name']));
        $stmt->bindParam(':address_line_1', $user['address_line_1']);
        $stmt->bindParam(':address_line_2', $user['address_line_2']);
        $stmt->bindParam(':district', $user['district']);
        $stmt->bindParam(':tehsil', $user['tehsil']);
        $stmt->bindParam(':city_village', $user['city_village']);
        $stmt->bindParam(':pincode', $user['pincode']);
        $stmt->bindParam(':salary', $user['salary']);
        $stmt->bindParam(':resign', $user['resign']);
        $stmt->bindParam(':start_date', $user['start_date']);
        $stmt->bindParam(':end_date', $user['end_date']);

        // $stmt->bindValue(':end_date', empty($user['end_date']) ? "0000-00-00" : $user['end_date'], PDO::PARAM_STR); // Set to null if empty
        // $stmt->bindValue(':end_date', empty($user->end_date) ? "0000-00-00" : $user->end_date, PDO::PARAM_STR); // Set to null if empty
        $stmt->bindParam(':email', $user['email']);
        $stmt->bindParam(':password', $hashedPassword);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
    } else {
        $response = ['status' => 0, 'message' => 'Failed to upload file.'];
    }

    echo json_encode($response);
}
?>
