<template>
    <ul class="page-sidebar-menu page-sidebar-menu-compact " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="300">

        <li v-for="navItem in navData" :class="{start: $index==0, active: isActive(navItem),  open: isActive(navItem)}">
            <a href="javascript:;" v-if="!navItem.children"  v-link="{name: navItem.link}">
                <i :class="navItem.icon"></i>
                <span class="title">{{navItem.name}}</span>
                <span class="selected" v-if="isActive(navItem)" ></span>
            </a>
            <a href="javascript:;" v-else>
                <i :class="navItem.icon"></i>
                <span class="title">{{navItem.name}}</span>
                <span class="arrow " :class="{open: isActive(navItem)}"></span>
                <span class="selected" v-if="isActive(navItem)" ></span>
            </a>
            <ul v-if="navItem.children" class="sub-menu" :style="'display:'+isActive(navItem)?'block':'none'">
                <li v-for="navItem1 in navItem.children" :class="{active: isActive(navItem1), open: isActive(navItem1)}">
                    <a href="javascript:;" v-if="!navItem1.children"  v-link="{name: navItem1.link}">
                        <i :class="navItem1.icon"></i>
                        <span class="title">{{navItem1.name}}</span>
                        <span class="selected" v-if="isActive(navItem1)" ></span>
                    </a>
                    <a href="javascript:;" v-else>
                        <i :class="navItem1.icon"></i>
                        <span class="title">{{navItem1.name}}</span>
                        <span class="arrow " :class="{open: isActive(navItem1)}"></span>
                    </a>
                    <ul v-if="navItem1.children" class="sub-menu" :style="'display:'+isActive(navItem1)?'block':'none'">
                        <li v-for="navItem2 in navItem1.children" :class="{active: isActive(navItem2), open: isActive(navItem2)}">
                            <a href="javascript:;" v-if="!navItem2.children"  v-link="{name: navItem2.link}">
                                <i :class="navItem2.icon"></i>
                                {{navItem2.name}}
                                <span class="selected" v-if="isActive(navItem2)" ></span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
        <!--<li>
            <a href="javascript:;">
                <i class="icon-folder"></i>
                <span class="title">Multi Level Menu</span>
                <span class="arrow "></span>
            </a>
            <ul class="sub-menu">
                <li>
                    <a href="javascript:;">
                        <i class="icon-settings"></i> Item 1 <span class="arrow"></span>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <a href="javascript:;">
                            <i class="icon-user"></i>
                            Sample Link 1 <span class="arrow"></span>
                            </a>
                            <ul class="sub-menu">
                                <li>
                                    <a href="#"><i class="icon-power"></i> Sample Link 1</a>
                                </li>
                                <li>
                                    <a href="#"><i class="icon-paper-plane"></i> Sample Link 1</a>
                                </li>
                                <li>
                                    <a href="#"><i class="icon-star"></i> Sample Link 1</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i class="icon-camera"></i> Sample Link 1</a>
                        </li>
                        <li>
                            <a href="#"><i class="icon-link"></i> Sample Link 2</a>
                        </li>
                        <li>
                            <a href="#"><i class="icon-pointer"></i> Sample Link 3</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:;">
                        <i class="icon-globe"></i> Item 2 <span class="arrow"></span>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <a href="#"><i class="icon-tag"></i> Sample Link 1</a>
                        </li>
                        <li>
                            <a href="#"><i class="icon-pencil"></i> Sample Link 1</a>
                        </li>
                        <li>
                            <a href="#"><i class="icon-graph"></i> Sample Link 1</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                    <i class="icon-bar-chart"></i>
                    Item 3 </a>
                </li>
            </ul>
        </li>-->
    </ul>
</template>
<script>
import {IO} from '../util/io'

export default{
    props:{
        path:{
            type: String,
            default: ''
        }
    },
    data(){
        return{
            navData:[],
            navFlag : false,
        }
    },
    ready(){

        let si = setInterval(()=>{
            if(window.localStorage.getItem('navData')){
                this.navData = JSON.parse(window.localStorage.getItem('navData'))
                clearInterval(si)
            }
        },10)
    },
    methods:{
        isActive(nav){
            console.log('####'+this.link)
           
            if(nav.link){
                console.log(nav.name)
                if(nav.link == this.path){
                    console.log('true')
                    return true
                }else{
                    console.log('false')
                    return false
                }
            }

            else{
                console.log('``````````````````````````')
                

                for(let i=0;i<nav.children.length;i++){ //二级菜单
                    if(nav.children[i].link){
                        console.log(nav.name)
                        if(nav.children[i].link == this.path){
                            console.log('true')
                            return true
                        }else{
                            console.log('false')
                            // return false
                        }
                    }else{
                        for(let j=0;j<nav.children[i].children.length;j++){ //三级菜单
                            if(nav.children[i].children[j].link){

                                if(nav.children[i].children[j].link == this.path){
                                    return true
                                }else{
                                    
                                }
                                
                            }
                            
                        }
                    }
                }

                return false
            }
        }
    }
}
</script>