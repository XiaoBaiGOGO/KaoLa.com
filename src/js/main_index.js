require.config({
    paths: {
        jquery: '../jq/jquery-3.2.1.min',
        index: './lib/index',
    }
});

require(['jquery','index'],function($,index){
    console.log(index)
    index.lunbo();
    index.xuanfu()
    index.jiazai()
})