require.config({
    paths:{
        jquery:'../jq/jquery-3.2.1.min',
        cookie:'../jq/jquery.cookie',
        detail:'./lib/detail'
    }
})
require(['jquery','detail'],function($,detail){
    // console.log(detail)
    detail.jiazai();
    detail.render();
    detail.glass();
    detail.addQuantity();
    detail.addCart();
})
