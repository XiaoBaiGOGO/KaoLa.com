<?php
include "conn.php";


//检测用户名是否重名
if (isset($_POST['username'])) {
    $user = $_POST['username'];
    // echo $user;
    $result = $conn->query("select * from registry where username='$user'");
    if ($result->fetch_assoc()) { //存在
        echo true; //1
    } else {
        echo false; //空
    }
}

//接收前端表单提交的数据
if (isset($_POST['submit'])) {
    $username = $_POST['login-user'];
    $password = sha1($_POST['login-pass1']);
    $repass = sha1($_POST['login-pass2']);
    $email = $_POST['login-email'];
    $conn->query("insert registry values(null,'$username','$password','$repass','$email',NOW())");

    header('location:http://localhost/KaoLa/kao.com/src/html/login.html');
}
