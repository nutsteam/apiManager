<template>
<div class="db-export">
    <ul class="cb">
        <li v-on:click="pdf" id="export-pdf"><i class="iconfont icon-pdf"></i> <p>导出PDF</p></li>
        <!--<li><i class="iconfont icon-json"></i> <p>导出JSON</p></li>-->
        <!--<li><i class="iconfont icon-sql"></i> <p>导出SQL</p></li>-->
    </ul>
</div>
</template>

<script>
    import utils from '../../src/utils.js';
    export default {
        data(){
            return {
                project:null
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
                _czc.push(["_trackEvent",'接口','导出']);
            }
        },
        methods:{
            pdf:function(){
                if(this.project){
                    _czc.push(["_trackEvent",'接口','导出',this.project.name,this.project.id,'export-pdf']);
                    location.href=utils.config.root+'/project/'+this.project.id+'/export.pdf?token='+utils.token();
                }
            }
        }
    }
</script>