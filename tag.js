/**
 * Created by Lever on 2015/9/24.
 *
 * Update by Lever on 2015/11/24.
 *
 * 使用说明:
 *页面中需要制定
 *       <input ng-model="selected" add-tag="Array"/>
 *       <div id="tag-container></div>
 *
 * 回车后确认输入，标签显示在tag-container中。
 * 改进之后，加入了预判断，判读是否之前有数据；使用keypress代替keydown做事件触发。
 * 之前使用keydown时，经常会出现回车之后input中输入内容不消失，而且keydown会经常跟别的组件(如：bootstrap-typeahead)发生冲突，效果总是不好。
 * 查阅相关资料，了解到keypress适合用来处理文本输入，而keydown和keyup适合用来处理快捷键。
 *
 * 后续将要进行的改进：
 * 增强可扩展性，使组件更加通用化，用起来更加方便简洁。
 *
 * Update by Lever on 2015/11/25.
 * 修改删除tag操作，之前使用pop函数导致只有在从尾部删除时是正确的，现在采用splice应对随意删除的情况。
 */

    app.directive('addTag',function(){
        return{
            restrict: 'A',
            scope:{
                selected: '=ngModel',
                tags: '=addTag'
            },
            link: function(scope,element){
                if(scope.tags){
                    for(var key in scope.tags){
                        $("#tag-container").append('<span class="tag label label-info" style="display:inline-block;width:auto;margin: 5px;background-color: #F09E84;line-height: 2em;"><span class="deptTag">'+scope.tags[key]+'</span><span style="margin-left: 10px;cursor: pointer;" class="remove-tag"><i class="fa fa-times"></i></span></span>');
                    }
                    $('.remove-tag').bind('click',function(){
                        var removeTx = $(this).prev('.deptTag').text();
                        var removeIndex = $.inArray(removeTx,scope.tags);
                        if(removeIndex >= 0){
                            scope.tags.splice(removeIndex,1);
                        }
                        $(this).parent().remove();
                    })
                }else{
                    scope.tags = [];
                }
                element.bind('keypress',function(event){
                    if(event.keyCode == 13){
                        if(scope.selected && scope.selected !== ""){
                            $("#tag-container").append('<span class="tag label label-info" style="display:inline-block;width:auto;margin: 5px;background-color: #F09E84;line-height: 2em;"><span class="deptTag">'+scope.selected+'</span><span style="margin-left: 10px;cursor: pointer;" class="remove-tag"><i class="icon-icon_close"></i></span></span>');
                            scope.tags.push(scope.selected);
                            scope.selected = "";
                            scope.$apply();
                        }
                        $('.remove-tag').bind('click',function(){
                            var removeTx = $(this).prev('.deptTag').text();
                            var removeIndex = $.inArray(removeTx,scope.tags);
                            if(removeIndex >= 0){
                                scope.tags.splice(removeIndex,1);
                            }
                            $(this).parent().remove();
                        })
                    }
                });
            }
        }
    });