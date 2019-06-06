

import React, { Component } from 'react';
import CustomBreadcrumb from '@components/CustomBreadcrumb';
import EditableTable from './components/EditableTable';


export default class SalesRepositoryAdd extends Component {
  static displayName = 'SalesRepositoryAdd';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '风险控制', link: '' },
      { text: '销售对手库管理', link: '#/riskManagement/salesRepository' },
      { text: '销售对手库入库', link: '#/riskManagement/salesRepository-add' }
    ];

    return (
      <div className="navigation-setting-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <EditableTable />
      </div>
    );
  }
}
