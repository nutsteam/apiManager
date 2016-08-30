<template>
<div class="db-welcome">
    welcome!
</div>
</template>
<script>
    export default{
        route:{
            activate: function (transition) {
                this.$parent.$data.welcome = true;
                this.$parent.pageName ='';
                transition.next();
            },
            deactivate: function (transition) {
                transition.next();
            }
        }
    }
</script>