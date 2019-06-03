import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { success } from '@utils/iceNotification';
import { addData } from '@api/riskManagement/SalesRepository';

import AddDialog from './AddDialog';
// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomCoding = () => {
  const result = [];
  const n = 16;

  for (let i = 0; i < n; i++) {
    const ranNum = Math.ceil(Math.random() * 25);

    result.push(String.fromCharCode(65 + ranNum));
  }
  return result.join('');

};

// MOCK 数据，实际业务按需进行替换
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      organizationId: randomCoding(),
      organizationIdName: ['宝钢', '武钢', '马钢', '找钢网', '咪咕', '国益资本'][random(0, 5)],
      level: ['黑名单', '灰名单'][random(0, 1)],
      status: ['在库', '已出库'][random(0, 1)],
      inOut: ['入库', '出库'][random(0, 1)],
      inOutTime: `2${random(1, 9)}1${random(1, 9)}-1${random(1, 9)}-1${random(1, 9)}`,
      inOutPerson: ['黎明', '张三', '李四', '马云'][random(0, 3)]
    };
  });
};

export default class GoodsTable extends Component {
  state = {
    current: 1,
    isLoading: false,
    data: []
  };

  componentDidMount() {
    this.fetchData();
  }

  mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len));
      }, 600);
    });
  };

  fetchData = (len) => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.mockApi(len).then((data) => {
          this.setState({
            data,
            isLoading: false
          });
        });
      }
    );
  };

  handlePaginationChange = (current) => {
    this.setState(
      {
        current
      },
      () => {
        this.fetchData();
      }
    );
  };

  handleFilterChange = () => {
    this.fetchData(5);
  };

  handleDelete = () => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        this.fetchData(10);
      }
    });
  };

  handleDetail = () => {
    Dialog.confirm({
      title: '提示',
      content: '暂不支持查看详情'
    });
  };

  addData = (values) => {
    const params = {
      ...values
    };

    addData(params).then(() => {
      success('add');
      this.fetchData();
    });

  };

  renderOper = () => {
    return (
      <div>
        <Button
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={this.handleDetail}
        >
          详情
        </Button>
        <Button type="normal" warning onClick={this.handleDelete} style={{ marginRight: '5px' }}>
          删除
        </Button>
        <Button type="primary" onClick={this.handleDetail} style={{ marginRight: '5px' }}>
          出库
        </Button>

        <Button type="secondary" onClick={this.handleDelete} style={{ marginRight: '5px' }}>
          调整
        </Button>


      </div>
    );
  };

  render() {
    const { isLoading, data, current } = this.state;

    return (
      <div style={styles.container}>

        <IceContainer>
          <AddDialog
            addData={this.addData}
          />
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="机构ID" dataIndex="organizationId" />
            <Table.Column title="机构名称" dataIndex="organizationIdName" />
            <Table.Column title="级别" dataIndex="level" />
            <Table.Column title="状态" dataIndex="status" />
            <Table.Column title="出入库方向" dataIndex="inOut" />
            <Table.Column title="出入库时间" dataIndex="inOutTime" />
            <Table.Column title="出入库申请人" dataIndex="inOutPerson" />
            <Table.Column
              title="操作"
              dataIndex="oper"
              cell={this.renderOper}
            />
          </Table>
          <Pagination
            style={styles.pagination}
            current={current}
            onChange={this.handlePaginationChange}
          />
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  pagination: {
    marginTop: '20px',
    textAlign: 'right'
  }
};
