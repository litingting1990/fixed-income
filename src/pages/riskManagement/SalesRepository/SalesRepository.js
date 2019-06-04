import React, { Component } from 'react';
import TabTable from './components/TabTable';

export default class SalesRepository extends Component {
  static displayName = 'SalesRepository';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="basic-table-page">
        <TabTable />
      </div>
    );
  }
}
