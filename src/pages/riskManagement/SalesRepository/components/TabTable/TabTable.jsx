import React, { Component } from 'react';
import CustomTable from './components/CustomTable';


export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    const { originData, columns, updateData, serverStatue, deleteData, onFilter, setIds } = this.props;


    return (
      <div className="tab-table">
        <CustomTable
          updateData={updateData}
          deleteData={deleteData}
          dataSource={originData}
          columns={columns}
          serverStatue={serverStatue}
          onFilter={onFilter}
          setIds={setIds}
        />
      </div>
    );
  }
}
