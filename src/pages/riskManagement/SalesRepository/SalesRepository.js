import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Pagination, Icon, Button, Message, Balloon } from '@alifd/next';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
import { getList, updateData, addData, deleteData, deleteBatch } from '../../../api/SalesRepository';
import { success } from '../../../utils/iceNotification';
import TabTable from './components/TabTable';
import AddDialog from './components/TabTable/components/AddDialog';


export default class SalesRepository extends Component {
  static displayName = 'SalesRepository';

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
      total: 1,
      originData: [],
      serverStatue: null,
      visible: false,
      ids: []
    };
    this.pageSizeList = [
      10, 50, 100
    ];
    this.serverStatue = [
      { value: '10', label: '不可用' },
      { value: '20', label: '可用未分配' },
      { value: '30', label: '分配使用中' }
    ];
  }


  addData = (values) => {
    const params = {
      ...values,
      createdOrganizationId: this.props.profile.organizations.find((item) => {
        return item.defaulted;
      }).organizationId
    };

    addData(params).then(() => {
      success('add');
      this.getList();
    });

  };
  deleteData = (value, index, record) => {
    deleteData(record.serverId).then(() => {
      success('delete');
      this.getList();
    });
  };

  updateData = (dataIndex, values) => {
    updateData(values).then(() => {
      success('update');
      this.getList();
    });

  };

  getList = () => {
    const params = {
      pageNum: this.state.current,
      pageSize: this.state.pageSize,
      organizationId: this.props.profile.organizations.find((item) => {
        return item.defaulted;
      }).organizationId,
      serverStatue: this.state.serverStatue
    };

    getList(params).then((res) => {
      this.setState({
        originData: [...res.data.data.list],
        total: res.data.data.total,
        current: res.data.data.pageNum,
        pageSize: res.data.data.pageSize
      });
    });
  }
  handlePageSizeChange = (pageSize) => {
    this.setState({
      pageSize
    }, () => {
      this.getList();
    });
  }

  handlePaginationChange = (current) => {
    this.setState({
      current
    }, () => {
      this.getList();
    });
  }


  deleteBatch = () => {
    if (this.state.ids.length === 0) {
      return Message.error('请至少选择一项！');
    }
    const str = this.state.ids.join();

    deleteBatch(str).then(() => {
      Message.success('批量删除成功');
      this.setState({
        visible: false
      });
      this.getList();
    });
  }

  onFilter = (serverStatue) => {
    this.setState({
      serverStatue
    });
  }

  setIds = (ids) => {
    this.setState({
      ids
    });
  }

  handleHide = () => {
    this.setState({
      visible: false
    });
  }
  handleVisible = (visible) => {
    this.setState({ visible });
  };

  shouldComponentUpdate(nextProps, nextState) {
    const nextOrganizationId = nextProps.profile.organizations.find((item) => {
      return item.defaulted;
    }).organizationId;
    const thisOrganizationId = this.props.profile.organizations.find((item) => {
      return item.defaulted;
    }).organizationId;


    if (
      nextOrganizationId === thisOrganizationId &&
       nextState.current === this.state.current &&
       nextState.pageSize === this.state.pageSize &&
       nextState.total === this.state.total &&
       nextState.serverStatue === this.state.serverStatue &&
       nextState.visible === this.state.visible &&
       JSON.stringify(nextState.originData) === JSON.stringify(this.state.originData)
    ) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    this.getList();
  }

  componentDidMount() {
    this.getList();
  }

  render() {
    const breadcrumb = [
      { text: '信息维护', link: '' },
      { text: '非池化资源池服务器', link: '#/calendar/npServer' }
    ];
    const { originData, visible } = this.state;

    return (
      <div className="users-organizations-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <IceContainer style={styles.IceContainer}>

          <AddDialog
            addData={this.addData}
            serverStatue={this.serverStatue}
          />

          <Balloon
            trigger={
              <Button
                type="primary"
                style={{ marginBottom: '10px' }}
              >
                <Icon type="ashbin" /> 批量删除
              </Button>
              }
            triggerType="click"
            visible={visible}
            onVisibleChange={this.handleVisible}
          >
            <div>
              <div style={{ padding: '5px 0 15px' }}>确定批量删除？</div>
              <Button
                id="confirmBtn"
                type="normal"
                warning
                style={{ marginRight: '5px' }}
                onClick={this.deleteBatch}
              >
                确认
              </Button>
              <Button
                id="cancelBtn"
                onClick={this.handleHide}
              >
                关闭
              </Button>
            </div>
          </Balloon>
          <TabTable
            originData={originData}
            updateData={this.updateData}
            deleteData={this.deleteData}
            serverStatue={this.serverStatue}
            onFilter={this.onFilter}
            setIds={this.setIds}
          />
          <Pagination
            current={this.state.current}
            total={this.state.total}
            pageSize={this.state.pageSize}
            pageSizeList={this.pageSizeList}
            pageSizeSelector="dropdown"
            pageSizePosition="end"
            onPageSizeChange={this.handlePageSizeChange}
            onChange={this.handlePaginationChange}
            style={styles.pagination}
          />
        </IceContainer>
      </div>
    );
  }
}
const styles = {
  pagination: {
    marginTop: '10px'
  },
  IceContainer: {
    overflow: 'inherit'
  }
};
