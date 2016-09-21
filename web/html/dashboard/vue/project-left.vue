<template>
    <div class="db-left-content dlc1 bg">
        <div class="ta-c logo"><a v-link="'/'"><img src="../../assets/img/logo/full.png"></a></div>
        <div class="dbl-projects hide">
            <div class="db-left-search">
                <div class="cb">
                    <div class="fl"><i class="iconfont icon-sousuo"></i></div>
                    <div class="fl">
                        <input type="text" v-model="filter" value="{{filter}}" placeholder="快速查找项目">
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <br/>
            <ul>
                <li class="db-item"><a v-link="{path:'/add'}" class="bd-add">
                    <i class="iconfont icon-add-circle"></i>创建项目</a></li>
                <li class="line"></li>
                <li class="bd-project-title">我的项目</li>
                <li class="db-item" v-for="item in projects | filterBy filter in 'name'">
                    <a v-link="{ path: '/project/'+item.id,params:{name:item.name}}"><i class="iconfont icon-projects"></i>{{item.name}}</a>
                </li>
            </ul>
        </div>
        <div class="dbl-userinfo">
            <br/>
            <br/>
            <br/>
            <br/>
            <ul>
                <li class="db-item">
                    <a v-link="{ path: '/profile'}"><i class="iconfont icon-projects"></i>个人信息</a>
                </li>
                <li class="db-item">
                    <a v-link="{ path: '/profile/security'}"><i class="iconfont icon-safe"></i>安全设置</a>
                </li>
                <li class="db-item">
                    <a v-link="{ path: '/profile/relation'}"><i class="iconfont icon-relation"></i>关联账户</a>
                </li>
                <li class="db-item">
                    <a v-on:click.stop.prevent="logout"><i class="iconfont icon-logout"></i>退出登录</a>
                </li>

            </ul>
        </div>
    </div>
    <div class="dlc2 bg">
        <div class="db-left-bar">
            <div class="logo ta-c"><a v-link="'/'"><img src="../../assets/img/logo/full-white.png"></a></div>
            <br/>
            <br/>
            <br/>
            <ul>
                <li class="db-item ta-c"><a  v-link="{path:'/add'}"><i class="iconfont icon-add-circle"></i></a></li>
                <li class="db-item ta-c" v-on:click="showContent=!showContent"><a><i class="iconfont icon-projects" v-bind:class="{'active':showContent}"></i></a></li>
            </ul>
        </div>

        <div class="db-left-content" v-show="showContent">
            <div class="ta-c logo"><a href="/"><img src="../../assets/img/logo/full.png"></a></div>
            <div class="db-left-search">
                <div class="cb">
                    <div class="fl"><i class="iconfont icon-sousuo"></i></div>
                    <div class="fl">
                        <input type="text" placeholder="快速查找项目" value="{{filter}}" v-model="filter">
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <br/>
            <ul>
                <li class="db-item"><a v-link="{path:'/add'}" class="bd-add"><i
                        class="iconfont icon-add-circle"></i>创建项目</a></li>
                <li class="line"></li>
                <li class="bd-project-title">我的项目</li>
                <li class="db-item" v-for="item in projects | filterBy filter in 'name'">
                    <a v-link="{ path: '/project/'+item.id,params:{name:item.name}}" v-on:click="showContent=false"><i class="iconfont icon-projects"></i>{{item.name}}</a>
                </li>
            </ul>
        </div>
        <div class="db-left-layer" v-bind:class="{'hide':!showContent}" v-on:click="showContent=false" ></div>
    </div>
</template>
<script>
    import utils from '../../src/utils.js';
    var data={
        showContent:false,
        projects:[],
        filter:''
    };
    function load(self){
        utils.get('/project/list.json',{},function(rs){
            data.projects=rs.data.projects;
        },null,function(rs){
            if (location.href.indexOf('/project/demo') != -1)
                return true;
            return false;
        });
    }
    export default{
        data: function () {
            return data;
        },
        created:function(){
            load(this);
        },
        watch:{
            "reloadProject":function(value){
                if(value){
                    load(this);
                    this.reloadProject = false;
                }
            }
        },
        methods: {
            logout:function(){
                utils.logout();
            }
        }
    }
</script>