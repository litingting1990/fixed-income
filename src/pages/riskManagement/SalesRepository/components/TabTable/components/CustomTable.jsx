import React, { Component } from 'react';
import { Table } from '@alifd/next';

import EditDialog from './EditDialog';
import DeleteBalloon from './DeleteBalloon';

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onFilter = (filterParams) => {
    const serverStatue = filterParams[Object.keys(filterParams)[0]].selectedKeys[0];

    this.props.onFilter(serverStatue);
  }

  onChange = (selectedRowKeys, records) => {
    const arr = records.map((item) => {
      return item.serverId;
    });

    this.props.setIds(arr);
  }

  renderColumns = () => {
    const columns = [
      {
        title: '服务器Id',
        dataIndex: 'serverId',
        key: 'serverId'
      },
      {
        title: '组织名称',
        dataIndex: 'organizationName',
        key: 'organizationName'
      },
      {
        title: 'ipmi地址',
        dataIndex: 'ipmiIp',
        key: 'ipmiIp'
      },
      {
        title: '服务器名称',
        dataIndex: 'serverName',
        key: 'serverName'
      },
      {
        title: '机房',
        dataIndex: 'engineRoom',
        key: 'engineRoom'
      },
      {
        title: '主机型号',
        dataIndex: 'serverType',
        key: 'serverType'
      },
      {
        title: 'cpu',
        dataIndex: 'cpuCoreTotal',
        key: 'cpuCoreTotal'
      },
      {
        title: '内存',
        dataIndex: 'ramTotal',
        key: 'ramTotal'
      },
      {
        title: '磁盘',
        dataIndex: 'diskTotal',
        key: 'diskTotal'
      },
      {
        title: '状态',
        dataIndex: 'serverStatue',
        key: 'serverStatue',
        filters: [
          { label: '不可用', value: 10 },
          { label: '可用未分配', value: 20 },
          { label: '分配使用中', value: 30 }
        ],
        filterMode: 'single',
        render: (value, index, record) => {
          const serverStatue = record.serverStatue;

          switch (serverStatue) {
            case '10':
              return '不可用';
            case '20':
              return '可用未分配';
            case '30':
              return '分配使用中';
            default:
              return serverStatue;
          }
        }
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description'
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
        render: (value, index, record) => {
          return (
            <span>
              <EditDialog
                index={index}
                record={record}
                serverStatue={this.props.serverStatue}
                updateData={this.props.updateData}
              />
              <DeleteBalloon
                deleteData={() => this.props.deleteData(value, index, record)}
              />
            </span>
          );
        }
      }
    ];

    return columns.map((item) => {
      if (typeof item.render === 'function') {
        return (
          <Table.Column
            key={item.key}
            title={item.title}
            cell={item.render}
            width={item.width}
            filters={item.filters}
            filterMode={item.filterMode}
          />
        );
      }

      return (
        <Table.Column
          key={item.key}
          title={item.title}
          dataIndex={item.dataIndex}
          width={item.width}
          filters={item.filters}
          filterMode={item.filterMode}
        />
      );
    });
  };

  render() {
    const { dataSource } = this.props;

    return (
      <Table
        hasBorder={false}
        dataSource={dataSource}
        onFilter={this.onFilter}
        rowSelection={{ onChange: this.onChange }}
        primaryKey="serverId"
      >{this.renderColumns()}
      </Table>);
  }
}
