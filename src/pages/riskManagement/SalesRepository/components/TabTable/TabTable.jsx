import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
import CustomTable from './components/CustomTable';
import IncomeTable from './components/IncomeTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import data from './data';

export default class TabTable extends Component {
  static displayName = 'TabTable';

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
        title: '机构',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: '机构全称',
        dataIndex: 'author',
        key: 'author'
      },
      {
        title: '级别',
        dataIndex: 'status',
        key: 'status'
      },
      {
        title: '入库原因',
        dataIndex: 'date',
        key: 'date'
      },
      {
        title: '操作',
        key: 'action',
        render: (value, index, record) => {
          return (
            <span>
              <EditDialog
                index={index}
                record={record}
                getFormValues={this.getFormValues}
              />
              <DeleteBalloon
                handleRemove={() => this.handleRemove(value, index, record)}
              />
            </span>
          );
        }
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


    return (
      <IceContainer>
        <Tab onChange={this.handleTabChange}>
          <Tab.Item title="入库" key="income">
            <IncomeTable />
          </Tab.Item>
          <Tab.Item title="出库" key="outgoing">
            <CustomTable
              dataSource={dataSource[this.state.tabKey]}
              columns={this.columns}
              hasBorder={false}
            />
          </Tab.Item>
          <Tab.Item title="调整" key="adjust">
            <CustomTable
              dataSource={dataSource[this.state.tabKey]}
              columns={this.columns}
              hasBorder={false}
            />
          </Tab.Item>
          <Tab.Item title="申请" key="apply">
            <CustomTable
              dataSource={dataSource[this.state.tabKey]}
              columns={this.columns}
              hasBorder={false}
            />
          </Tab.Item>
        </Tab>
      </IceContainer>
    );
  }
}
