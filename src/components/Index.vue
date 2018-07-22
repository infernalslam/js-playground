<template>
  <div>
     <notifications group="foo-css"
                   position="bottom left"
                   :speed="500">
     </notifications>

    <!-- live -->
    <div class="columns is-gapless is-mobile">
      <div class="column is-7">
        <editor :code-mirror="codeMirror" :on-cm-code-change="onCmCodeChange" :on-cm-ready="onCmReady"></editor>
      </div>
      <div class="column" style="background: #282c34;">
        <div>
          <a class="button is-danger is-small is-outlined" @click="runCode()"> run </a>
          <select v-model="codeMirror.cmOptions.theme">
            <option v-for="(item, index) in themes" :key="index">
              {{ item }}
            </option>
          </select>
        </div>
        <viewer :terminal="terminal" :exec-code="execCode"></viewer>
      </div>
    </div>
  </div>
</template>

<script>
import hotkeys from 'hotkeys-js'
import Editor from './Editor'
import Viewer from './Viewer'
import expression from '../lib/expressions'
import _ from 'lodash'
import emojis from '../lib/emojis'
export default {
  data () {
    return {
      codeMirror: {
        code: '',
        cmOptions: {
          tabSize: 2,
          mode: 'text/javascript',
          theme: 'ambiance',
          lineNumbers: true,
          lineWrapping: false,
          line: true,
          gutters: ['CodeMirror-linenumbers', 'breakpoints'],
          // extraKeys: {
          //   Ctrl: 'autocomplete'
          // },
          foldGutter: true,
          placeholder: `JS Playground!! with 😘`,
          styleActiveLine: true
        }
      },
      result: [],
      terminal: [],
      themes: [
        'ambiance',
        'seti',
        'monokai'
      ],
      emojis: emojis()
    }
  },
  mounted () {
    let vm = this
    hotkeys('ctrl+s', (event, handler) => {
      vm.runCode()
    })
  },
  methods: {
    onCmReady (cm) {
      cm.on('keypress', () => {
        console.log(cm)
        cm.showHint()
      })
    },
    runCode () {
      try {
        let expressions = expression(this.code)
        this.result = this.evaluateExpressions(expressions)
        this.terminal = this.terminalCode()
      } catch (err) {
        this.$notify({
          group: 'foo-css',
          title: 'ERROR',
          text: err.toString(),
          duration: 5000,
          type: 'error'
        })
      }
    },
    async onCmCodeChange (newCode) {
      let index = Math.floor(Math.random() * (this.emojis.length - 1))
      this.codeMirror.cmOptions.placeholder = `JS Playground!! with ${this.emojis[index]}`
      this.code = newCode
    },
    evaluateExpressions (expressions) {
      const formattedExpressions = _.mapValues(expressions, expression => {
        /* eslint-disable no-eval */
        const result = eval(expression)
        if (result && result.type) {
          return result
        } else if (_.isFunction(result) && result.name) {
          return <i>Function {result.name}</i>
        } else if (_.isBoolean(result)) {
          return result ? 'True' : 'False'
        } else if (_.isObject(result) || _.isArray(result)) {
          return JSON.stringify(result)
        }
        return result
      })
      return formattedExpressions
    },
    terminalCode () {
      let isArray = []
      for (let key in this.result) {
        if (this.result.hasOwnProperty(key)) {
          if (this.result[key] !== null) {
            let data = {
              id: key,
              value: this.result[key]
            }
            isArray.push(data)
          }
        }
      }
      return isArray
    }
  },
  computed: {
    execCode () {
      let str = ''
      for (let i of this.terminal) {
        if (i.value) {
          str += i.value.toString() + '\n'
        }
      }
      return str
    }
  },
  components: {
    Editor,
    Viewer
  }
}
</script>

<style>
.CodeMirror {
  height: 100vh !important;
}
.CodeMirror-placeholder {
  padding-top: 50px !important;
  font-size: 50px !important;
}
</style>
