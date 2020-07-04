// let baseUrl="http://localhost/KaoLa/kao.com";

// define(['jquery','cookie'],function($,cookie){
//     return{

//     }
// })


! function($) {
    //1.获取cookie渲染对应的商品列表
    //2.获取所有的接口数据，判断取值。
    $(window).on("scroll",function(){
        let mainWrap=$('#mainWrap').height()-200

        if($(window).scrollTop()>mainWrap){
            $("#totalbar").css({"position":"relative"})
        }else{
            $("#totalbar").css({"position":"fixed"})
        }
    })

    function showlist(sid, num) { //sid：编号  num：数量
        $.ajax({
            url: `${baseUrl}/php/alldata.php`,
            dataType: 'json'
        }).done(function(data) {
            $.each(data, function(index, value) {
                if (sid == value.goods_id) {
                    let dianpu;
                    if(value.goods_dianpu==""){
                        dianpu="考拉海购自营"
                    }else{
                        dianpu=value.goods_dianpu
                    }  
                    let prices=(value.goods_prices).slice(1)

                    let $clonebox = $('.m-cartbox:hidden').clone(true, true); //克隆隐藏元素
                    $clonebox.find('.warename').find('a').html(dianpu);
                    $clonebox.find('.imgwrap').find('img').attr('src', value.goods_big_logo);
                    $clonebox.find('.imgwrap').find('img').attr('sid', value.goods_id);
                    $clonebox.find('.goodtlt').find('a').attr("title",value.goods_name).html(value.goods_name);
                    $clonebox.find('.m-actlabel').find('fenqi').html(value.activity);
                    $clonebox.find('.col3').find('del').html(value.goods_yuanjia);
                    $clonebox.find('.col3').find('span').html(prices);
                    $clonebox.find('.u-setcount').find('input').val(num);
                    //计算单个商品的价格
                    $clonebox.find('.col5').find('.sumrow').html((prices * num).toFixed(2));
                    $clonebox.css('display', 'block');
                    $('.cartbox-wrap').append($clonebox);
                    calcprice(); //计算总价
                }
            });

        });
    }

    //2.获取cookie渲染数据
 if ($.cookie('cookiesid') && $.cookie('cookienum')) {
        let s = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组[1,2]
        let n = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组[10,20]
        $.each(s, function(index, value) {
            // console.log(s[index] ,n[index])  
            showlist(s[index], n[index]);
        });
    }

  //3.计算总价--使用次数很多--函数封装
    function calcprice() {
        let $sum = 0; //商品的件数
        let $count = 0; //商品的总价
        $('.m-cartbox:visible').each(function(index, ele) {
            // console.log(ele)
            if ($(ele).find('.u-chk1').prop('checked')) { //复选框勾选
                $sum += parseInt($(ele).find('.col4 input').val());
                $count += parseFloat($(ele).find('.col5 .sumrow').html());
            }
        });
        $('.float_right').find('.num').html($sum);
        $('.float_right').find('.itm').html("商品应付总计:"+$count.toFixed(2));
    }

      //4.全选
  $('.u-chk').on('change', function() {
        $('.m-cartbox:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
        $('.u-chk').prop('checked', $(this).prop('checked'));
        calcprice(); //计算总价
    });
    let $inputs = $('.goods-item:visible').find(':checkbox');
    $('.item-list').on('change', $inputs, function() {
        //$(this):被委托的元素，checkbox
        if ($('.goods-item:visible').find(':checkbox').length === $('.goods-item:visible').find('input:checked').size()) {
            $('.allsel').prop('checked', true);
        } else {
            $('.allsel').prop('checked', false);
        }
        calcprice(); //计算总价
    });

  /*     //5.数量的改变
    $('.quantity-add').on('click', function() {
        let $num = $(this).parents('.goods-item').find('.quantity-form input').val();
        $num++;
        $(this).parents('.goods-item').find('.quantity-form input').val($num);

        $(this).parents('.goods-item').find('.b-sum strong').html(calcsingleprice($(this)));
        calcprice(); //计算总价
        setcookie($(this));
    });


    $('.quantity-down').on('click', function() {
        let $num = $(this).parents('.goods-item').find('.quantity-form input').val();
        $num--;
        if ($num < 1) {
            $num = 1;
        }
        $(this).parents('.goods-item').find('.quantity-form input').val($num);
        $(this).parents('.goods-item').find('.b-sum strong').html(calcsingleprice($(this)));
        calcprice(); //计算总价
        setcookie($(this));
    });


    $('.quantity-form input').on('input', function() {
        let $reg = /^\d+$/g; //只能输入数字
        let $value = $(this).val();
        if (!$reg.test($value)) { //不是数字
            $(this).val(1);
        }
        $(this).parents('.goods-item').find('.b-sum strong').html(calcsingleprice($(this)));
        calcprice(); //计算总价
        setcookie($(this));
    });

    //计算单价
    function calcsingleprice(obj) { //obj元素对象
        let $dj = parseFloat(obj.parents('.goods-item').find('.b-price strong').html());
        let $num = parseInt(obj.parents('.goods-item').find('.quantity-form input').val());
        return ($dj * $num).toFixed(2)
    }


    //将改变后的数量存放到cookie中
    let arrsid = []; //存储商品的编号。
    let arrnum = []; //存储商品的数量。
    function cookietoarray() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            arrsid = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
            arrnum = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组。[12,13,14,15]
        } else {
            arrsid = [];
            arrnum = [];
        }
    }

    function setcookie(obj) {
        cookietoarray();
        let $sid = obj.parents('.goods-item').find('img').attr('sid');
        arrnum[$.inArray($sid, arrsid)] = obj.parents('.goods-item').find('.quantity-form input').val();
        jscookie.add('cookienum', arrnum, 10);
    }


    //6.删除
    function delcookie(sid, arrsid) { //sid:当前删除的sid  arrsid:存放sid的数组[3,5,6,7]
        let $index = -1; //删除的索引位置
        $.each(arrsid, function(index, value) {
            if (sid === value) {
                $index = index;
            }
        });
        arrsid.splice($index, 1);
        arrnum.splice($index, 1);

        $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
    }
    $('.b-action a').on('click', function() {
        cookietoarray();
        if (window.confirm('你确定要删除吗?')) {
            $(this).parents('.goods-item').remove();
            delcookie($(this).parents('.goods-item').find('img').attr('sid'), arrsid);
            calcprice(); //计算总价
        }
    });

    $('.operation a').on('click', function() {
        cookietoarray();
        if (window.confirm('你确定要全部删除吗?')) {
            $('.goods-item:visible').each(function() {
                if ($(this).find(':checkbox').is(':checked')) { //判断复选框是否选中
                    $(this).remove();
                    delcookie($(this).find('img').attr('sid'), arrsid);
                }
            });
            calcprice(); //计算总价
        }
    });  */
}(jQuery);