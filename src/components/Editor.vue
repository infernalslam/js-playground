<template>
  <div>
    <codemirror v-model="codeMirror.code"
                :options="codeMirror.cmOptions"
                @input="onCmCodeChange"
    >
    </codemirror>
  </div>
</template>

<script>
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/seti.css'
import 'codemirror/theme/ambiance.css'
import 'codemirror/theme/monokai.css'
export default {
  props: ['codeMirror', 'onCmCodeChange']
}
</script>
