<template>
<div class="row" :id="id">
    <div v-for="c in column" class="col-md-{{col}} column sortable">
        <slot :name="$index+1"></slot>
        <div class="portlet portlet-sortable-empty">
        </div>
    </div>
</div>
</template>

<script>
export default{
    props:{
        column:{
            type: Number,
            default: 0
        },
        id:{
            type: String,
            default: 'sortable_portlets'
        }
    },
    computed:{
        col(){
            return parseInt(12/this.column)
        }
    },
    ready(){
        $("#"+this.id).sortable({
            connectWith: ".portlet",
            items: ".portlet", 
            opacity: 0.8,
            handle : '.portlet-title',
            coneHelperSize: true,
            placeholder: 'portlet-sortable-placeholder',
            forcePlaceholderSize: true,
            tolerance: "pointer",
            helper: "clone",
            tolerance: "pointer",
            forcePlaceholderSize: !0,
            helper: "clone",
            cancel: ".portlet-sortable-empty, .portlet-fullscreen", // cancel dragging if portlet is in fullscreen mode
            revert: 250, // animation in milliseconds
            update: function(b, c) {
                if (c.item.prev().hasClass("portlet-sortable-empty")) {
                    c.item.prev().before(c.item);
                }                    
            }
        });
    }
}
</script>