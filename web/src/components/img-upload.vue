<template>
    <div class="fileinput fileinput-new" :id="id" data-provides="fileinput">
        <div class="fileinput-preview thumbnail" data-trigger="fileinput" :style="{width:width?width+'px':'',height:height?height+'px':''}">
        </div>
        <div>
            <span class="btn default btn-file">
                <span class="fileinput-new">选择图片</span>
                <span class="fileinput-exists">点击修改 </span>
                <input type="file" :name="name">
            </span>
            <a href="javascript:;" class="btn redd fileinput-exists" data-dismiss="fileinput">X</a>
        </div>
    </div>
</template>
<script>
export default{
    props:{
        width: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
            default: 0
        },
        name:{
            type: String,
            default: 'pic'
        },
        data:{
            // type: Object,
            twoWay: true
        },
        readImg:{
            type: Boolean,
            twoWay: true,
            default: false
        }
    },
    data(){
        return {
            id : 'file-'+new Date().getTime()
        }
    },
    methods:{
        getImg(){
            if($('#'+this.id).find('.fileinput-preview img').attr('src')){
                this.data = $('#'+this.id+' input[type="file"]')[0].files[0]
            }else{
                this.data = null
            }
        }
    },
    watch:{
        readImg(value){
            if(value){
                this.getImg()
                this.readImg = false
            }
        }
    }
}
</script>
<style lang="sass">
.fileinput-new{
    position: relative;
    
    .btn.default{
        display: block;
        position: absolute;
        left: 0;
        bottom: 5px;
        width: 100%;
        opacity: .6;
        color: white;
        background-color: black;
    }
}

.fileinput-exists{
    position: relative;
    
    .btn.default{
        display: block;
        position: absolute;
        left: 0;
        bottom: 5px;
        width: 100%;
        opacity: .6;
        color: white;
        background-color: black;
    }
    
    .redd.btn{
        color: white;
        background-color: black;
        position: absolute;
        right: 0;
        top: 0;
        display: block;
        opacity: .6;
    }
}

.fileinput .thumbnail > img{
    height: 100%;
}
</style>