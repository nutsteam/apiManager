<template>
    <div class="div-table-line" v-for="item in responseArgs">
        <template v-if="editing">
        <ul class="cb">
            <li class="col-sm-1">
                <i class="iconfont icon-close" v-on:click="removeResponseArgsRow(item,responseArgs)"></i>
                <i class="iconfont icon-tianjia" v-show="item.type &&( item.type=='object' || item.type.indexOf('array')!=-1) " v-on:click="insertResponseArgsRow(item)"></i>
            </li>
            <li class="col-sm-3 input"><input type="text" class="text name" v-model="item.name" value="{{item.name}}"></li>
            <li class="col-sm-2"><select v-model="item.require">
                <option value="false">false</option>
                <option value="true">true</option>
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
            <li class="col-sm-2 input"><input type="text" class="text" v-model="item.description" value="{{item.description}}"></li>
        </ul>
        </template>
        <template v-else>
        <ul class="cb api-row-{{responseArgs.index}}">
            <li class="col-sm-3 name">{{item.name}}</li>
            <li class="col-sm-2">{{item.require}}</li>
            <li class="col-sm-7">{{item.description}}</li>
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
                data.children.push({require:'false',children:[],type:"string"})
            }
        }
    }
</script>