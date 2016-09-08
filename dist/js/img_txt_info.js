(function(){

    var add = function(){
        var $dom = $('<div class="js-article-item">'
                     + '<div class="card-article-img">'
                            + '<a class="btn-card-image js-ad-img-p" href="javascript:;"></a>'
                            + '<img class="js-card-img-des" src="" alt="" style="width:100%; display: none;" />'
                            + '<div class="mask js-images-mask" style="display: none;"> </div>'
                            + '<input class="js-image-hidden" type="hidden" name="name" value="">'
                        + '</div>'
                        + '<div class="card-article-description">'
                           + '<span class="frm-textarea-box">'
                               + '<textarea class="frm-textarea js-maxlength js-desc valid" data-maxlength="5000" target="#js-image-text-hint" placeholder="图文内容建议上传商品、服务、环境等优质图片，并辅之以简单描述"></textarea>'
                           + '</span>'
                           + '<span class="frm-textarea-append"><span id="js_image_text_hint">0</span>/5000</span>'
                        + '</div>'
                        + '<div class="card-article-opr">'
                             + '<a class="btn btn-primary">确定</a>'
                            + '<a class="btn btn-default">取消</a>'
                        + '</div>'
                    + '</div>');

        var $btnImg = $dom.find('.js-ad-img-p');
        var $img = $dom.find('.js-card-img-des');
        var $mask = $dom.find('.mask');
        var $areatext = $dom.find('.js-desc');
        var $btnprimary = $dom.find('.btn-primary');
        var $btndefault = $dom.find('.btn-default');


        $btnImg.on('click', function(){
            $('#dialog_img_txt').data('dom', $btnImg).show();
            $('.dialog-mask').show();
        });

        $mask.on('mouseover', function(){
            $(this).show();
            $(this).prev().prev().show();
        }).on('mouseleave', function(){
            $(this).prev().prev().hide();
            $(this).hide();
        });

        $img.on('mouseover', function(){
                $(this).prev().show();
                $(this).next().show();
            })
            .on('mouseleave', function(){
                $(this).prev().hide();
                $(this).next().hide();
            });


        $areatext.on('keyup', function(){
            var $this = $(this);
            var len = $this.val().length;
            // if(len > 5000) {}
            $('#js_image_text_hint').empty().append(len);
        });

        $btnprimary.on('click', function(){
            var $this = $(this),
                $box = $('.js-card-article-previews');
                src = $img.attr('src'),
                content = $areatext.val().trim();


            //if(src == '') {}
            if(src == "") {return;}
            if(content.length > 5000) {return;}

            var $domDes = $('<div class="js-ca-preview">'
                              +'  <img src="" alt="" />'
                              +'  <div class="ca-preview-txt"></div>'
                            +'</div>');
            $domDes.find('img').attr('src',src);
            $domDes.find('.ca-preview-txt').append(content);

            $domDes.on('mouseover', function(e){
                $('.js-article-toolbar').data('dom', $(this));
                var $pres = $('.js-ca-preview');
                var index = $pres.index(this);
                var top = 100;

                for(var i = 0; i < index; i++) {
                    top += $($pres[i]).outerHeight();
                }

                $('.js-article-toolbar').css({
                    'top': top + 'px'
                });
            });

            $box.append($domDes);
            $dom.remove();
            $('.js-artical-add').removeClass('editting');
        });

        $btndefault.on('click', function(){
            $('.js-card-article-editor').empty();
            $('.js-artical-add').removeClass('editting');
        });

        $('.js-card-article-editor').empty().append($dom);
    };

    //已完成的图文
    $('.js-card-article-previews')
        .on('mouseover', function (e){

              $('.js-article-toolbar').css({
                  'display': 'block'
              });
        })
        .on('mouseleave', function(){
            $('.js-article-toolbar').css({'display': 'none'});
        });

    //已完成的图文
    $('.js-article-toolbar').on('mouseover', function(){$('.js-article-toolbar').css({'display': 'block'});});

    //图文位置变更
    $('.js-moveup').on('click', function(){
        var $pre = $('.js-article-toolbar').data('dom');
        var $pres = $('.js-ca-preview');
        var index = $pres.index($pre);

        if(index == 0) return;
        $pre.insertBefore($pre.prev());
    });
    $('.js-movedown').on('click', function(){
        var $pre = $('.js-article-toolbar').data('dom');
        var $pres = $('.js-ca-preview');
        var index = $pres.index($pre);

        if( ++index == $pres.length) return;
        $pre.insertAfter($pre.next());
    });
    $('.js-edit').on('click', function(){});
    $('.js-delete').on('click', function(){
        var $pre = $('.js-article-toolbar').data('dom');
         $pre.remove();
         $('.js-article-toolbar').css({'display': 'none'});
    });

    //添加图文编辑事件
    $('.js-artical-add').on('click',function(){
        $this = $(this);

        if($this.hasClass('editting')) return;
        $this.addClass('editting');
        add();
    });


}());
