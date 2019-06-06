/* eslint no-unused-expressions: 0 */
import React, { Component } from 'react';
import { Radio } from '@alifd/next';

export default class CellEditorSelect extends Component {
  static displayName = 'CellEditorSelect';

  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          value: 0,
          label: '黑名单'
        }, {
          value: 1,
          label: '灰名单'
        }
      ]
    };
  }
  onChange = (value) => {
    this.props.changeRadioData(value, this.props.index);
  }

  render() {
    return (
      <div>
        <Radio.Group
          defaultValue={0}
          dataSource={this.state.list}
          onChange={this.onChange}
          style={styles.cellInput}
        />
      </div>
    );
  }
}

const styles = {
  cellInput: {
    width: 'calc(100% - 44px)'
  }
};
