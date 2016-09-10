<template>
<div class="db-view-release">
      <button class="btn btn-danger" v-on:click="status.deleteModal=true" style="padding: 10px 100px;">删除项目</button>
   <div class="modal" v-cloak v-if="status.deleteModal">
      <div class="modal-header">
         <i class="iconfont icon-close modal-close" v-on:click="status.deleteModal=false"></i>
      </div>
      <div class="modal-content">
         <div class="modal-layout1 form">
               <p class="title">删除项目</p>
               <input type="text" class="k1 text" id="projectName" v-bind:class="{'invalid':isOk}" maxlength="20" initial="off"
                      v-model="projectName"
                      autofocus="autofocus"
                      tabindex="1" placeholder="请输入项目名称">
            <div class="tip">项目名称错误</div>
            <div class="ta-c actions">
               <button class="btn btn-default-box middle" tabindex="3" v-on:click="status.deleteModal=false">取消
               </button>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <button class="btn btn-danger middle" v-on:click="ok" tabindex="2">确定</button>
            </div>
         </div>
      </div>
   </div>
</div>
</template>

<script>
   import utils from '../../src/utils.js'
   export default {
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
      },
      data:function(){
         return {
            isOk:false,
            project:null,
            projectName:'',
            status:{
               deleteModal:false
            }
         }
      },
      watch:{
         "status.deleteModal":function(value){
            if(value){
               setTimeout(function(){
                  $("#projectName").focus();
               },100);
            }
         }
      },
      methods:{
         ok(){
            var project= this.project;
            var id = project.id;
            var self =this;
            if(project.name == this.projectName){
               utils.delete('/project/'+id+'.json',function(rs){
                  toastr.success('删除成功');
                  self.$route.router.go({path:'/'})
                  self.$parent.reloadProject=true;
               })
            }else{
                 this.isOk= true;
            }
         }
      }
   }
</script>