'use strict'
var React = require('react')
var BasicPanel = require('./basicPanel')

module.exports = React.createClass({
  contextTypes: {
    traceManager: React.PropTypes.object,
    tx: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      currentStepIndex: -1
    }
  },

  getInitialState: function () {
    return {
      data: null
    }
  },

  render: function () {
    return (
      <BasicPanel name='Storage' data={this.state.data} renderRow={this.renderStorageRow} />
    )
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.currentStepIndex < 0) return
    if (window.ethDebuggerSelectedItem !== nextProps.currentStepIndex) return

    var self = this
    this.context.traceManager.getStorageAt(nextProps.currentStepIndex, this.context.tx.blockNumber.toString(), this.context.tx.transactionIndex, function (storage) {
      if (window.ethDebuggerSelectedItem === nextProps.currentStepIndex) {
        self.setState({
          data: storage
        })
      }
    })
  },

  renderStorageRow: function (data) {
    var ret = []
    if (data) {
      for (var key in data) {
        ret.push(
          <tr key={key}>
            <td>
              {key}
            </td>
            <td>
              {data[key]}
            </td>
          </tr>)
      }
    }
    return ret
  }
})
