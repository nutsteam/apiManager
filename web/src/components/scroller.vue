<template>
    <div class="scroller" :style="{height: height+'px'}" :data-always-visible="alwaysScrollbar?'1': '0'" data-rail-visible="1" :data-rail-color="railColor" :data-handle-color="handleColor">
        <slot></slot>
    </div>
</template>
<script>
export default{
    props:{
        height:{
            type: Number,
            default: 300
        },
        railColor:{
            type: String,
            default: ''
        },
        handleColor:{
            type: String,
            default: ''
        },
        alwaysScrollbar:{
            type: Boolean,
            default: false
        }
    },
    ready(){
        Metronic.initScrollers()
    }
}
</script>