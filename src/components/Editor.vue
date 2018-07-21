<template>
  <div>
    Editor
    <codemirror v-model="code"
                :options="cmOptions"
                @input="onCmCodeChange"
    >
    </codemirror>
  </div>
</template>

<script>
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/seti.css'

export default {
  data () {
    return {
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
  },
  methods: {
    onCmCodeChange (newCode) {
      console.log('this is new code', newCode)
      this.code = newCode
    }
  }
}
</script>
