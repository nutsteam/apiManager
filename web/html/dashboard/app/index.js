import Vue from 'vue'
import Router from 'vue-router'
import RouteConfig from './route.config'
import utils from '../../src/utils'
import ProjectLeft from '../vue/project-left.vue'
import ProjectNav from '../vue/project-nav.vue'


Vue.use(Router);

const router = window.router = new Router({
    root:utils.config.ctx+'/dashboard',
    history:utils.config.vue.history
});
router.map(RouteConfig);
Vue.config.debug = true;
var App = Vue.extend({
    methods:{
    }
});
ProjectNav.props=['pageName','welcome','projectId'];
ProjectLeft.props=["reloadProject"];
router.start({
    created:function(){
        this.loading=false;
    },
    data:function(){
        return {
            loading:true,
            pageName:'',
            welcome:false,
            showProject:false,
            projectId:null,
            reloadProject:false
        }
    },
	components:{
		App,ProjectLeft,ProjectNav
	}
}, '#dashboard');
var evt =document.createEvent('Event');
evt.initEvent('route.click',true,false);
router.afterEach(function(transition){
    document.dispatchEvent(new CustomEvent('route.click',{detail:{path:transition.to.path}}));
});
