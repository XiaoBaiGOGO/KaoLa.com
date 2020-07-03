!function ($) {
    let $user = $('.username');
    let $usernameflag = true;
    $user.on('blur', function () {
        $.ajax({
            type: 'post',
            url: 'http://localhost/KaoLa/kao.com/php/registry.php',
            data: {
                username: $user.val()
            }
        }).done(function (result) {
            console.log($user.val())
            console.log(result)
            if (!result) {//不存在
                $('.icon').html('√').css('color', 'green');
                $usernameflag = true;
            } else {
                $('.icon').html('已存在').css('color', 'red');
                $usernameflag = false;
            }
        })
    });

    $('form').on('submit', function () {
        if ($user.val() == '') {
            $('span').html('用户名不能为空').css('color', 'red');
            $usernameflag = false;
        }
        if (!$usernameflag) {
            return false;//阻止提交
        }
    });
}(jQuery);