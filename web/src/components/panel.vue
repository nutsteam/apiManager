<template>
    <!--<div class="row">
        <div class="col-md-12">-->
            <div class="portlet " :class="portletClass+ (sortable?' portlet-sortable':'')">
                <div class="portlet-title" :class="{'tabbable-line': tabsId.length>0}" v-if="caption || actions">
                    <div class="caption {{captionClass}}" v-if="caption">
                        <i v-if="captionIcon!=''" class="{{captionIcon}} {{captionClass}}"></i>
                        <span class="caption-subject  bold uppercase">{{title}}</span>
                        <span class="caption-helper">{{helper}}</span>
                    </div>
                    <div class="actions" v-if="actions">
                        <slot name="actions"></slot>
                    </div>
                    <div class="tools">
                        <slot name="tools"></slot>
                    </div>
                    <ul v-if="tabsId.length>0" class="nav nav-tabs">
                        <li v-for="id in tabsId" :class="{active: $index==0}">
                            <a :href="'#'+id" data-toggle="tab">{{tabsName[$index]}}</a>
                        </li>
                    </ul>
                </div>
                <div class="portlet-body">
                    <slot></slot>
                </div>
            </div>
        <!--</div>
    </div>-->
</template>

<script>
export default{
    props:{
        title:{
            type: String,
            default: ''
        },
        helper:{
            type: String,
            default: ''
        },
        caption:{
            type: Boolean,
            default: true,
        },
        actions:{
            type: Boolean,
            default: true
        },
        portletClass:{
            type: String,
            default: 'light'
        },
        sortable:{
            type: Boolean,
            default: false
        },
        captionClass:{
            type: String,
            default: ''
        },
        captionIcon:{
            type: String,
            default: ''
        },
        tabsId:{
            type: Array,
            default: function(){
                return[]
            }
        },
        tabsName:{
            type: Array,
            default: function(){
                return []
            }
        }
    }
}
</script>