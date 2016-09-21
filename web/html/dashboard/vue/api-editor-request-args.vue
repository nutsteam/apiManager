<template>
    <div class="div-table-line" v-for="item in requestArgs">
        <template v-if="editing">
        <ul class="cb">
            <li class="col-sm-1">
                <i class="iconfont icon-close" v-on:click="removeRequestArgsRow(item,requestArgs)"></i>
                <i class="iconfont icon-tianjia" v-show="item.type && ( item.type.indexOf('object')!=-1) " v-on:click="insertRequestArgsRow(item,requestArgs.index+1)"></i>
            </li>
            <li class="col-sm-3 input">
                <input type="text" list="requestlist" class="text name" v-model="item.name" value="{{item.name}}">
            </li>
            <li class="col-sm-2"><select v-model="item.require">
                <option value="true">true</option>
                <option value="false">false</option>
            </select></li>
            <li class="col-sm-2">
                <select v-model="item.type">
                    <option value="string">string</option>
                    <option value="number">number</option>
                    <option value="object">object</option>
                    <option value="array">array</option>
                    <option value="array[number]">array[number]</option>
                    <option value="array[boolean]">array[boolean]</option>
                    <option value="array[string]">array[string]</option>
                    <option value="array[object]">array[object]</option>
                    <option value="array[array]">array[array]</option>
                    <option value="file">file</option>
                </select>
            </li>
            <li class="col-sm-2 input">
                <input type="text" class="text" v-model="item.description" value="{{item.description}}">
            </li>
            <li class="col-sm-2 input"><input type="text" class="text" v-model="item.defaultValue" value="{{item.defaultValue}}"></li>
        </ul>
        </template>
        <template v-else>
            <ul class="cb">
                <li class="col-sm-2 name">
                    <template v-if="item.type &&(item.type.indexOf('object')!=-1)">
                        <i class="iconfont icon-my open" v-on:click="apiArgsColumnFold($event)"></i>
                    </template>
                    {{item.name}} </li>
                <li class="col-sm-1"> {{item.require || 'false'}} </li>
                <li class="col-sm-1"> {{item.type}} </li>
                <li class="col-sm-6"> {{item.description}} </li>
                <li class="col-sm-2"> {{item.defaultValue}} </li>
            </ul>
        </template>
        <div class="sub">
            <request-args-vue v-bind:request-args="item.children" v-bind:editing="editing"></request-args-vue>
        </div>
    </div>
</template>
<script>
    export default{
        methods:{
            removeRequestArgsRow:function(item,data){
                data.$remove(item)
            },
            insertRequestArgsRow(dom,index){
                //console.log(dom)
                dom.children.index = index;
                dom.children.push({require:'true',type:'string',children:[]})
            },
            apiArgsColumnFold:function(e){
                var $dom = $(e.target);
                var $next =$(e.target).parent().parent().next();
                if($dom.hasClass('open')){
                    $dom.removeClass('open');
                    $next.slideUp();
                }else{
                    $dom.addClass('open');
                    $next.slideDown();
                }
            }
        }
    }
</script>