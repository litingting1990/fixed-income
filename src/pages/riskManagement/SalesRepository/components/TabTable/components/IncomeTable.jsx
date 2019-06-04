import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { success } from '@utils/iceNotification';
import { getOrgList } from '@api/riskManagement/SalesRepository';

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
    //   getOrgList().then((res) => {
    //     const orgList = res.data && res.data.data.map((item) => {
    //       return {
    //         label: item.name,
    //         value: item.id
    //       };
    //     });

    //     if (orgList) {
    //       this.setState({
    //         orgList
    //       });
    //     }
    //   });

      let orgList = [
        {
          id: 21,
          name: '安信信托',
          fullname: '安信信托股份有限公司'
        },
        {
          id: 22,
          name: '河南遂平农商银行',
          fullname: '河南遂平农村商业银行股份有限公司'
        },
        {
          id: 23,
          name: '兴业全球基金公司',
          fullname: '兴业全球基金管理有限公司'
        }
      ];

      orgList = orgList.map((item) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      this.setState({
        orgList
      });
    }


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
              <Table.Column title="级别" dataIndex="level" />
              <Table.Column title="入库原因" dataIndex="reason" />
              <Table.Column
                title="操作"
                dataIndex="operate"
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
