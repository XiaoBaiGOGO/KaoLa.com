let baseUrl="http://localhost/KaoLa/kao.com";
//1.获取列表页传来的sid
let $sid = location.search.substring(1).split('=')[1];
const $smallpic = $('#smallpic');
const $bpic = $('#bpic');
const $title = $('.product-title');//
const $price = $('.currentPrice');
const $yuanjia = $('.addprice');
const $staginglabel = $('.m-staginglabel');
const $tail1 = $('.tail1');
const $tail2 = $('.tail2');
const $vtxt = $('.vtxt>i');

define(['jquery','cookie'],function($,cookie){
    return{
        jiazai:function(){
            $(function(){
                $("#page1").load("./_header.html",function(){
                    if(localStorage.getItem('username') !=null){
                        $('.topNavLeft .item_user').html("考拉欢迎你！"+localStorage.getItem('username'))
                        $('.topNavLeft .login').html("退出登录")
                        $('.topNavLeft .outlogin').remove()
                        $('.topNavLeft2').css("padding-left", "0px")
                    }
                });
                $("#page2").load("./_footer.html");
            })
        },

        render:function(){
            //如果$sid不存在，默认$sid = 1
            if (!$sid) {
                $sid = 1;
            }
            //2.将sid传给后端
            $.ajax({
                url: `${baseUrl}/php/getsid.php`,
                data: {
                    sid: $sid
                },
                dataType: 'json'
            }).done(function(d) {
                // console.log(d);
                let prices=(d.goods_prices).slice(1)
                let act=parseFloat(d.activity)
                $smallpic.attr('src', d.goods_big_logo);
                $smallpic.attr('sid', d.goods_id); //给图片添加唯一的sid
                $bpic.attr('src', d.goods_big_logo);
                $title.html(d.goods_name);
                $price.html(d.goods_prices);
                $yuanjia.html("参考价¥"+d.goods_yuanjia);
                $staginglabel.html(d.activity);
                $tail1.html("￥"+(prices/act).toFixed(2));
                $tail2.html(d.activity);
                $vtxt.html((prices*0.04).toFixed(2));

                //渲染小图
                let picarr = d.goods_small_logo.split(',');
                let $strhtml = '';
                $.each(picarr, function(index, value) {
                    $strhtml += `<li><img src=${value} style="width:100%;height: 100%;"/></li>`;
                });
                $('#list ul').html($strhtml);
            });
        }, //渲染数据

        glass:function(){
            //放大镜效果
            const $spic = $('#spic');
            const $sf = $('#sf'); //小放
            const $bf = $('#bf'); //大放
            const $left = $('#left'); //左箭头
            const $right = $('#right'); //右箭头
            const $list = $('#list'); //小图列表
            //$spic 小图   $bpic 大图  

            //小放/大放=小图/大图
            $sf.width($spic.width() * $bf.width() / $bpic.width());
            $sf.height($spic.height() * $bf.height() / $bpic.height());
            let $bili = $bpic.width() / $spic.width(); //比例大于1 放大效果
            console.log($bili)


            $spic.hover(function() {
                $sf.css('visibility','visible');
                $bf.css({'visibility':'visible',"display": "block"});
                $(this).on('mousemove', function(ev) {
                    let $leftvalue = ev.pageX - $('.PImgBox').offset().left - $sf.width() / 2;
                    let $topvalue = ev.pageY - $('.PImgBox').offset().top - $sf.height() / 2;
                    if ($leftvalue < 0) {
                        $leftvalue = 0;
                    } else if ($leftvalue >= $spic.width() - $sf.width()) {
                        $leftvalue = $spic.width() - $sf.width()
                    }

                    if ($topvalue < 0) {
                        $topvalue = 0;
                    } else if ($topvalue >= $spic.height() - $sf.height()) {
                        $topvalue = $spic.height() - $sf.height()
                    }

                    $sf.css({
                        left: $leftvalue,
                        top: $topvalue
                    });

                    $bpic.css({
                        left: -$leftvalue * $bili,
                        top: -$topvalue * $bili
                    });

                });
            }, function() {
                $sf.css('visibility','hidden');
                $bf.css({'visibility':'hidden',"display": "node"});
            });

            //小图切换
            $('#list ul').on('click', 'li', function() {
                //$(this):当前操作的li
                let $imgurl = $(this).find('img').attr('src');
                $smallpic.attr('src', $imgurl);
                $bpic.attr('src', $imgurl);
            });

            //左右箭头事件
            let $num = 4; //列表显示的图片个数
            $right.on('click', function() {
                let $lists = $('#list ul li');
                if ($lists.length > $num) { //限制点击的条件
                    $num++;
                    $left.css('color', '#333');
                    if ($lists.length == $num) {
                
                        $right.css('color', '#fff');
                    }
                    $('#list ul').animate({
                        left: -($num - 4) * $lists.eq(0).outerWidth(true)
                    });
                }
            });


            $left.on('click', function() {
                let $lists = $('#list ul li');
                if ($num > 4) { //限制点击的条件
                    $num--;
                    $right.css('color', '#333');
                    if ($num <= 4) {
                        $left.css('color', '#fff');
                    }
                    $('#list ul').animate({
                        left: -($num - 4) * $lists.eq(0).outerWidth(true)
                    });
                }
            });
        },//放大镜

        addQuantity:function(){
            // 添加数量
            let ctrnum=$('.ctrnum-qty')
            let qtysum=ctrnum.val()
            $(".ctrnum_l").on("click",function(){
                qtysum--
                if(qtysum<=0){
                    qtysum=0
                    ctrnum.val(qtysum)
                }
                ctrnum.val(qtysum)
            })
            $(".ctrnum_r").on("click",function(){
                qtysum++
                ctrnum.val(qtysum)
            })


            $('.ctrnum-wrap input').on('input', function() {
                let $reg = /^\d+$/g; //只能输入数字
                let $value = $(this).val();
                if (!$reg.test($value)) { //不是数字
                    $(this).val(1);
                }
            });
        },//添加数量

        addCart:function(){
            let arrsid = []; //存储商品的编号。
            let arrnum = []; //存储商品的数量。
        
            //取出cookie,才能判断是第一次还是多次点击
            function cookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
                    arrnum = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组。[12,13,14,15]
                } else {
                    arrsid = [];
                    arrnum = [];
                }
            }
            $('.buyBtns #addCart').on('click', function() {
                //获取当前商品对应的sid
                let $sid = $(this).parents('.PInfoWrap').find('#smallpic').attr('sid');
                console.log($sid)
                //判断是第一次点击还是多次点击
                //多次点击
                //$.inArray(value,array,[fromIndex])
                //确定第一个参数在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。
                cookietoarray();
                if ($.inArray($sid, arrsid) != -1) { //$sid存在，商品列表存在，数量累加
                    //先取出cookie中存在的数量+当前添加的数量，一起添加到cookie中。
                    let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('.ctrnum-qty').val()); //取值
                    arrnum[$.inArray($sid, arrsid)] = $num; //赋值
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                } else {
                    //第一次点击加入购物车按钮,将商品的sid和商品的数量放到提前准备的数组里面，然后将数组传入cookie.
                    arrsid.push($sid); //将编号$sid push到arrsid数组中
                    $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                    arrnum.push($('.ctrnum-qty').val()); //将数量push到arrnum数组中
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                }
        
                // console.log(arrnum)
                let arrsum=0
                arrnum.forEach((element)=>{
                    arrsum += Number(element) 
                })
                $(".m-rightbar .num").css("display", "block").html(arrsum)
            });
        },//添加到购物车

    }
})
