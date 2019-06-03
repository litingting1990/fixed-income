import React, { Component } from 'react';
import Table from './components/Table';
import PageLoading from '@components/PageLoading';

export default class SalesRepository extends Component {
  static displayName = 'SalesRepository';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="basic-table-page">
        <Table />
      </div>
    );
  }
}
