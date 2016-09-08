(function(){

    var bindImg = function(datas){
        $('.img-list-box ul').empty();

        for(var i = 0; i < datas.item.length; i++){
            var item = datas.item[i];
            var $dom = $('<li><div class="pic-box"><img class="" src="" alt="" /></div>'
                        +'<div class="lbl-content"></div>'
                        +'<div class="mask"><span class="bg"></span><span class="icon-sle"></span></div></li>');

            $dom.find('img')
              .addClass('item-img-'+i)
              .attr({'src': item.url});

            $dom.find('img')[0].onload = function(){
                if($(this).width() > $(this).height()) {
                    $(this).css('height', 117);
                }else {
                    $(this).css('width', 117)
                }
            };
            $dom.find('.lbl-content').append(item.name);

            $dom.on('click', function (){
                var $this = $(this);

                if($this.hasClass('active')) {
                    $this.parent().find('li').removeClass('active');
                    $('#dialog_ok').addClass('btn-disabled');
                } else {
                    $this.parent().find('li').removeClass('active');
                    $this.addClass('active');
                    $('#dialog_ok').removeClass('btn-disabled');
                }
            });


           $('.img-list-box ul').append($dom);
        }

    };

    var setPages = function (page,total){
        $("#dialog_pages").pages({
            currentPage: page,
            totalCount: total,
            callback: function(page){
                var num = (page-1) * 10;
                getData(num,false);
            }
        });
    };

    var getData = function(num, bfirst){
        $.ajax({
            url: root + 'weixinCardController.do?getWXSuCaiPicList&jsoncallback=?',
            dataType : 'jsonp',
            data: { 'offset' : num, 'count': 10},
            success: function(data){
                if(data.success) {
                    bindImg(data.obj);
                    if(bfirst){
                        var total_count = data.obj.total_count;
                        //var item_count = data.obj.item_count;
                        var total = Math.ceil(total_count/10);
                        var page = Math.ceil((num + 10) / 10);
                        setPages(page, total);
                    }
                }
            }
        })
    };

    //绑定图片列表
    getData(0, true);




    $('.pop_closed').on('click', function(){
        $(this).parent().parent().parent().hide();
        $('.dialog-mask').hide();
    });

    $('#dialog_cancel').on('click', function(){
        $(this).parent().parent().parent().hide();
        $('.dialog-mask').hide();
    });

    $('#dialog_ok').on('click', function(){
        if($(this).hasClass('btn-disabled')) {return;}
        $(this).parent().parent().parent().hide();
        $('.dialog-mask').hide();
        var src = $('.img-list-box li.active').find('img').attr('src');
        $('#dialog_img_txt').data('dom').next().attr('src', src).show();
        $('#dialog_img_txt').data('dom').on('mouseover', function(){
             $(this).show();
             $(this).next().next().show();
        }).hide();
    });

    //设置上传图片



    // 初始化Web Uploader
    var uploader2 = WebUploader.create({

        // 选完文件后，是否自动上传。
        auto: true,


        // 文件接收服务端。
        server: root + 'weixinCardController.do?uploadImg',

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: {
            id: '#filePicker2',
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
uploader2.on( 'fileQueued', function( file ) {
    var $li = $(
            '<div id="' + file.id + '" class="file-item thumbnail">' +
                '<img style="display:none;">' +
                // '<div class="info">' + file.name + '</div>' +
            '</div>'
            ),
        $img = $li.find('img');


    // $list为容器jQuery实例
    $("#fileList2").empty().append( $li );

    // 创建缩略图
    // 如果为非图片文件，可以不用调用此方法。
    // thumbnailWidth x thumbnailHeight 为 100 x 100
    uploader2.makeThumb( file, function( error, src ) {
        if ( error ) {
            $img.replaceWith('<span>不能预览</span>');
            return;
        }

        $img.attr( 'src', src );
    }, 100, 100 );
});

    // 文件上传过程中创建进度条实时显示。
    uploader2.on( 'uploadProgress', function( file, percentage ) {
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
    uploader2.on( 'uploadSuccess', function( file,response ) {
        $( '#'+file.id ).addClass('upload-state-done');
        getData(0, true);
    });

    // 文件上传失败，显示上传出错。
    uploader2.on( 'uploadError', function( file ) {
        var $li = $( '#'+file.id ),
            $error = $li.find('div.error');

        // 避免重复创建
        if ( !$error.length ) {
            $error = $('<div class="error"></div>').appendTo( $li );
        }

        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader2.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').remove();
    });

}());
