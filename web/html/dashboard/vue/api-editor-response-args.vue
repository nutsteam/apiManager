<template>
    <div class="div-table-line" v-for="item in responseArgs">
        <template v-if="editing">
        <ul class="cb">
            <li class="col-sm-1">
                <i class="iconfont icon-close" v-on:click="removeResponseArgsRow(item,responseArgs)"></i>
                <i class="iconfont icon-tianjia" v-show="item.type &&( item.type.indexOf('object')!=-1) " v-on:click="insertResponseArgsRow(item)"></i>
            </li>
            <li class="col-sm-3 input"><input type="text" list="responselist" class="text name" v-model="item.name" value="{{item.name}}"></li>
            <li class="col-sm-2"><select v-model="item.require">
                <option value="true">true</option>
                <option value="false">false</option>
            </select></li>
            <li class="col-sm-2">
                <select v-model="item.type">
                    <option value="string">string</option>
                    <option value="number">number</option>
                    <option value="boolean">boolean</option>
                    <option value="object">object</option>
                    <option value="array">array</option>
                    <option value="array[number]">array[number]</option>
                    <option value="array[boolean]">array[boolean]</option>
                    <option value="array[string]">array[string]</option>
                    <option value="array[object]">array[object]</option>
                    <option value="array[array]">array[array]</option>
                </select>
            </li>
            <li class="col-sm-4 input"><input type="text" class="text" v-model="item.description" value="{{item.description}}"></li>
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
            <li class="col-sm-2"> {{item.type}} </li>
            <li class="col-sm-7"> {{item.description}} </li>
        </ul>
        </template>

        <div class="sub">
            <response-args-vue v-bind:response-args="item.children" v-bind:editing="editing"></response-args-vue>
        </div>
    </div>
</template>
<script>
    export default{
        methods:{
            removeResponseArgsRow:function(item,data) {
                data.$remove(item);
            },
            insertResponseArgsRow:function(data){
                data.children.push({require:'true',children:[],type:"string"})
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