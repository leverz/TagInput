/**
 * Created by Lever on 2015/9/24.
 */
    app.directive('addTag',function(){
        return{
            restrict: 'A',
            link: function(scope,element){
                element.bind('keydown',function(event){
                    if(event.keyCode == 13){
                        element.next().append('<span class="tag label label-info" style="display:inline-block;width:auto;margin: 5px;background-color: #F09E84;line-height: 2em;">'+scope.dept+'<span style="margin-left: 10px;cursor: pointer;" class="remove-tag"><i class="fa fa-times"></i></span></span>');
                        scope.dept = "";
                        $('.remove-tag').bind('click',function(){
                            $(this).parent().remove();
                        })
                    }
                });
            }
        }
    });