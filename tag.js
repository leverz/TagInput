/**
 * Created by Lever on 2015/9/24.
 *
 * Update by Lever on 2015/11/24.
 *
 * ʹ��˵��:
 *ҳ������Ҫ�ƶ�
 *       <input ng-model="selected" add-tag="Array"/>
 *       <div id="tag-container></div>
 *
 * �س���ȷ�����룬��ǩ��ʾ��tag-container�С�
 * �Ľ�֮�󣬼�����Ԥ�жϣ��ж��Ƿ�֮ǰ�����ݣ�ʹ��keypress����keydown���¼�������
 * ֮ǰʹ��keydownʱ����������ֻس�֮��input���������ݲ���ʧ������keydown�ᾭ����������(�磺bootstrap-typeahead)������ͻ��Ч�����ǲ��á�
 * ����������ϣ��˽⵽keypress�ʺ����������ı����룬��keydown��keyup�ʺ����������ݼ���
 *
 * ������Ҫ���еĸĽ���
 * ��ǿ����չ�ԣ�ʹ�������ͨ�û������������ӷ����ࡣ
 *
 * Update by Lever on 2015/11/25.
 * �޸�ɾ��tag������֮ǰʹ��pop��������ֻ���ڴ�β��ɾ��ʱ����ȷ�ģ����ڲ���spliceӦ������ɾ���������
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