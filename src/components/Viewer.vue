<template>
  <div>
    <codemirror v-model="execCode"
                :options="cmOptions"
    >
    </codemirror>
  </div>
</template>

<script>
export default {
  props: ['exec-code'],
  data () {
    return {
      cmOptions: {
        tabSize: 2,
        mode: 'text/javascript',
        theme: 'seti',
        lineNumbers: true,
        lineWrapping: true,
        readOnly: true,
        line: true,
        gutters: ['CodeMirror-linenumbers', 'breakpoints']
      }
    }
  }
}
</script>
