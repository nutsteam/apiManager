<template>
<div>
    <query @query:action="query" v-if="query">
        <slot name="query"></slot>
    </query>

    <v-table @table:load="loadTable" :filter="filter" :size="size" :paging="paging" :url="url">
        <slot>

        </slot>
    </v-table>
</div>
</template>
<script>
import VTable from './table.vue'
import Query from './query.vue'

export default{
    props:{
        url:{
            type: String
        },
        query:{
            type: Boolean,
            default: false
        },
        size:{
            type: Number,
            default: 10
        },
        paging:{
            type: Boolean,
            default: true
        },
        filter:{
            type: Object,
            default: function(){
                return{}
            }
        }
    },
    components:{
        VTable,
        Query
    },
    data(){
        return{
        }
    },
    methods:{
        query(data){
            this.filter = data
        },
        loadTable(data){
            this.$emit('querytable:load', data)
        }
    }
}
</script>