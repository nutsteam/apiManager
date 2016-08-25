<template>
<form class="form-inline margin-bottom-20 query-form" :id="'form-'+id"  role="form">
    <slot></slot>
    <button type="button" class="btn btn-info" @click="query"><i class="fa fa-search"></i>查询</button>
</form>
</template>
<script>
import {formToData} from '../util/fun'

export default{
    data(){
        return {
            id: new Date().getTime()
        }
    },
    methods:{
        query(){
            console.log(this.getFilterData())

            this.$dispatch('query:action', this.getFilterData())
        },
        getFilterData(){
            let formData = formToData('#form-'+this.id)
            
            let nd = {}
            
            for(let i in formData){
                if(formData[i]){
                    nd[i] = formData[i]
                }
            }
            
            return nd
        }
    }
}
</script>

<style lang="sass">
.query-form{
    .form-group{
        margin-bottom: 10px;
    }

    .btn{
        vertical-align: top;
    }
}
</style>