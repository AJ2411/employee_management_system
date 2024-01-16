<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $content_type = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';

    if ($content_type === "application/json") {
        // JSON data
        $user = json_decode(file_get_contents('php://input'));

        // Check if the 'password' property exists
        if (!isset($user->password)) {
            $response = ['status' => 0, 'message' => 'Password field is required.'];
            echo json_encode($response);
            exit;
        }
    } else {
        // Form data
        $user = new stdClass(); // Creating an empty object to hold form data

        foreach ($_POST as $key => $value) {
            $user->$key = $value;
        }

        // Handle file upload separately
        if (!empty($_FILES['photo']['tmp_name'])) {
            $photo_path = 'path/to/upload/directory/' . $_FILES['photo']['name'];
            move_uploaded_file($_FILES['photo']['tmp_name'], $photo_path);
            $user->photo = $photo_path;
        }

        // Check if the 'password' property exists
        if (!isset($user->password)) {
            $response = ['status' => 0, 'message' => 'Password field is required.'];
            echo json_encode($response);
            exit;
        }
    }

    $hashedPassword = password_hash($user->password, PASSWORD_DEFAULT);

    // Check other required fields
    $requiredFields = ['emp_id', 'full_name', 'mobile_number', 'dept_id', 'address_line_1', 'address_line_2', 'district', 'tehsil', 'city_village', 'pincode', 'salary', 'resign', 'start_date', 'email'];

    foreach ($requiredFields as $field) {
        if (empty($user->$field)) {
            $response = ['status' => 0, 'message' => ucfirst(str_replace('_', ' ', $field)) . ' field is required.'];
            echo json_encode($response);
            exit;
        }
    }

    // Rest of your code remains unchanged
    $sql = "UPDATE employee_master SET full_name = :full_name, mobile_number = :mobile_number, dept_id = :dept_id,
         address_line_1 = :address_line_1, address_line_2 = :address_line_2,
        district = :district, tehsil = :tehsil, city_village = :city_village, pincode = :pincode, salary = :salary,
        resign = :resign, start_date = :start_date, end_date = :end_date, email = :email, password = :password
        WHERE emp_id = :emp_id";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':emp_id', $user->emp_id);
    $stmt->bindParam(':full_name', $user->full_name);
    $stmt->bindParam(':mobile_number', $user->mobile_number);
    $stmt->bindParam(':dept_id', $user->dept_id);
   // $stmt->bindParam(':photo', $user->photo);
    $stmt->bindParam(':address_line_1', $user->address_line_1);
    $stmt->bindParam(':address_line_2', $user->address_line_2);
    $stmt->bindParam(':district', $user->district);
    $stmt->bindParam(':tehsil', $user->tehsil);
    $stmt->bindParam(':city_village', $user->city_village);
    $stmt->bindParam(':pincode', $user->pincode);
    $stmt->bindParam(':salary', $user->salary);
    $stmt->bindParam(':resign', $user->resign);
    $stmt->bindParam(':start_date', $user->start_date);
    $stmt->bindValue(':end_date', empty($user->end_date) ? null : $user->end_date, PDO::PARAM_STR);
    $stmt->bindParam(':email', $user->email);
    $stmt->bindParam(':password', $hashedPassword);

    if ($stmt->execute()) {
        $response = ['status' => 1, 'message' => 'Record updated successfully.'];
    } else {
        $response = ['status' => 0, 'message' => 'Failed to update record.'];
    }
    echo json_encode($response);
}
?>
