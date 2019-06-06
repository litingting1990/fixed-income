/* eslint no-unused-expressions: 0 */
import React, { Component } from 'react';
import { Select } from '@alifd/next';

export default class CellEditorSelect extends Component {
  static displayName = 'CellEditorSelect';

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  changeSelectData=(value) => {
    const selectData = this.props.orgList.find((item) => {
      return item.id === value;
    });

    this.props.changeSelectData(selectData, this.props.index);
  }


  render() {
    const { orgList } = this.props;
    const dataSource = orgList.map((item) => {
      return {
        label: item.name,
        value: item.id
      };
    });


    return (
      <div className="CellEditorSelect">
        <Select
          showSearch
          style={styles.cellInput}
          defaultValue={dataSource[0]}
          dataSource={dataSource}
          onChange={this.changeSelectData}
        />
      </div>
    );
  }
}

const styles = {
  cellInput: {
    width: '300px'
  }
};
