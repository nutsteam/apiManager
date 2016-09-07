<template>
    <form :class="className" role="form" :id="id" onSubmit="return false;">
        <slot></slot>
    </form>
</template>
<script>
import * as fun from '../util/fun'

export default{
    props:{
        className:{
            type: String
        },
        submit:{
            type: Boolean,
            default: false,
            twoWay: true
        },
        id:{
            type:String,
            required: true
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
        animate:{
            type: Boolean,
            default: true
        }
    },
    watch:{
        submit(val){
            console.log('submit:'+val)
            if(val){
                if(this.animate){
                    Metronic.blockUI({
                        target: '#'+this.id,
                        animate: true
                    });
                }

                this.submitHandle()
            }else{
                if(this.animate) Metronic.unblockUI('#'+this.id)
            }
        }
    },
    methods:{
        submitHandle(){
            let _this = this

            $('#'+this.id).validate({
                errorElement: 'span',
                errorClass: 'help-block',
                focusInvalid: false,
                rules: _this.rules,
                messages: _this.messages,
                invalidHandler: function (event, validator) {
                    console.log('error');
                    _this.submit = false
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
                    let data = fun.formToData('#'+_this.id)

                    setTimeout(()=>{
                        _this.$dispatch('form:submit', data)
                    },200)
                }
            })
        }
    }
}
</script>
