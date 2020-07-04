let baseUrl = "http://localhost/";

define(['jquery'],function($){
    return{
        lunbo:function(){
            let ord = 0;
            let myTimer = null;
        
            let $img = $("#show_pic>li>a>img")
            let $li = $("#imgBox>ol>li")
        
            function autoPlay() {
                myTimer = setInterval(function() {
                    goImg(ord + 1)
                }, 2000)
            }
        
            function goImg(transOrd) {
                if (transOrd == ord) {
                    return
                }
        
                let outOrd = ord;
                ord = transOrd;
        
                if (ord > $img.length - 1) {
                    ord = 0;
                } else if (ord < 0) {
                    ord = $img.length - 1;
                }
        
                $img.eq(outOrd).animate({ "opacity": 0 }, 1000)
                $img.eq(ord).animate({ "opacity": 1 }, 1000)
        
                $li.eq(outOrd).css({ "background-color": "#fff" })
                $li.eq(ord).css({ "background-color": "#ff1e32" })
        
            }
        
            function stopPlay() {
                window.clearInterval(myTimer)
                myTimer = null
            }
            $(function() {
                autoPlay();
        
                //2、点击豆豆跳转到对应的图片上
                $("#imgBox>ol>li").click(function() {
                    stopPlay();
                    goImg($(this).index())
                })
        
                //3、鼠标放入停止
                $("#show_pic>li").mouseover(function() {
                    stopPlay()
                })
        
                //4、鼠标离开继续播放  
                $("#show_pic>li").mouseout(function() {
                    autoPlay()
                })
        
                //5、左右箭头
                let $span = $(".control>div>span")
                $span.eq(0).click(function() {
                    stopPlay();
                    goImg(ord - 1);
                })
                $span.eq(1).click(function() {
                    stopPlay();
                    goImg(ord + 1);
                })
            })
        },
        xuanfu:function(){
            $(window).scroll( function() {
     
                const $docHead = $("#docHead")
                const $docHeadWrap = $(".docHeadWrap")
                const $logo_kaola_new = $(".logo_kaola_new")
                const $searchiptbox = $("#searchiptbox")
                const $shopcartnew = $(".shopcartnew")
                const $topTabBox = $("#topTabBox")
              
                window.onscroll = function() {
                    let scrollVal = document.documentElement.scrollTop || document.body.scrollTop;
              
                    // console.log(scrollVal)
                    if (scrollVal > 100) {
                        $docHead.css({ "position": "fixed", "top": "0px", "height": "50px", "width": "100%" })
                        $docHeadWrap.css({ "height": "50px" })
                        $logo_kaola_new.css({
                            "top": "5px",
                            "width": "162px",
                            "height": "40px",
                            "background-size": "auto 40px"
                        })
                        $searchiptbox.css({
                            "top": "5px",
              
                        })
                        $shopcartnew.css({
                            "top": "5px",
              
                        })
                        $topTabBox.css({ "margin-top": "100px" })
                    } else {
                        $docHead.css({ "position": "static", "height": "100px" })
                        $logo_kaola_new.css({
                            "top": "20px",
                            "width": "330px",
                            "height": "65px",
                            "background-size": "auto 65px"
                        })
                        $searchiptbox.css({
                            "top": "33px",
              
                        })
                        $shopcartnew.css({
                            "top": "33px",
              
                        })
              
                        $topTabBox.css({ "margin-top": "0" })
                    }
                }
              });
        },
        jiazai:function(){
            $(function(){
                $("#headerHTML").load("./_header.html");
                $("#footerHTML").load("./_footer.html");
            })
        }
    }
})


// 顶部 两侧悬浮 

//   $(window).on("load",$(".item_user") ,function(){
//     if (localStorage.getItem('username')) {
//         $('.item_user').html("考拉欢迎你！"+localStorage.getItem('username'));
//     }
//   })
