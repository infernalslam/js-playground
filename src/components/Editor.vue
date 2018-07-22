<template>
  <div>
    <codemirror v-model="codeMirror.code"
                :options="codeMirror.cmOptions"
                @input="onCmCodeChange"
                @ready="onCmReady"
    >
    </codemirror>
  </div>
</template>

<script>
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/seti.css'
import 'codemirror/theme/ambiance.css'
import 'codemirror/theme/monokai.css'

import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/search/searchcursor'
import 'codemirror/addon/search/search'
import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/selection/active-line'
export default {
  props: ['codeMirror', 'onCmCodeChange', 'onCmReady']
}
</script>
