<template>
    <div class="div-table-line" v-for="item in requestHeaders">
        <template v-if="editing">
        <ul class="cb">
            <li class="col-sm-1">
                <i class="iconfont icon-close" v-on:click="removeRequestHeadersRow(item,requestHeaders)"></i>
            </li>
            <li class="col-sm-3 input"><input type="text" list="headerlist" class="text name" v-model="item.name" value="{{item.name}}"></li>
            <li class="col-sm-2"><select v-model="item.require">
                <option value="true">true</option>
                <option value="false">false</option>
            </select></li>
            <li class="col-sm-4 input"><input type="text" class="text" v-model="item.description" value="{{item.description}}"></li>
            <li class="col-sm-2 input"><input type="text" class="text" v-model="item.defaultValue" value="{{item.defaultValue}}"></li>
        </ul>
        </template>
        <template v-else>
        <ul class="cb">
            <li class="col-sm-2 name">
                <template v-if="item.type &&( item.type=='object' || item.type.indexOf('array')!=-1)">
                    <i class="iconfont icon-my open" v-on:click="apiArgsColumnFold($event)"></i>
                </template>
                {{item.name}} </li>
            <li class="col-sm-1"> {{item.require || 'false' }} </li>
            <li class="col-sm-7"> {{item.description}} </li>
            <li class="col-sm-2"> {{item.defaultValue}} </li>
        </ul>
        </template>

        <div class="sub">
            <request-headers-vue v-bind:request-headers.sync="item.children" v-bind:editing="editing"></request-headers-vue>
        </div>
    </div>
</template>
<script>
    export default{
        methods: {
            removeRequestHeadersRow: function (item, dom) {
                dom.$remove(item)
            },
            insertRequestHeadersRow(dom){
                dom.children.push({require: 'true',type:'string', children: []});
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