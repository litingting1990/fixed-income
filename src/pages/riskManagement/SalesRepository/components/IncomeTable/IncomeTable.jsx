import React, { Component } from 'react';
import moment from 'moment';
import { Table, Pagination, Dialog } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { success } from '@utils/iceNotification';
import { getList, deleteData, updateData } from '@api/riskManagement/SalesRepository';
import EditDialog from './EditDialog';
import DeleteBalloon from './DeleteBalloon';


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
          <span style={styles.stateBlack}>黑名单</span>
        </div>
      );
    }
    return (
      <div>
        <span style={styles.stateGrey}>灰名单</span>
      </div>
    );
  }

  // 状态
  renderStatus = (value, index, record) => {
    return (
      <div>
        <span style={{
          display: 'inline-block',
          background: value === 0 ? '#28a745' : '#333',
          width: '8px',
          height: '8px',
          borderRadius: '50px',
          marginRight: '4px'
        }}
        />
        <span style={{
          color: value === 0 ? '#28a745' : '#333'
        }}
        >{value === 1 ? '已出库' : '在库'}
        </span>
      </div>

    );
  }

  // 入库时间
  renderPuttime = (value, index, record) => {
    return (
      <span>
        {moment(value).format('YYYY/MM/DD HH:mm:ss')}
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
          index={index}
          record={record}
          deleteData={this.deleteData}
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


  updateData = (values) => {
    console.log('values', values);
    const params = { applydatetime: '2019-06-06T04:45:02.854Z', id: values.id, pid: values.putid, title: '关于xxx销售对手库入库申请', direction: '0', applyuserid: '1', applyusername: '管理员' };

    params.details = [
      { id: values.id, fid: '0', direction: '0', orgid: values.orgid, orgname: values.orgname, orgfullname: values.orgfullname, grade1: values.grade === 0 ? 1 : 0, grade2: values.grade, reason: values.reason }

    ];
    updateData(params).then(() => {
      success('调整成功');
      this.getList();
    });
  }

  deleteData = (values) => {
    const params = { applydatetime: '2019-06-06T04:45:02.854Z', id: values.id, pid: values.putid, title: '关于xxx销售对手库入库申请', direction: '1', applyuserid: '1', applyusername: '管理员' };

    params.details = [
      { id: values.id, fid: '0', direction: '1', orgid: values.orgid, orgname: values.orgname, orgfullname: values.orgfullname, grade1: values.grade, grade2: values.grade, reason: values.reason }

    ];
    deleteData(params).then(() => {
      success('出库成功');
      this.getList();
    });
  }


  componentWillMount() {
    this.getList();
  }

  render() {
    const { isLoading, data, current } = this.state;
    const { orgList } = this.props;

    return (
      <div style={{ marginTop: '10px' }}>
        <IceContainer
          style={{ padding: 0 }}
        >
          <Table
            loading={isLoading}
            dataSource={data}
            hasBorder={false}
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
              align="center"
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
              cell={this.renderPuttime}
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
    color: 'gray',
    background: 'transparent',
    border: '1px solid gray',
    borderRadius: '4px'
  },
  stateBlack: {
    display: 'inline-block',
    padding: '5px 10px',
    color: 'black',
    background: 'transparent',
    border: '1px solid black',
    borderRadius: '4px'
  }
};
