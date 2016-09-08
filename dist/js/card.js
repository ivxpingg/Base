var root = "http://192.168.50.26:8082/cckjcg-wx-dev/";
var rootip = "http://192.168.50.26:8082/";
var type = '0'; //卡劵类型

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

type = getUrlParam('type');
/**
 * 创建卡券类型
 *优惠券  card-type-0
 *团购劵  card-type-1
 *折扣劵  card-type-2
 *兑换劵  card-type-3
 *代金劵  card-type-4
 */
(function(){


    switch(type){
        case '0':
             $('.card-type-0, .card-type-0-1').show();
             $('.card-type-1, .card-type-2, .card-type-3, .card-type-4').remove();

             $(".use-card-type-2,.use-card-type-3,.use-card-type-4").hide();
        break;
        case '1':
            $('.card-type-1, .card-type-0-1').show();
            $('.card-type-0, .card-type-2, .card-type-3, .card-type-4').remove();
            $(".use-card-type-2, .use-card-type-3, .use-card-type-4").hide();
        break;
        case '2':
            $('.card-type-2').show();
            $('.card-type-1, .card-type-0, .card-type-3, .card-type-4, .card-type-0-1').remove();
            $(".use-card-type-3, .use-card-type-4").hide();
            $('.use-card-type-2').show();
        break;
        case '3':
            $('.card-type-3').show();
            $('.card-type-1, .card-type-2, .card-type-0, .card-type-4, .card-type-0-1').remove();
            $(".use-card-type-2, .use-card-type-4").hide();
            $('.use-card-type-3').show();
        break;
        case '4':
            $('.card-type-4').show();
            $('.card-type-1, .card-type-2, .card-type-3, .card-type-0, .card-type-0-1').remove();
            $(".use-card-type-2, .use-card-type-3").hide();
            $('.use-card-type-4').show();
        break;
        default: break;
    }
}());

var strLength = function(str){
    if (str == null) return 0;
    if (typeof str != "string"){
        str += "";
    }
    return str.replace(/[^\x00-\xff]/g,"01").length;
};

/**
 * 卡卷颜色选择
 */
(function(){
    var $doms = $("[data-type='selBox']");

    $doms.each(function(i,item) {
        var $this = $(item);
        $this.find('.color-list li').on('click', function(event){
            var $li = $(this);
            event.stopPropagation();
            var value = $li.attr("data-val");
            var color =  $li.css('background-color');
            $li.parent().prev().find('.color-chunk').css('background-color', color);
            $($li.parent().attr('data-id')).attr("data-success", "true").val(value);
            $(".js-color-tip").hide();

            $(".phone").css('background', color + 'url(../dist/images/topbar_white.png) no-repeat center 5px');
            $('.btn_use_card').css({'background-color': color, 'color': '#FFF'});
            setTimeout(function(){
                $li.parent().hide();
            }, 10);
        });

        $this.on('click', function(){
            var $box =  $(this);
            $box.find(".color-list").show();

            $box.on('mouseleave', function(){
                $box.find(".color-list").hide();
            });
        });
    });
}());

/**
 * 卡劵标题
 */
(function(){
    $('.card-title').on('keyup', function(){
        var titleName = $(this).val(),
            $domlen = $('.js-card-title-length'),
            $domtip = $('.js-card-title-tip'),
            len = strLength(titleName);

        $domlen.empty().append(len == 0 ? 0 : parseInt(len / 2));

        if(len >　18){
            $domtip.show();
            $(this).attr("data-success","false");
        } else {
            $domtip.hide();
            $(this).attr("data-success","true");
        }

        $('#js_title_preview').empty().append(titleName);
    });
}());

/**
 * 折扣额度
 */
(function(){
    $('#ipt_discount').on('keyup', function(){
        var val = +$(this).val(),
            $domtip = $('.js-discount-tip');

        if( typeof val === 'number' && !isNaN(val) && val >=　1  && val <= 9.9){
            $domtip.hide();
            $(this).attr("data-success","true");
        } else {
            $domtip.show();
            $(this).attr("data-success","false");
        }

    });
}());

/**
 * 减免金额
 */
(function(){
    $('#ipt_reduce_cost').on('keyup', function(){
        var val = +$(this).val(),
            $domtip = $('.js-reduce-cost-tip');

        if( typeof val === 'number' && !isNaN(val) && val >=　0.01){
            $domtip.hide();
            $(this).attr("data-success","true");
        } else {
            $domtip.show();
            $(this).attr("data-success","false");
        }

    });
}());

/**
 * 有效期
 */
(function(){
    var $radios = $('input[name="validity"]');

    $radios.on('change', function(){
        var value = $('input[name="validity"]:checked').val();
        if(value == '0'){
            if($("#ipt_fix_time").val() == "") {$(".js-fix-tip").show();}
            $(this).parent().parent().next().find('select').attr('disabled',true);
        } else{
            $(this).parent().parent().find('select').removeAttr('disabled');
            $(".js-fix-tip").hide();
        }
    });

    var dateRange = new pickerDateRange('fix_time_title', {
        // aRecent7Days : 'aRecent7DaysDemo3', //最近7天
        minValidDate:parseInt(+new Date()/1000) - 1*24*60*60,
        //maxValidDate: parseInt(+new Date()/1000),
        //startDate : new Date().format("yyyy-mm-dd"),
        //endDate : '2013-04-21',
        //needCompare : true,
        //isSingleDay : true,
        //shortOpr : true,
        isTodayValid : true,
        defaultText : ' 至 ',
        inputTrigger : 'sel_fix_time',
        theme : 'ta',
        success : function(obj) {
            $('#js_valid_time').empty().append(obj.startDate.replace(/-/g,'.') + '-' + obj.endDate.replace(/-/g,'.') + '&nbsp;&nbsp;');
            $("#ipt_fix_time").attr("data-success","true").val(obj.startDate + ":" + obj.endDate);
            $(".js-fix-tip").hide();
        }
    });
}());


/**
 * 可用时段
 */
(function(){
    var $radios = $('input[name="time-chunk"]');

    $radios.on('change', function(){
        var value = $('input[name="time-chunk"]:checked').val();
        if(value == '0'){
            $('.week-time-chunk').hide();
        } else{
            $('.week-time-chunk').show();
        }
    });


    //周一至周日
    var $weeks = $('input[name="time-week"]');

    $weeks.on('change', function(){
        var $checked = $('input[name="time-week"]:checked');

        var equal = true,
            value,
            text='',
            attrs = [],
            //['','周一','周二','周三','周四','周五','周六','周日'];
            attr = {
                "MONDAY": '周一',
                "TUESDAY": '周二',
                "WEDNESDAY": '周三',
                "THURSDAY": '周四',
                "FRIDAY": '周五',
                "SATURDAY": '周六',
                "SUNDAY": '周日'
            };

        $checked.each(function(i, item) {
            var num =  $(item).val();

            if(i == 0) {
                value = num;
                text = attr[value];
            }
            else if( (value + 1) == num ){
                equal = false;
                value = num;
            } else {
                if(!equal) {
                    text += '至' + attr[value];
                }
                attrs.push(text);
                value = num;
                text = attr[value];
                equal = true;
            }
        });

        if(!equal) {
            text += '至' + attr[value];
        }
        attrs.push(text);

        $('#js_valid_day_time').empty().append(attrs.toString());

    });

    //添加时间段
    var $timeChunk1 = $('input[name="time-chunk-1"]');
    var $timeChunk2 = $('input[name="time-chunk-2"]');
    var num = '0';
    var fnChunk = function(){
         var text = '';
         if(num == '1') {
             text += $($timeChunk1[0]).val().trim() == '' ? '&nbsp;&nbsp;': '&nbsp;&nbsp;' + $($timeChunk1[0]).val().trim();
             text += $($timeChunk1[1]).val().trim() == '' ? '': '至'+ $($timeChunk1[1]).val().trim();
         }else if(num == '2'){
             text += $($timeChunk1[0]).val().trim() == '' ? '': $($timeChunk1[0]).val().trim();
             text += $($timeChunk1[1]).val().trim() == '' ? '': '至'+ $($timeChunk1[1]).val().trim() + '&nbsp;&nbsp;';
             text += $($timeChunk2[0]).val().trim() == '' ? '': $($timeChunk2[0]).val().trim();
             text += $($timeChunk2[1]).val().trim() == '' ? '': '至'+ $($timeChunk2[1]).val().trim();
         }

         $('#js_valid_time_chunk').empty().append(text);
    };
    $timeChunk1.on('keyup', function(){
         num = $('#chunk_num').val();
        fnChunk();
    });
    $timeChunk2.on('keyup', function(){
        num = $('#chunk_num').val();
        fnChunk();
    });

    $timeChunk1.on('change', function(){
        var EXP = /^\d{1,2}:\d{1,2}$/;
        var pat=new RegExp(EXP);
        var vals;
        if(pat.test($(this).val().trim())){
            $(this).attr("data-success", "true");
            $(".js-time-chunk-tip").hide();
        } else {
            $(this).attr("data-success", "false");
            $(".js-time-chunk-tip").show();

        }
    });
    $timeChunk2.on('change', function(){
        var EXP = /^\d{1,2}:\d{1,2}$/;
        var pat=new RegExp(EXP);
        if(pat.test($(this).val().trim())){
            $(this).attr("data-success", "true");
            $(".js-time-chunk-tip").hide();
        } else {
            $(this).attr("data-success", "false");
            $(".js-time-chunk-tip").show();
        }
    });

    $('#add_time_chunk').on('click', function(){
        var num = $('#chunk_num').val();

        if(num == '0') {
            $('#chunk_num').val('1');
            $('#chunk1').show();
            $('#del_time_chunk').show();
        } else if(num == '1') {
            $('#chunk_num').val('2');
            $('#chunk2').show();
            $('#add_time_chunk').hide();
            $('#del_time_chunk').show();
        } else{

        }
    });

    $('#del_time_chunk').on('click', function(){
        fnChunk();
        num = $('#chunk_num').val();

        if(num == '0'){}
        else if(num =='1') {
            $('#chunk_num').val('0');
            $('#chunk1').hide();
            $('#del_time_chunk').hide();
            $(".js-time-chunk-tip").hide();
            $timeChunk1.val("");
            $timeChunk2.val("");
        }
        else if(num == '2') {
            $('#chunk_num').val('1');
            $('#chunk2').hide();
            $('#add_time_chunk').show();
            $timeChunk2.val("");
        }
    });

}());



/**
 * 上传封面图片
 */
(function(){
    // 初始化Web Uploader
    var uploader = WebUploader.create({

        // 选完文件后，是否自动上传。
        auto: true,


        // 文件接收服务端。
        server: root + 'weixinCardController.do?uploadImg',

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: {
            id: '#filePicker',
            multiple: false
        },

        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },

        runtimeOrder: 'html5',
        fileSingleSizeLimit: 2*1024*1024

    });

    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
        var $li = $(
                '<div id="' + file.id + '" class="file-item thumbnail">' +
                    '<img>' +
                    // '<div class="info">' + file.name + '</div>' +
                '</div>'
                ),
            $img = $li.find('img');


        // $list为容器jQuery实例
        $("#fileList").empty().append( $li );

        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        uploader.makeThumb( file, function( error, src ) {
            if ( error ) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr( 'src', src );
        }, 100, 100 );
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {
        var $li = $( '#'+file.id ),
            $percent = $li.find('.progress span');

        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<p class="progress"><span></span></p>')
                    .appendTo( $li )
                    .find('span');
        }

        $percent.css( 'width', percentage * 100 + '%' );
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on( 'uploadSuccess', function( file, response  ) {
        $( '#'+file.id ).addClass('upload-state-done');
        var url =  response.attributes.url;
        $("#ipt_icon_url_list").val(url);
        $("#js_phone_logo_img").attr(src, url);
        $("#js_phone_logo_box").show();
        $(".js-icon-url-list-tip").hide();

    });

    // 文件上传失败，显示上传出错。
    uploader.on( 'uploadError', function( file ) {
        var $li = $( '#'+file.id ),
            $error = $li.find('div.error');

        // 避免重复创建
        if ( !$error.length ) {
            $error = $('<div class="error"></div>').appendTo( $li );
        }

        $error.text('上传失败');
        $(".js-icon-url-list-tip").show();
        $("#ipt_icon_url_list").val("");
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').remove();
    });
}());


/**
 * 封面简介
 */

(function(){
    $('#ipt_abstract').on('keyup', function(){
        var titleName = $(this).val(),
            $domlen = $('.js-abstract-length'),
            $domtip = $('.js-abstract-tip'),
            len = strLength(titleName);

        $domlen.empty().append(len == 0 ? 0 : parseInt(len / 2));

        if(len >　24){
            $domtip.show();
            $(this).attr("data-success", "false");
        } else if(len == 0){
            $domtip.show();
            $(this).attr("data-success", "false");
        } else {
            $domtip.hide();
            $(this).attr("data-success", "true");
        }

        $('#js_phone_logo_box .title').empty().append(titleName);
    });
}());


/**
 * 使用条件
 */
(function(){
    //least_cost_4
    $("#ipt_least_cost_4").on('change', function(){
        if(this.checked) {
            $(".js_least_cost_4").show();
            $("#txt_least_cost_4").attr("data-success", "false");
        } else {
            $(".js_least_cost_4").hide();
            $("#txt_least_cost_4").val("").attr("data-success", "true");
        }
    });
    $("#txt_least_cost_4").on('keyup',function(){
        var val = +$(this).val();
        var $domtip = $('.js_txt_least_cost_4_tip');
        if(!isNan(val) && val >= 0.01) {
            $(this).attr("data-success", "true");
        } else {
            $(this).attr("data-success", "false");
        }
    });

    //lease_cost object_use_for  3
    $("#ipt_least_cost_3").on('change', function(){
        if(this.checked) {
            $(".js_least_cost_3").show();

            if($(".js_sel_least_cost_3").val() == "0") {
                $(".js_least_cost").show();
                $(".js_object_use_for").hide();
                $("#txt_least_cost_3").val("").attr("data-success", "false");
            } else　{
                $(".js_least_cost").hide();
                $(".js_object_use_for").show();
                $("#txt_object_use_for").val("").attr("data-success", "false");
            }
        } else {
            $(".js_least_cost_3, .js_least_cost, .js_object_use_for").hide();
            $("#txt_least_cost_3, #js_object_use_for").val("").attr("data-success", "true");
        }
    });

    $(".js_sel_least_cost_3").on('change', function(){
        if($(this).val() == "0") {
            $(".js_least_cost").show();
            $(".js_object_use_for").hide();
        } else　{
            $(".js_least_cost").hide();
            $(".js_object_use_for").show();
        }
    });

    $("#txt_least_cost_3").on("keyup", function(){
        var val = +$(this).val();
        var $domtip = $('.js_least_cost_3_tip');
        if(!isNaN(val) && val >= 0.01) {
            $(this).attr("data-success", "true");
            $domtip.hide();
        } else {
            $(this).attr("data-success", "false");
            $domtip.show();
        }
    });

    $("#txt_object_use_for").on("keyup", function(){
        var val = $(this).val();
        var $domtip = $('.js_object_use_for_tip');
        len = strLength(val);

        if(len == 0 || len >　30){
            $domtip.show();
            $(this).attr("data-success", "false");
        } else {
            $domtip.hide();
            $(this).attr("data-success", "true");
        }

    });

    //
    $("#ipt_scope").on('change', function(){
        if(this.checked) {
            $(".js-scope").show();
            $("#txt_accept_category").val("").attr("data-success", "false");
            $("#txt_reject_category").val("").attr("data-success", "true");
        } else {
            $(".js-scope").hide();
            $("#txt_accept_category").attr("data-success", "true");
            $("#txt_reject_category").attr("data-success", "true");
        }
    });

    $("#txt_accept_category").on('keyup', function(){
        var val = $(this).val(),
           $domlen = $('.js-accept-category-length'),
           $domtip = $('.js-accept-category-tip'),
           len = strLength(val);

           $domlen.empty().append(len == 0 ? 0 : parseInt(len / 2));

           $('.js-reject-category-tip').hide();

           if(len == 0){
               $("#txt_accept_category").attr("data-success", "true");
               $domtip.show();
           } else if(len >　30){
               $("#txt_accept_category").attr("data-success", "false");
               $domtip.show();
           } else {
               $("#txt_accept_category").attr("data-success", "true");
               $domtip.hide();
           }
    });

    $("#txt_reject_category").on('keyup', function(){
        var val = $(this).val(),
           $domlen = $('.js-reject-category-length'),
           $domtip = $('.js-reject-category-tip'),
           len = strLength(val);

           $domlen.empty().append(len == 0 ? 0 : parseInt(len / 2));

           $('.js-accept-category-tip').hide();

           if(len == 0){
               $("#txt_reject_category").attr("data-success", "true");
               $domtip.show();
           } else if(len >　30){
               $("#txt_reject_category").attr("data-success", "false");
               $domtip.show();
           } else {
               $("#txt_reject_category").attr("data-success", "true");
               $domtip.hide();
           }
    });

}());

/**
 * 使用须知
 */
(function(){
    $('#txt_description').on('keyup', function(){
        var value = $(this).val(),
            $domlen = $('.js-description-length'),
            $domtip = $('.js-description-tip'),
            len = strLength(value);

        $domlen.empty().append(len == 0 ? 0 : parseInt(len / 2));

        if(len > 600){
            $domtip.show();
            $(this).attr("data-success", "false");
        } else {
            $domtip.hide();
            $(this).attr("data-success", "true");
        }

    });
}());

/**
 * 优惠说明
 */
(function(){
    $('#txt_detail').on('keyup', function(){
        var value = $(this).val(),
            $domlen = $('.js-detail-length'),
            $domtip = $('.js-detail-tip'),
            len = strLength(value);

        $domlen.empty().append(len == 0 ? 0 : parseInt(len / 2));

        if(len > 600 || len == 0){
            $domtip.show();
            $(this).attr("data-success", "false");
        } else {
            $domtip.hide();
            $(this).attr("data-success", "true");
        }

    });
}());

/**
 * 电话
 */
 (function(){
     $('#ipt_service_phone').on('keyup', function(){
         var value = $(this).val(),
             $domtip = $('.js-service-phone-tip'),
             len = strLength(value);

         var isTel = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value),
             isNum = (typeof +value === "number" && isNaN(+value))? false : true;
             isMobile = /^(?:13\d|15[789]|17\d|18\d)-?\d{5}(\d{3}|\*{3})$/.test(value);


         if(len == 0){
             $domtip.hide();
             $(this).attr("data-success", "true");
         } else if((isTel || isMobile || isNum) && len > 4) {
             $domtip.hide();
             $(this).attr("data-success", "true");
         }
         else {
             $domtip.show();
             $(this).attr("data-success", "false");
         }

     });
 }());

/**
 * 自定义入口
 */
(function(){

    $('#ipt_custom_url_name').on('keyup', function(){
        var value = $(this).val(),
            $domlen = $('.js-custom-url-name-length'),
            $domtip = $('.js-custom-url-name-tip'),
            len = strLength(value);

        $domlen.empty().append(len == 0 ? 0 : parseInt(len / 2));

        if(len > 10 || len == 0){
            $domtip.show();
            $(this).attr("data-success", "false");
        } else {
            $domtip.hide();
            $(this).attr("data-success", "true");
        }

        $('#js_card_custom_entry .title').empty().append(value);
    });

    $('#ipt_custom_url_sub_title').on('keyup', function(){
        var value = $(this).val(),
            $domlen = $('.js-custom-url-sub-title-length'),
            $domtip = $('.js-custom-url-sub-title-tip'),
            len = strLength(value);

        $domlen.empty().append(len == 0 ? 0 : parseInt(len / 2));

        if(len > 12){
            $domtip.show();
            $(this).attr("data-success", "false");
        } else {
            $domtip.hide();
            $(this).attr("data-success", "true");
        }
       $('#js_card_custom_entry .slogan').empty().append(value);
    });

    //设置点击跳转
    var $radios = $('input[name="gototype"]');
    $radios.on('change', function(){
        var value = $('input[name="gototype"]:checked').val();
        $("#gototype0,#gototype1,#gototype2").hide();
        $("#gototype"+value+"").show();
    });

    //显示选择的图文信息、
    var showImageInfo = function(list){
        $('#js_image_text_panel').empty().show();
        $('#js_image_text_panel').data("data",list);
        var item = list;
            var $dom = $('<div class="appmsg">'
                            + '<div class="appmsg_info">2016年08月05日</div>'
                            + '<div class="appmsg_item">'
                                + '<h4 class="appmsg_title">'
                                    + '<a class="js_link_url" href="" target="_blank">里约奥运来了，快来！</a>'
                                + '</h4>'
                                + '<div class="appmsg_thumb_wrp" style="background-image:url()"></div>'
                                + '<p class="appmsg_desc">上个月刚熬夜看完了欧洲杯比赛，难道又要接着熬夜看奥运了吗？Soooo HOT! 怎么可以错过？</p>'
                            + '</div>'
                        + '</div>');
            $dom.find('.appmsg_info').empty().append(item.addTime);
            $dom.find('.js_link_url').empty().append(item.title);
            $dom.find('.appmsg_thumb_wrp').css('background-image', 'url('+ rootip + item.imagePath+')');
            $dom.find('.appmsg_desc').empty().append(item.description);

            $('#js_image_text_panel').append($dom);
    };
    //选择图文信息
    var setPages = function(page,total){
        $("#dialog_image_text_page").pages({
            currentPage: page,
            totalCount: total,
            callback: function(num){
                var num = (num-1) * 10;
                getData(num,false);
            }
        });
    };
    var bindData = function(datas){
        $("#dialog_image_text ul").empty();

        for(var i = 0; i < datas.item_list.length; i++) {
            var item = datas.item_list[i];
            var $dom = $('<li><span class="title"></span><span class="date"></span></li>');

            $dom.data('item', item);
            $dom.find('.title').append(item.title);
            $dom.find('.date').append(item.addTime);

            $dom.on('click', function(){
                if($(this).hasClass('active')){
                    $(this).toggleClass('active');
                    $("#js_image_text_ok").addClass('btn-disabled');
                } else{
                    $("#dialog_image_text ul li").removeClass();
                    $(this).toggleClass('active');
                    $("#js_image_text_ok").removeClass('btn-disabled');
                }

            });

            $("#dialog_image_text ul").append($dom);
        }
    };
    var getData = function(num, bfirst){
        $.ajax({
            url: root + 'newsItemController.do?getNewsItemList&jsoncallback=?',
            dataType : 'jsonp',
            data: { 'offset' : num, 'count': 10},
            success: function(data){
                console.log(data);
                if(data.success) {
                    bindData(data.obj);
                    if(bfirst){
                        var total_count = data.obj.total_count;
                        var total = Math.ceil(total_count/10);
                        var page = Math.ceil((num + 10) / 10);
                        setPages(page, total);
                    }
                }
            },
            error: function(e,error,er){
            }
        });
    };
    getData(0, true);
    $('#js_btn_image_text').on('click', function(){
        getData(1);
        $('#dialog_image_text, .dialog-mask').show();
    });

    $("#js_image_text_ok").on('click', function(){
        if($(this).hasClass('btn-disabled')) return;

        var item = $("#dialog_image_text ul li.active").data('item');
        showImageInfo(item);
        $('#dialog_image_text, .dialog-mask').hide();
    });
    $("#js_image_text_cancel").on('click', function(){
        $('#dialog_image_text, .dialog-mask').hide();
    });

    //添加自定义
    $('#js_add_user_defined').on('click',function(){
        if($(this).hasClass('btn-disabled')) {
            return;
        }else {
            $(this).addClass('btn-disabled');
            $('.user-defined').show();
        }
    });
   //删除自定义
    $('#js_del_user_defined').on('click',function(){
        $('.user-defined').find('input').val('');
        $('.user-defined').hide();
        $('#js_add_user_defined').removeClass('btn-disabled');
    });


}());


/**
 * 库存
 */

 (function(){
     $('#ipt_quantity').on('keyup', function(){
         var value = $(this).val(),
             $domtip = $('.js-quantity-tip'),
             value = +value;

         if(typeof value === 'number' && !isNaN(value)) {
              if(value < 1 || value > 1000000000) {
                  $domtip.show();
                  $(this).attr("data-success", "false");
              } else {
                   $domtip.hide();
                   $(this).attr("data-success", "true");
              }
         } else{
             $domtip.show();
             $(this).attr("data-success", "false");
         }
     });
 }());


/**
 * 领取张数
 */
 (function(){
     $('#ipt_get_limit').on('keyup', function(){
         var value = $(this).val(),
             $domtip = $('.js-get-limit-tip'),
             value = +value;

         if(typeof value !== 'number' || isNaN(value)) {
              $domtip.show();
              $(this).attr("data-success", "false");

         } else{
             $domtip.hide();
             $(this).attr("data-success", "true");
         }
     });
 }());


 /**
  * 核销方式
  */
 (function(){

     var $radio = $('input[name="consumeType"]');
     $radio.on('change', function(){
         var $this = $(this);

         $('.consumeType0,.consumeType1').hide();
         $('.consumeType'+$this.val()+'').show();
     })

 }());

 /**
  * 适用门店
  */
 (function(){

     var $radio = $('input[name="shopType"]');
     $radio.on('change', function(){
         var $this = $(this);

         switch($this.val()){
             case '0':
                 $("#js_shop_list_panel, #js_add_shop").hide();
                 $("#js_no_shop_panel").hide();
                 break;
             case '1':
                 $("#js_shop_list_panel, #js_add_shop").show();
                 break;
             case '2': $("#js_no_shop_panel").show();break;
             default: break;
         }
     });

     var $shopType2 = $('input[name="shopType2"]');
     $shopType2.on('change', function(){
         var $this = $(this);
         if($this.val() == 1) {
             $('#other_desc_panel, .js-other-desc-tip-msg').show();
         } else {
             $('#other_desc_panel, .js-other-desc-tip-msg').hide();
         }
     });

     //弹出弹出框
     $("#js_add_shop").on('click',function(){
         $("#dialog_shop, .dialog-mask").show();
     });

     //设置按钮事件
     $("#js_shop_ok").click(function(){

         var $dom_list = $("#dialog_shop input:checked");
         var lists = [];
         $dom_list.each(function(i,item){
            lists.push($(item).parent().parent().data('item'));
         });


         showShop(lists);

         $("#dialog_shop, .dialog-mask").hide();
     });
     $("#js_shop_cancel").click(function(){
         $("#dialog_shop, .dialog-mask").hide();
     });

     //门店全选设置
     $("#dialog_shop").find('input[name="shops"]').on('change',function(){

         if(this.checked) {
             document.querySelectorAll('input[name="shop"]').forEach(function(item){
                 item.checked = true;
             });
         } else {
             document.querySelectorAll('input[name="shop"]').forEach(function(item){
                 item.checked = false;
             });
         }
     });

     //
     var showShop = function(lists){
         $('#js_shop_list_panel li:not(".header")').remove();
         if(lists.length == 0) {
             $('#js_shop_list_panel').hide();
             $(".js-location-id-list-tip").show();
             return;
         } else{
             $('#js_shop_list_panel').show();
             $(".js-location-id-list-tip").hide();
         }
         for(var i = 0; i < lists.length; i++){
             var item = lists[i];

             var $dom = $('<li><span class="shop-name"></span><span class="address"></span></li>');

             $dom.find('.shop-name').append(item.shop_name);
             $dom.find('.address').append(item.address);
             $('#js_shop_list_panel ul').append($dom);
         }
         $('#js_shop_list_panel').data("data",lists);
     };

     var bindData = function(datas){
         $("#dialog_shop ul").empty();

         for(var i = 0; i < datas.shop_list.length; i++) {
             var item = datas.shop_list[i];
             var $dom = $('<li><span class="checked"><input type="checkbox" name="shop" value=""></span><span class="shop-name"></span><span class="address"></span></li>');

             $dom.data('item', item);
             $dom.find('.shop-name').append(item.shop_name);
             $dom.find('.address').append(item.address);


             $("#dialog_shop ul").append($dom);
         }
     };
     var setPages = function(page,total){
         $("#dialog_shop_page").pages({
             currentPage: page,
             totalCount: total,
             callback: function(num){
                 var num = (page-1) * 10;
                 getData(num,false);
             }
         });
     };

     var getData =function (num, bfirst){
         $.ajax({
             url: root + 'weixinShopBaseinfoController.do?getShopList&jsoncallback=?',
             dataType : 'jsonp',
             data: { 'offset' : num, 'count': 10},
             success: function(data){
                  console.log(data);
                  if(data.success) {
                      bindData(data.obj);
                      if(bfirst){
                          var total_count = data.obj.total_count;
                          var total = Math.ceil(total_count/10);
                          var page = Math.ceil((num + 10) / 10);
                          setPages(page, total);
                      }
                  }
             }
         });
     };

     getData(0, true);


 }());

 /**
  * 操作提示
  */
 (function(){
     $('#ipt_notice').on('keyup', function(){
         var value = $(this).val(),
             $domlen = $('.js-notice-length'),
             $domtip = $('.js-notice-tip'),
             len = strLength(value);

         $domlen.empty().append(len == 0 ? 0 : parseInt(len / 2));

         if(len >　32){
             $domtip.show();
             $(this).attr("data-success", "false");
         } else {
             $domtip.hide();
             $(this).attr("data-success", "true");
         }

     });
 }());
