<template>
<div class="db-view-quit">
   <button class="btn btn-danger" v-on:click="ok" style="padding: 10px 100px;">退出项目</button>
</div>
</template>
<script>
   import utils from '../../src/utils.js'
   export default {
      data:function(){
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
            /*utils.get('/project/'+this.$route.params.id+'/info.json',{},function(rs){
               self.project=rs.data.project;
            });*/
            self.$parent.projectId=this.$route.params.id;
         }
      },
      methods:{
         ok(){
            utils.delete('/project/'+this.$route.params.id+'/quit.json',function(){
               toastr.success('操作成功');
            })
         }
      }
   }
</script>