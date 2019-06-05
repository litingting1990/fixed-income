import React, { Component } from 'react';
import { Table, Pagination, Dialog } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { success } from '@utils/iceNotification';
import { getList, addData, deleteData, updateData } from '@api/riskManagement/SalesRepository';
import EditDialog from './EditDialog';
import DeleteBalloon from './DeleteBalloon';
import AddDialog from './AddDialog';


export default class IncomeTable extends Component {
  state = {
    current: 1,
    isLoading: false,
    data: [],
    orgId: null
  };

  // 等级
  renderGrade = (value, index, record) => {
    if (value === 0) {
      return (
        <div>
          <span style={styles.stateBlack}>黑</span>
        </div>
      );
    }
    return (
      <div>
        <span style={styles.stateGrey}>灰</span>
      </div>
    );
  }

    // 状态
    renderStatus = (value, index, record) => {
      return (
        <span
          style={{
            color: value === 1 ? '#f7da47' : '#ee706d',
            width: '100px',
            fontWeight: '500',
            textAlign: value === 1 ? 'right' : 'left',
            display: 'inline-block'
          }}
        >
          {value === 1 ? '已出库' : '在库'}
        </span>
      );
    }
    // 操作
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

  handlePaginationChange = (current) => {
    this.setState(
      {
        current
      },
      () => {
        this.getList();
      }
    );
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


  getList = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        getList().then((res) => {
          this.setState({
            isLoading: false,
            data: res.data.data
          });
        });
      }
    );
    getList().then((res) => {
    });
  }

  addData = (values) => {
    console.log(values);
    const params = {
      ...values
    };

    addData(params).then(() => {
      success('add');
      this.getList();
    });

  };

  updateData = (values) => {
    console.log('values', values);
  }

  deleteData = (value, index, record) => {
    console.log('record', record);
  }


  onFilter = (filterParams) => {
    const orgId = filterParams[Object.keys(filterParams)[0]].selectedKeys[0];

    console.log(orgId);

  }

  componentWillMount() {
    this.getList();
  }

  render() {
    const { isLoading, data, current } = this.state;
    const { orgList } = this.props;

    return (
      <div style={styles.container}>
        <AddDialog
          addData={this.addData}
          orgList={orgList}
        />
        <IceContainer
          style={{ padding: '10px 0' }}
        >
          <Table
            loading={isLoading}
            dataSource={data}
            hasBorder={false}
            onFilter={this.onFilter}
          >
            <Table.Column
              title="机构id"
              dataIndex="orgid"
              key="orgid"
            />
            <Table.Column
              title="机构简称"
              dataIndex="orgname"
              key="orgname"
              filters={orgList}
              filterMode="single"
            />
            <Table.Column
              title="机构全称"
              dataIndex="orgfullname"
              key="orgfullname"
            />
            <Table.Column
              title="等级"
              dataIndex="grade"
              key="grade"
              cell={this.renderGrade}
            />
            <Table.Column
              title="状态"
              dataIndex="status"
              key="status"
              cell={this.renderStatus}
            />

            <Table.Column
              title="入库申请人名称"
              dataIndex="putapplicanter"
              key="putapplicanter"
            />
            <Table.Column
              title="入库时间"
              dataIndex="puttime"
              key="puttime"
            />
            {/* <Table.Column
              title="出库申请人名称"
              dataIndex="outapplicanter"
              key="outapplicanter"
            />
            <Table.Column
              title="出库时间"
              dataIndex="outtime"
              key="outtime"
            /> */}
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
