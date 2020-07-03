!function ($) {
    $('.btn ').on('click', function () {
        $.ajax({
            type: 'post',
            url: 'http://localhost/Kaola/kao.com/php/login.php',
            data: {
                user: $('.username').val(),
                pass: $('.password').val(),
            }
        }).done(function (result) {
            console.log($('.username').val())
            console.log($('.password').val())
            // console.log(result)
            if (result) {
                location.href = "index.html";
                localStorage.setItem('username', $('.username').val());
                // console.log(localStorage.setItem('username', $('.username').val()))
            } else {
                $('.password').val('');
                alert('用户名或者密码错误');
            }
        });
    });
}(jQuery);