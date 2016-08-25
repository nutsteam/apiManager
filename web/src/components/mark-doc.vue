<template>
    <div id="test-editormd-view2">
        <textarea id="append-test" style="display:none;">{{doc}}</textarea>
    </div>
</template>

<script>
import {IO} from '../util/io'

export default{
    props:{
        url:{
            type:String
        }
    },
    data(){
        return{
            doc: ''
        }
    },
    ready(){
        let io = new IO({
            url: this.url
        })

        io.get((res)=>{
            console.log(res)

            this.doc = res

            this.$nextTick(()=>{
                testEditormdView2 = editormd.markdownToHTML("test-editormd-view2", {
                    htmlDecode      : "style,script,iframe",  // you can filter tags decode
                    emoji           : true,
                    taskList        : true,
                    tex             : true,  // 默认不解析
                    flowChart       : true,  // 默认不解析
                    sequenceDiagram : true,  // 默认不解析
                });
            })
        })
    }
}
</script>