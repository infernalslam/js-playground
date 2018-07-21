<template>
  <div>
    Hello
    <editor :code-mirror="codeMirror"
            :on-cm-code-change="onCmCodeChange"
    ></editor>
    <viewer></viewer>
  </div>
</template>

<script>
import Editor from './Editor'
import Viewer from './Viewer'
import expression from '../lib/expressions'
export default {
  data () {
    return {
      codeMirror: {
        code: '',
        cmOptions: {
          tabSize: 2,
          mode: 'text/javascript',
          theme: 'seti',
          lineNumbers: true,
          lineWrapping: false,
          line: true
        }
      }
    }
  },
  methods: {
    onCmCodeChange (newCode) {
      this.code = newCode
      expression(this.code)
    }
  },
  components: {
    Editor,
    Viewer
  }
}
</script>
