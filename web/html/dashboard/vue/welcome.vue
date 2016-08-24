<template>
<div class="db-welcome">
    welcome!!!!
</div>
</template>
<script>
    export default{
        route:{
            activate: function (transition) {
                console.log('hook-example activated!')
                this.$parent.$data.welcome = true;
                this.$parent.pageName ='';
                //setTimeout(transition.next, 1000)
                transition.next();
            },
            deactivate: function (transition) {
                console.log('hook-example deactivated!')
                //this.$parent.$data.welcome = '11';
                transition.next();
                //setTimeout(transition.next, 3000)
            }
        }
    }
</script>