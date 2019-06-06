import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
import CustomBreadcrumb from '@components/CustomBreadcrumb';
import CustomTable from './components/CustomTable';

import data from './data';

export default class SalesRepositoryRecord extends Component {
  static displayName = 'SalesRepositoryRecord';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: data,
      tabKey: 'all'
    };
    this.columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: '作者',
        dataIndex: 'author',
        key: 'author'
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status'
      },
      {
        title: '发布时间',
        dataIndex: 'date',
        key: 'date'
      }

    ];
  }

  getFormValues = (dataIndex, values) => {
    const { dataSource, tabKey } = this.state;

    dataSource[tabKey][dataIndex] = values;
    this.setState({
      dataSource
    });
  };

  handleRemove = (value, index) => {
    const { dataSource, tabKey } = this.state;

    dataSource[tabKey].splice(index, 1);
    this.setState({
      dataSource
    });
  };

  handleTabChange = (key) => {
    this.setState({
      tabKey: key
    });
  };

  render() {
    const { dataSource } = this.state;
    const breadcrumb = [
      { text: '风险控制', link: '' },
      { text: '销售对手库管理', link: '#/riskManagement/salesRepository' },
      { text: '销售对手库记录查询', link: '#/riskManagement/salesRepository-record' }
    ];

    return (
      <div>
        <CustomBreadcrumb dataSource={breadcrumb} />
        <IceContainer style={{ padding: '10px' }}>
          <Tab onChange={this.handleTabChange}>
            <Tab.Item title="入库记录" key="add">
              <CustomTable
                dataSource={dataSource[this.state.tabKey]}
                columns={this.columns}
                hasBorder={false}
              />
            </Tab.Item>
            <Tab.Item title="出库记录" key="delete">
              <CustomTable
                dataSource={dataSource[this.state.tabKey]}
                columns={this.columns}
                hasBorder={false}
              />
            </Tab.Item>

            <Tab.Item title="调整记录" key="update">
              <CustomTable
                dataSource={dataSource[this.state.tabKey]}
                columns={this.columns}
                hasBorder={false}
              />
            </Tab.Item>

            <Tab.Item title="申请记录" key="apply">
              <CustomTable
                dataSource={dataSource[this.state.tabKey]}
                columns={this.columns}
                hasBorder={false}
              />
            </Tab.Item>

          </Tab>
        </IceContainer>
      </div>

    );
  }
}
