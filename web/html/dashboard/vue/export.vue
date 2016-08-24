<template>
<div class="db-export">
    <ul class="cb">
        <li><i class="iconfont icon-excel"></i> <p>导出EXCEL</p></li>
        <li><i class="iconfont icon-json"></i> <p>导出JSON</p></li>
        <li><i class="iconfont icon-sql"></i> <p>导出SQL</p></li>
    </ul>
</div>
</template>

<script>
    export default {
        data(){
            return {
                project:{}
            }
        },
        route:{
            activate:function(){
                this.$parent.showProject=true;
            },
            deactivate:function(){
                this.$parent.showProject =false;
            },
            data(){
                var self = this;
                utils.get('/project/'+this.$route.params.id+'/info.json',{},function(rs){
                    self.project=rs.data.project;
                });
                self.$parent.projectId=this.$route.params.id;
            }
        }
    }
</script>