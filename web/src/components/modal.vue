<template>
    <div :id="id" class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" :style="{width: width?width+'px':'',top:top?top+'px':''}">
            <div class="modal-content">
                <form :id="id+'-form'">
                    <div class="modal-header {{headStyle}}"  v-if="head">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                        <h4 class="modal-title">{{title}}</h4>
                    </div>
                    <div class="modal-body ">
                        <div class="form">
                            <slot></slot>
                        </div>
                    </div>
                    <div class="modal-footer" v-if="type!=''">
                        <button type="button" data-dismiss="modal" class="btn default" v-if="type=='detail'">关闭</button>

                        <button type="button" data-dismiss="modal" class="btn default" v-if="type=='edit'">取消</button>
                        <button type="submit"  class="btn btn-primary" @click="save" v-if="type=='edit'">保存</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import * as fun from '../util/fun'

export default{
    props:{
        title:{
            type: String
        },
        id:{
            type: String,
            required: true
        },
        width:{
            type: Number,
            default: 0
        },
        top:{
            type:Number,
            default: 0
        },
        type:{
            type: String,
            default: ''
        },
        head:{
            type: Boolean,
            default: true
        },
        show:{
            type: Boolean,
            default: false,
            twoWay: true
        },
        saveing:{
            type: Boolean,
            default: false,
            twoWay: true
        },
        rules:{
            type: Object,
            default: function(){
                return {}
            }
        },
        messages:{
            type: Object,
            default: function(){
                return {}
            }
        },
        headStyle:{
            type: String,
            default: ''
        }
    },
    data(){
        return{
            height: 0,
            bodyHeight: 200,
        }
    },
    methods:{
        save(){
            this.saveing = true

            let _this = this

            $('#'+this.id+'-form').validate({
                errorElement: 'span',
                errorClass: 'help-block',
                focusInvalid: false,
                rules: _this.rules,
                messages: _this.messages,
                invalidHandler: function (event, validator) {
                    console.log('error');
                    _this.saveing = false
                },
                highlight: function (element) { 
                    $(element)
                        .closest('.form-group').addClass('has-error'); 
                    $(element).addClass('edited')
                },
                unhighlight: function (element) {
                    $(element)
                        .closest('.form-group').removeClass('has-error'); 
                    $(element).removeClass('edited')
                },
                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); 
                    
                },
                submitHandler: function (form) {
                    let data = fun.formToData('#'+_this.id+'-form')

                    setTimeout(()=>{
                        _this.$dispatch('save', data)
                    },200)
                }
            })
        }
    },
    ready(){
        // Metronic.initScrollers()

        $('#'+this.id).on('hide.bs.modal', ()=>{
            this.show = false
        })
    },
    watch:{
        show(val){
            console.log(val)

            if(val == true){
                $('#'+this.id).modal('show')
            }else{
                $('#'+this.id).modal('hide')
            }
        },
        saveing(val){
            console.log('saveing:'+val)
            if(val==true){
                Metronic.blockUI({
                    target: '#'+this.id+' .modal-footer',
                    // animate: true
                    textOnly: true,
                    message: '保存中...'
                });
            }else{
                Metronic.unblockUI('#'+this.id+' .modal-footer')
            }
        }
    }
}
</script>

<style lang="sass">
.modal{
    &.fade {
        .modal-dialog{

            -webkit-transform: translate(0,0);
            -ms-transform: translate(0,0);
            -o-transform: translate(0,0);
            transform: translate(0,0);
        }
    }

    &.fade.in{
        -webkit-transform: translate(0,0);
        -ms-transform: translate(0,0);
        -o-transform: translate(0,0);
        transform: translate(0,0);
    }

    .modal-header{
        /*background: #17C4BB;*/
        /*color: #fff;*/
        padding: 10px 15px;
        font-weight:bold;

        &.success{
            background: #26A69A;
            color: #fff;
        }
        &.primary{
            background: #00BCD4;
            color: #fff;
        }
        &.info{
            background: #89C4F4;
            color: #fff;
        }
        &.warning{
            background: #ff5722;
            color: #fff;
        }
        &.danger{
            background: #F3565D;
            color: #fff;
        }
        &.default{
            background: #d4d4d4;
        }
    }

    .modal-footer{
        border-top: 1px solid #e5e5e5 !important;
    }

    .close{

    }

    &.bootbox{
        background: rgba(0, 0, 0, 0.18);

        .modal-dialog{
            width: 350px;
            margin-top: 100px;
        }
        
    }
}
</style>