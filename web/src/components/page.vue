<template>
    <div class="page-sidebar-wrapper">
        <div class="page-sidebar navbar-collapse collapse">
            <navbar :path="pathName"></navbar>
        </div>
    </div>
    <div class="page-content-wrapper">
        <div class="page-content" :style="{'height':contentHeight+'px','min-height':contentHeight+'px'}">
            <div v-if="pageShow" class="page-block" transition="expand">
                    <slot>

                    </slot>
                
                <div style="height:40px;"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from './navbar.vue'

export default{
    components:{
        Navbar
    },
    props:{
        pathName:{
            type: String,
            required: true
        }
    },
    events:{
        block(){
            Metronic.blockUI({
                target: '.page-block',
                animate: true
            });
        },

        unblock(){
            Metronic.unblockUI('.page-block')
        }
    },
    data(){
        return{
            contentHeight: 0,
            pageShow: false
        }
    },
    created(){
        this.contentHeight = $(document).height() - 68 - 33
    },
    ready(){

        this.pageShow = true

        this.$nextTick(()=>{
            Metronic.init();
            Layout.init();
        })
    }
}
</script>

<style>

body{
    background: #F1F3FA !important;
}

.page-content-wrapper .page-content{
    padding: 0;
    position: relative;
    
}

.page-content-wrapper .page-content .page-block{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 25px 20px 10px 20px;
    
}

.page-sidebar.navbar-collapse.collapse{
    height: 100% !important;
    background: #26344B;
}

/* 必需 */
.expand-transition {
    transition: all 0.6s ease-out;
    opacity: 1;
    transform: scale(1);
    -webkit-transform: scale(1);
}

/* .expand-enter 定义进入的开始状态 */
/* .expand-leave 定义离开的结束状态 */
.expand-enter, .expand-leave {
    opacity: 0;
    transform: scale(.9);
    -webkit-transform: scale(.9);
}
</style>