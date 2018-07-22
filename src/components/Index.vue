<template>
  <div>
     <notifications group="foo-css"
                   position="bottom left"
                   :speed="500">
     </notifications>

     <global-events
        @keyup.ctrl.tab="runCode"
      ></global-events>

    <!-- live -->
    <div class="columns is-gapless">
      <div class="column is-9">
        <editor :code-mirror="codeMirror" :on-cm-code-change="onCmCodeChange"></editor>
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
        <viewer :terminal="terminal"></viewer>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from './Editor'
import Viewer from './Viewer'
import expression from '../lib/expressions'
// import delay from '../lib/delay'
import _ from 'lodash'
export default {
  mounted () {
  },
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
      },
      result: [],
      themes: [
        'ambiance',
        'seti',
        'monokai'
      ]
    }
  },
  methods: {
    runCode () {
      try {
        let expressions = expression(this.code)
        this.result = this.evaluateExpressions(expressions)
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
      // return _.map(formattedExpressions, (expression, line) => expression)
    }
  },
  computed: {
    terminal () {
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
</style>
