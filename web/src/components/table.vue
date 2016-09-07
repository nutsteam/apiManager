<template>
<div :id="id">
    <div class="table-scrollable " >
        <slot>

        </slot>
    </div>

    <div class="row">
        <div class="col-md-5 col-sm-5">
            <div class="dataTables_info" role="status" aria-live="polite">{{tableInfo}}</div>
        </div>
        <div class="col-md-7 col-sm-7">
            <div class="dataTables_paginate paging_bootstrap_full_number">
                
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {IO} from '../util/io'
import toast from '../util/toast'

export default{
    props:{
        tablehead:{
            type: Array
        },
        url:{
            type: String,
            required: true
        },
        filter:{
            type: Object,
            default: function(){
                return {}
            }
        },
        size:{
            type: Number,
            default: 10
        },
        paging:{
            type: Boolean,
            default: true
        },
        total:{
            type: Number,
            default: 0,

        }
    },
    data(){
        return{
            pagingTemplate: require('ejs!../template/table_paging.ejs'),
            tableInfo: '',
            tablePaginate: '',
            io: new IO({url: this.url}),
            page: 1,
            pages: 0,
            // total: 0,
            resData: {},
            id: new Date().getTime(),
        }
    },
    created(){

    },
    ready(){
        console.log(this.io)

        this.load()

        this.events()
    },
    methods:{
        loadFooter(){
            if(this.paging){
                this.tableInfo = `第${this.page} / ${this.pages}页 共${this.total}条`
                this.tablePaginate = this.pagingTemplate({page: this.page, pages: this.pages})

                $('#'+this.id+' .dataTables_paginate').html(this.pagingTemplate({page: this.page, pages: this.pages}))
            }else{
                if(this.total) this.tableInfo = `共${this.total}条`
            }
        },
        load(){
            console.log(this.filter)

            if(this.paging){
                this.filter['limit'] = this.size
                this.filter['page'] = this.page
            }

            Metronic.blockUI({
                target: '#'+this.id+' .table-scrollable',
                animate: true
            });

            //this.$dispatch() 
            this.url && this.io.get(this.filter, (res)=>{
                if(res.code == 0){
                    this.resData = res.data
                    

                    setTimeout(()=>{
                        this.$emit('table:load', this.resData)

                        Metronic.unblockUI('#'+this.id+' .table-scrollable')
                    },200)
                    

                    if(this.paging) {
                        this.total = res.data.paging.total
                        this.pages = this.total % this.size == 0 
                            ? parseInt(this.total / this.size) 
                            : parseInt(this.total / this.size) + 1
                        
                    }
                    this.loadFooter()
                }else{
                    toast('warning', res.msg, '加载失败')
                    Metronic.unblockUI('#'+this.id+' .table-scrollable')
                }
            },(err)=>{
                toast('error', err, '加载失败')
                Metronic.unblockUI('#'+this.id+' .table-scrollable')
            })
        },
        events(){
            const _this = this;
        
            $('#'+this.id).on('click', '.pagination a', function(){
                if(!$(this).parent().hasClass('disabled')){
                    let title = $(this).attr('title');

                    if(title){
                        switch(title){
                            case 'First':
                                _this.page = 1;
                                _this.load();
                                break;
                            case 'Prev':
                                _this.page--;
                                _this.load();
                                break;
                            case 'Next':
                                _this.page++;
                                _this.load();
                                break;
                            case 'Last':
                                _this.page = _this.pages;
                                _this.load();
                                break;
                        }
                    }else{
                        let page_str = $(this).html();
                        if(page_str){
                            _this.page = parseInt(page_str);
                            console.log('$$$$$$$')
                            console.log()
                            _this.load();
                        }
                    }
                }
            });
        },
    },
    watch:{

        'filter': function(val){
            console.log('watch')
            console.log(val)

            this.load()
        },

        total(val){
            // if(val) this.tableInfo = `共${val}条`
            this.loadFooter()
        }
    }
}
</script>