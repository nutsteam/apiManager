<template>
<div class="form db-view-form">
    <template v-if="!loading">
    <validator name="form">
    <div class="item">
        <div class="col-sm-2 label">项目名称</div>
        <div class="col-sm-10">
            <input type="text" v-model="project.name" v-validate:project-name="['required']" maxlength="20" class="text invalid" placeholder="请输入项目名称">
            <div class="tip"  v-if="$form.projectName.invalid">{{$form.projectName.errors[0].message}}</div>
        </div>
    </div>
    <div class="item">
        <div class="col-sm-2 label">项目描述</div>
        <div class="col-sm-10">
            <textarea rows="10" placeholder="请输入项目描述" maxlength="300" class="text" v-model="project.description">{{project.description}}</textarea>
        </div>
    </div>
    <div class="item">
        <div class="col-sm-2 label">项目公开性</div>
        <div class="col-sm-10">
            <p><input type="radio" name="permission" v-model="project.permission" value="PRIVATE" id="dvnr-private"> <label for="dvnr-private">私有项目（只有加入项目后的成员才能看见）</label></p>
            <p><input type="radio" name="permission" v-model="project.permission" id="dvnr-public" value="PUBLIC"> <label for="dvnr-public">公开项目（所有用户均能看见）</label></p>
            <div class="tip"></div>
        </div>
    </div>
    <div class="item">
        <div class="col-sm-2 label"></div>
        <div class="col-sm-3">
            <input type="submit" value="确认" v-on:click="ok" class="btn btn-primary biggest">
        </div>
    </div>
    </validator>
    </template>
    <template v-if="loading">
        <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>
    </template>
</div>
</template>
<script>
    import '../../src/vue.ex.js';
    import utils from '../../src/utils.js'
    var data={
        project:{},
        loading:true,
        projectName:null
    };
    export default{
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
                },function(){
                    self.loading=false;
                });
                self.$parent.projectId=this.$route.params.id;
            }
        },
        data:function(){
            return data;
        },
        methods:{
            ok(){
                var project=this.project;
                var self = this;
                utils.post('/project/'+this.project.id+".json",this.project,function(rs){
                    self.project = project;
                   toastr.success('修改成功');
                })
            }
        }
    }
</script>