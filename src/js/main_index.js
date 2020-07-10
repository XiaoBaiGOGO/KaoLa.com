require.config({
    paths: {
        jquery: '../jq/jquery-3.2.1.min',
        lazyload:'../jq/jquery.lazyload',
        index: './lib/index',
    }
});

require(['jquery','index'],function($,index){
    index.lunbo();
    index.xuanfu()
    index.jiazai()
    index.tab()
})