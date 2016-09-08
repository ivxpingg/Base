/**
 * 创建卡券类型
 *优惠券  card-type-0
 *团购劵  card-type-1
 *折扣劵  card-type-2
 *兑换劵  card-type-3
 *代金劵  card-type-4
 */
var validate = function(val){

};

//自助核销
var self_consume = {};

var getFromData = function(){
    //var type = '0';

    var data = {};

    var base_info = {
        "logo_url": "https://mmbiz.qlogo.cn/mmbiz/cEdDrYOU87Pq8Njdoct38fdXgRIMDVq593x3cda9hRHaSYiaxU88WGG9fCGc6u8ca0lxG95ESM2YQ2FySQLI3Tw/0?wx_fmt=png",      //卡券的商户logo，建议像素为300*300。
        "brand_name": "易乘蹭",                  //商户名字,
        "code_type": "",                   //Code展示类型
        "title": "",                       //卡券名
        "sub_title": "",                   //券名
        "color": "Color010",               //颜色
        "notice": "",                     //卡券使用提醒
        "service_phone": "",                    //客服电话。
        "description": "",
        "date_info": {
            "type": "DATE_TYPE_FIX_TIME_RANGE", // DATE_TYPE_FIX_TIME_RANGE 表示固定日期区间，DATE_TYPE_FIX_TERM表示固定时长（自领取后按天算
            "begin_timestamp": 14300000,        //type为DATE_TYPE_FIX_TIME_RANGE时专用
            "end_timestamp": 15300000,          //type为DATE_TYPE_FIX_TIME_RANGE时，表示卡券统一的结束时间
            "fixed_term": 1,                    //type为DATE_TYPE_FIX_TERM时专用，表示自领取后多少天内有效，不支持填写0。
            "fixed_begin_term": 0,              //type为DATE_TYPE_FIX_TERM时专用，表示自领取后多少天开始生效，领取后当天生效填写0。（单位为天）
            "end_timestamp": ""         //可用于DATE_TYPE_FIX_TERM时间类型，表示卡券统一过期时间，
        },
        "sku": {
            "quantity": 0                    //库存
        },
        "get_limit": 50,                 //每人可领券的数量限制,不填写默认为50。
        "use_custom_code": false,       //是否自定义Code码。默认为false。
        "bind_openid": false,           //是否指定用户领取，填写true或false。默认为false。
        "can_share": true,              //卡券领取页面是否可分享。
        "can_give_friend": true,        //卡券是否可转赠。
        "location_id_list": [],          //门店位置poiid。调用POI门店管理接口获取门店位置poiid
        "use_all_locations": true,      //设置本卡券支持全部门店，与location_id_list互斥
        "center_title": "",             //卡券顶部居中的按钮，仅在卡券状态正常(可以核销)时显示，建议开发者设置此按钮时code_type选择CODE_TYPE_NONE类型。
        "center_sub_title": "",         //显示在入口下方的提示语，仅在卡券状态正常(可以核销)时显示。
        "center_url": "",               //顶部居中的url，仅在卡券状态正常(可以核销)时显示。
        "custom_url_name": "",         //自定义跳转外链的入口名字
        "custom_url": "",              //自定义跳转的URL。
        "custom_url_sub_title": "",    //	显示在入口右侧的提示语
        "promotion_url_name": "",      //营销场景的自定义入口名称。
        "promotion_url": "",           //入口跳转外链的地址链接。
        "promotion_url_sub_title": "",  //显示在营销入口右侧的提示语。
        "source": ""                  //第三方来源名，例如同程旅游、大众点评。
    };

    var advanced_info = {
        "use_condition": {
            "can_use_with_other_discount" : true,
            "accept_category": "",
            "reject_category": "",
            //"least_cost": null,
            "object_use_for": "",
        },

        "abstract": {
            "abstract": "",
            "icon_url_list": []
        },
        "text_image_list": [],
        "business_service":  [], //  "BIZ_SERVICE_FREE_WIFI","BIZ_SERVICE_WITH_PET", "BIZ_SERVICE_FREE_PARK", "BIZ_SERVICE_DELIVER"
        "time_limit":[]//,
        // "begin_hour": "",
        // "begin_minute": "",
        // "end_hour": "",
        // "end_minute": ""
    }

    switch(type){
        case '0':   //优惠券
            data = {
                "card": {
                    "card_type": "GENERAL_COUPON",
                    "general_coupon": {
                        "base_info": base_info,
                        "default_detail": "",
                        "advanced_info": advanced_info
                    }
                }
            };

            // 标题
            if($("#ipt-title-0").attr("data-success") == "true") {
                base_info.title =  $("#ipt-title-0").val().trim();
            } else{
                console.error("标题");
                return false;
            }


            //优惠说明
            var description = $("#txt_detail").val().trim();
            if($("#txt_detail").attr("data-success") == "true") {
                data.card.general_coupon.default_detail = description;
            } else{
                console.error("优惠说明");
                return false;
            }

            break;
        case '1':  //团购劵
            data = {
                "card": {
                    "card_type": "GROUPON",
                    "groupon": {
                        "base_info": base_info,
                        "deal_detail": "",
                        "advanced_info": advanced_info
                    }
                }
            };

            // 标题
            if($("#ipt-title-1").attr("data-success") == "true") {
                base_info.title =  $("#ipt-title-1").val().trim();
            } else{
                console.error("标题");
                return false;
            }

            //优惠说明
            var description = $("#txt_detail").val().trim();
            if($("#txt_detail").attr("data-success") == "true") {
                data.card.groupon.deal_detail = description;
            } else{
                console.error("优惠说明");
                return false;
            }

            break;
        case '2': //折扣劵
            data = {
                "card": {
                    "card_type": "DISCOUNT",
                    "discount": {
                        "base_info": base_info,
                        "discount": 0,
                        "advanced_info": advanced_info
                    }
                }
            };

            // 标题
            if($("#ipt-title-2").attr("data-success") == "true") {
                base_info.title =  $("#ipt-title-2").val().trim();
            } else{
                console.error("标题");
                return false;
            }

            //折扣
            if($("#ipt_discount").attr("data-success") == "true") {
                data.card.discount.discount =  +$("#ipt_discount").val();
            } else{
                console.error("折扣");
                return false;
            }

            //使用条件 - 适用范围 （至少填写一项）
            if(document.querySelector('#ipt_scope').checked) {
                var txt_accept_category = $("#txt_accept_category").val().trim();
                var txt_reject_category = $("#txt_reject_category").val().trim();
                if($("#txt_accept_category").attr("data-success") == "false" || $("#txt_reject_category").attr("data-success") == "false" ) {
                    console.log('使用条件');
                    return false;
                }
                if(txt_accept_category == "" && txt_reject_category == ""){
                    console.log('使用条件');
                    return false;
                }

                advanced_info.use_condition.accept_category = txt_accept_category;
                advanced_info.use_condition.reject_category = txt_reject_category;
            }



            $("#txt_detail").attr("data-success", "true");
            break;
        case '3': //兑换劵
            data = {
                "card": {
                    "card_type": "GIFT",
                    "gift": {
                        "base_info": base_info,
                        "gift": "",
                        "advanced_info": advanced_info
                    }
                }
            };

            // 标题
            if($("#ipt-title-3").attr("data-success") == "true") {
                base_info.title =  $("#ipt-title-3").val().trim();
            } else{
                console.error("标题");
                return false;
            }

            //使用条件 - 至少消费多少 或 指定物品
            if(document.querySelector("#ipt_least_cost_3").checked) {
                if( $(".js_sel_least_cost_3").val() == "0") {
                    if($("#txt_least_cost_3").attr("data-success" == "true")){
                         advanced_info.use_condition.least_cost = +$("#txt_least_cost_3").val();
                    } else{
                        console.log('使用条件 -至少消费多少');
                        return false;
                    }
                } else {
                    if($("#txt_object_use_for").attr("data-success" == "true")){
                         advanced_info.use_condition.object_use_for = +$("#txt_object_use_for").val();
                    } else {
                        console.log('使用条件 -指定物品');
                        return false;
                    }
                }
            }

            $("#txt_detail").attr("data-success", "true");
            break;
        case '4': //代金劵
            data = {
                "card": {
                    "card_type": "CASH",
                    "cash": {
                        "base_info": base_info,
                        "least_cost": 0,
                        "reduce_cost": 0,
                        "advanced_info": advanced_info
                    }
                }
            };

            // 标题
            if($("#ipt-title-4").attr("data-success") == "true") {
                base_info.title =  $("#ipt-title-4").val().trim();
            } else{
                console.error("标题");
                return false;
            }


            //折扣
            if($("#ipt_reduce_cost").attr("data-success") == "true") {
                data.card.cash.reduce_cost =  +$("#ipt_reduce_cost").val();
            } else{
                console.error("折扣");
                return false;
            }

            //使用条件 -至少消费多少
            if(document.querySelector("#ipt_least_cost_4").checked) {
                if($("#txt_least_cost_4").attr("data-success" == "true")){
                     advanced_info.use_condition.least_cost = +$("#txt_least_cost_4").val();
                } else {
                    console.log('使用条件 -至少消费多少');
                    return false;
                }
            }

            //使用条件 - 适用范围 （至少填写一项）
            if(document.querySelector('#ipt_scope').checked) {
                var txt_accept_category = $("#txt_accept_category").val().trim();
                var txt_reject_category = $("#txt_reject_category").val().trim();
                if($("#txt_accept_category").attr("data-success") == "false" || $("#txt_reject_category").attr("data-success") == "false" ) {
                    console.log('使用条件');
                    return false;
                }
                if(txt_accept_category == "" && txt_reject_category == ""){
                    console.log('使用条件');
                    return false;
                }

                advanced_info.use_condition.accept_category = txt_accept_category;
                advanced_info.use_condition.reject_category = txt_reject_category;
            }

            $("#txt_detail").attr("data-success", "true");
            break;
        default:break;
    }



    //颜色
    var color = $("#ipt_color").val();
    if(color == ""){
        $(".js-color-tip").show();
        console.error("颜色");
        return false;
    }else{
        base_info.color = color;
    }

    //有效期
    var validity = $('input[name="validity"]:checked').val();
    if(validity == "0"){
        base_info.date_info.type = "DATE_TYPE_FIX_TIME_RANGE";
        if($("#ipt_fix_time").attr("data-success") == "true") {
            base_info.date_info.begin_timestamp = +new Date($("#ipt_fix_time").val().split(":")[0])/1000;
            base_info.date_info.end_timestamp = +new Date($("#ipt_fix_time").val().split(":")[1] + " 23:59")/1000;
        } else {
            console.error("有效期");
            return false;
        }

    } else {
        base_info.date_info.type = "DATE_TYPE_FIX_TERM";
        base_info.date_info.fixed_term = +$("#ipt_fixed_term").val();
        base_info.date_info.fixed_begin_term = +$("#ipt_fixed_begin_term").val();
    }

    //有效时段
    if($("input[name='time-chunk']:checked").val() == "0"){

    } else{
        var $time_week = $("input[name='time-week']:checked");
        var chunk_num_time = $('#chunk_num').val();
        var startHour=[],
            endHour =[],
            startMinute = [],
            endMinute = [];
        if(chunk_num_time == "1") {
            if($("#js_time_limit_start_1").attr("data-success") == "true") {
                startHour.push(+($("#js_time_limit_start_1").val().split(":")[0]));
                startMinute.push(+($("#js_time_limit_start_1").val().split(":")[1]));
            } else {
                console.log("有效时段");
                return false;
            }

            if($("#js_time_limit_end_1").attr("data-success") == "true") {
                endHour.push(+($("#js_time_limit_end_1").val().split(":")[0]));
                endMinute.push(+($("#js_time_limit_end_1").val().split(":")[1]));
            } else {
                console.log("有效时段");
                return false;
            }

        } else if(chunk_num_time == "2"){
            if($("#js_time_limit_start_1").attr("data-success") == "true") {
                startHour.push(+($("#js_time_limit_start_1").val().split(":")[0]));
                startMinute.push(+($("#js_time_limit_start_1").val().split(":")[1]));
            } else {
                console.log("有效时段");
                return false;
            }

            if($("#js_time_limit_end_1").attr("data-success") == "true") {
                endHour.push(+($("#js_time_limit_end_1").val().split(":")[0]));
                endMinute.push(+($("#js_time_limit_end_1").val().split(":")[1]));
            } else {
                console.log("有效时段");
                return false;
            }

            if($("#js_time_limit_start_2").attr("data-success") == "true") {
                startHour.push(+($("#js_time_limit_start_2").val().split(":")[0]));
                startMinute.push(+($("#js_time_limit_start_2").val().split(":")[1]));
            } else {
                console.log("有效时段");
                return false;
            }

            if($("#js_time_limit_end_2").attr("data-success") == "true") {
                endHour.push(+($("#js_time_limit_end_2").val().split(":")[0]));
                endMinute.push(+($("#js_time_limit_end_2").val().split(":")[1]));
            } else {
                console.log("有效时段");
                return false;
            }

        } else {}


        for(var i = 0; i < $time_week.length; i++) {
            for(var j = 0; j < startHour.length; j++){
                var attr = {
                    "type": $($time_week[i]).val(),
                    "begin_hour":startHour[j],
                    "end_hour":endHour[j],
                    "begin_minute":startMinute[j],
                    "end_minute":endMinute[j]
                };
                advanced_info.time_limit.push(attr);
            }

        }

    }


    //图片封面  封面简介
    var icon_url_list = $("#ipt_icon_url_list").val();
    if(icon_url_list == "") {
        console.log("图片封面");
        return false;
    }
    advanced_info.abstract.icon_url_list.push(icon_url_list);
    if($("#ipt_abstract").attr("data-success") == "true"){
        advanced_info.abstract.abstract = $("#ipt_abstract").val();
    } else {
        console.error('封面简介');
        return false;
    }


    //使用条件
    advanced_info.use_condition.can_use_with_other_discount =  !document.querySelector("#js_can_use_with_other_discount").checked;

    //使用须知
    var description = $("#txt_description").val().trim();
    if($("#txt_description").attr("data-success") == "true") {
        base_info.description = description;
    } else{
        console.error("使用须知");
        return false;
    }

    //图文介绍
    var $text_image_list = $(".js-card-article-preview .js-ca-preview");
    for(var i = 0; i < $text_image_list.length; i++ ){
        var list = {
            "image_url": $($text_image_list[i]).find('img').attr("src"),
            "text": $($text_image_list[i]).find('.ca-preview-txt').html()
        };
        advanced_info.text_image_list.push(list);
    }


    //商户介绍(选填)
    //电话

    var service_phone = $("#ipt_service_phone").val();
    if($("#ipt_service_phone").attr("data-success") == "true") {
        base_info.service_phone = service_phone;
    } else{
        console.error('电话');
        return false;
    }

    //商户服务
    var business_service = $("input[name='business_service']:checked");
    for(var i = 0; i< business_service.length; i++) {
        advanced_info.business_service.push($(business_service[i]).val());
    }

    //自定义入口
    if( $("#js_add_user_defined").hasClass("btn-disabled") ){
        if($("#ipt_custom_url_name").attr("data-success") == "true"){
            var custom_url_name = $("#ipt_custom_url_name").val();
            base_info.custom_url_name = custom_url_name;
        } else {
            console.log('自定义入口');
            return false;
        }

        if($("#ipt_custom_url_sub_title").attr("data-success") == "true"){
            var custom_url_sub_title = $("#ipt_custom_url_sub_title").val();
            base_info.custom_url_sub_title = custom_url_sub_title;
        } else {
            console.log('自定义入口');
            return false;
        }

        var gototypeval = $('input[name="gototype"]:checked').val();

        if(gototypeval == "0") {
            var image_text_data = $('#js_image_text_panel').data("data");
            base_info.custom_url = image_text_data.url;
        } else if(gototypeval == "1") {

        } else if(gototypeval == "2"){
             base_info.custom_url = $(".web-link").val().trim();
        }

    }

    // 库存
    var quantity = $("#ipt_quantity").val();
    if($("#ipt_quantity").attr("data-success") == "true"){
        base_info.sku.quantity = +quantity;
    } else {
        console.error('库存');
        return false;
    }

    // 领券限制
    var get_limit = $("#ipt_get_limit").val();
    if($("#ipt_get_limit").attr("data-success") == "true"){
        base_info.get_limit = +get_limit;
    } else {
        console.error('领券限制');
        return false;
    }


    //用户可以分享领券链接
    if($("#js_can_share")[0].checked){
        base_info.can_share = true;
    } else {
        base_info.can_share = false;
    }

    //用户领券后可转赠其他好友
    if($("#js_can_give_friend")[0].checked){
        base_info.can_give_friend = true;
    } else {
        base_info.can_give_friend = false;
    }

    //卡劵核销
    if($("input[name='consumeType']:checked").val() === "1"){
        base_info.code_type = $("input[name='consumeType1']:checked").val();
    } else {
         //自助核销
          self_consume = {
             "is_open" : true,
             "need_verify_cod" : $("#js_self_consume_code")[0].checked,
             "need_remark_amount" : $("#js_self_consume_fee")[0].checked
         }
    }

    // 门店设置
    var shopType = $("input[name='shopType']:checked").val();
    if(shopType == "0"){
        base_info.use_all_locations = true;
    } else if(shopType == "1") {
        base_info.use_all_locations = false;
        var location_id_list = $('#js_shop_list_panel').data("data") || [];
        if(location_id_list.length == 0) {
            $(".js-location-id-list-tip").show();
            console.error("门店设置");
            return false;
        }
        for(var i = 0; i < location_id_list.length; i++){
            base_info.location_id_list.push(location_id_list[i].shop_id);
        }

    } else {
       base_info.use_all_locations = false;
    }

    //操作提示
    var notice = $("#ipt_notice").val().trim();
    if($("#ipt_notice").attr("data-success") == "true") {
        base_info.notice = notice;
    } else{
        console.error("操作提示");
        return false;
    }

    return data;
};

var submit = function(){
    var datas = getFromData();

    if(datas){
        console.log(datas);
        $.ajax({
            url: root + 'weixinCardController.do?createCard&jsoncallback=?',
            dataType : 'jsonp',
            data: {card : encodeURIComponent(JSON.stringify(datas)), selfconsume: JSON.stringify(self_consume)},
            success: function(data){
                console.log(data);
            }
        })
    }
};

$("#js_btn_card_ok").on('click',function(){
submit();
});
