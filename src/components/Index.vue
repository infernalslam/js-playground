<template>
  <div>
    Hello const x = 10
    <editor :code-mirror="codeMirror"
            :on-cm-code-change="onCmCodeChange"
    ></editor>
    result : {{ terminal }} <br>
    errors : {{ errors }}
    <viewer></viewer>
  </div>
</template>

<script>
import Editor from './Editor'
import Viewer from './Viewer'
import expression from '../lib/expressions'
import delay from '../lib/delay'
import _ from 'lodash'
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
      },
      result: [],
      errors: ''
    }
  },
  methods: {
    async onCmCodeChange (newCode) {
      this.code = newCode
      await delay(1000)
      try {
        let expressions = expression(this.code)
        this.result = this.evaluateExpressions(expressions)
      } catch (err) {
        this.errors = err.toString()
      }
    },
    evaluateExpressions (expressions) {
      const formattedExpressions = _.mapValues(expressions, expression => {
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
      return _.map(formattedExpressions, (expression, line) => expression)
    }
  },
  computed: {
    terminal () {
      let isArray = null
      for(var key in this.result){
        if(this.result.hasOwnProperty(key)) {
          if (this.result[key] !== null) isArray = this.result[key]
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
