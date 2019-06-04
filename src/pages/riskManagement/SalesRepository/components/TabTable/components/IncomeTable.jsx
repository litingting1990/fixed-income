import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { success } from '@utils/iceNotification';
import { getOrgList } from '@api/riskManagement/SalesRepository';
import EditDialog from './EditDialog';
import DeleteBalloon from './DeleteBalloon';
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
      organization: ['安信信托', '河南遂平农商银行', '兴业全球基金公司'][random(0, 2)],
      organizationName: ['安信信托股份有限公司', '河南遂平农村商业银行股份有限公司', '兴业全球基金管理有限公司'][random(0, 2)],
      level: ['黑名单', '灰名单'][random(0, 1)],
      reason: randomCoding()
    };
  });
};

export default class GoodsTable extends Component {
    state = {
      current: 1,
      isLoading: false,
      data: [],
      orgList: [],
      orgId: null
    };


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

    getOrgList = () => {
      getOrgList().then((res) => {
        const orgList = res.data && res.data.data.map((item) => {
          return {
            label: item.name,
            value: item.id
          };
        });

        if (orgList) {
          this.setState({
            orgList
          });
        }
      });
    }

    updateData = (values) => {
      console.log('values', values);
    }

    deleteData = (value, index, record) => {
      console.log('record', record);
    }


    renderOperate = (value, index, record) => {
      return (
        <div>
          <EditDialog
            record={record}
            updateData={this.updateData}
          />
          <DeleteBalloon
            deleteData={() => this.deleteData(value, index, record)}
          />
        </div>
      );
    };
    renderState = (value) => {
      console.log('value', value);
      if (value === '灰名单') {
        return (
          <div>
            <span style={styles.stateGrey}>{value}</span>
          </div>
        );
      }
      return (
        <div>
          <span style={styles.stateBlack}>{value}</span>
        </div>
      );
    };

    onFilter = (filterParams) => {
      const orgId = filterParams[Object.keys(filterParams)[0]].selectedKeys[0];

      console.log(orgId);

    }

    componentWillMount() {
      this.getOrgList();
      this.fetchData();
    }

    render() {
      const { isLoading, data, current } = this.state;

      return (
        <div style={styles.container}>

          <IceContainer>
            <Table
              loading={isLoading}
              dataSource={data}
              hasBorder={false}
              onFilter={this.onFilter}
            >
              <Table.Column
                title="机构"
                dataIndex="organization"
                key="organization"
                filters={this.state.orgList}
                filterMode="single"
              />
              <Table.Column title="机构全称" dataIndex="organizationName" />
              <Table.Column
                title="级别"
                dataIndex="level"
                cell={this.renderState}
              />
              <Table.Column title="入库原因" dataIndex="reason" />
              <Table.Column
                title="操作"
                dataIndex="operate"
                cell={this.renderOperate}
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
  },
  stateGrey: {
    display: 'inline-block',
    padding: '5px 10px',
    color: '#52c41a',
    background: '#f6ffed',
    border: '1px solid #b7eb8f',
    borderRadius: '4px'
  },
  stateBlack: {
    display: 'inline-block',
    padding: '5px 10px',
    color: 'red',
    background: '#f6ffed',
    border: '1px solid red',
    borderRadius: '4px'
  }
};
