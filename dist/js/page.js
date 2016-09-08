
(function($){
    $.fn.pages = function(parameters){
        var $this = $(this);
        var g = this;
        var defaults  = {
            currentPage: 1,
            totalCount: 10,
            callback: function(num){}
        };

        g.options = $.extend(true, {}, defaults, parameters);

        if(g.options.totalCount > 0){
           /***********构建分页开始***********/
           $this.empty();
           fillPage();
       }

       function fillPage(){
           $this.empty().append('<div class="page-inner"><span class="btn btn-default prev"><i class="arrow"></i></span><span class="page">1</span><span>/</span><span class="count">10</span> <span class="btn btn-default next"><i class="arrow"></i></span><input class="txt-page" type="text" name="name" value=""><div class="btn btn-default btn-page-goto">跳转</div></div>');

           var $prev = $this.find('.prev');
           var $next = $this.find('.next');

           var $page = $this.find('.page');
           var $count = $this.find('.count');
           var $input = $this.find('.txt-page');
           var $btn = $this.find('.btn-page-goto');

           var reset = function (){
               $page.empty().append(g.options.currentPage);
               $count.empty().append(g.options.totalCount);
               $input.val('');
           }

           reset();
           $prev.on('click', function(){
               if(g.options.currentPage <= 1) return;

               else {
                  --g.options.currentPage
                  reset();
                  g.options.callback(g.options.currentPage);
               }
           });

           $next.on('click', function(){
               if(g.options.currentPage >= g.options.totalCount) {return;}

               else {
                   ++g.options.currentPage;
                   reset();
                   g.options.callback(g.options.currentPage);
               }
           });

           $btn.on('click', function(){
               var value = +$input.val();

               if(typeof value !== "number" || isNaN(value)) {
                   $input.val('');
                   return;
               }

               if(value > g.options.totalCount || value < 1 ) {
                   return;
               } else{
                   g.options.currentPage = value;
                   reset();
                   g.options.callback(value);
               }
           });
       };

    }
}(jQuery));
