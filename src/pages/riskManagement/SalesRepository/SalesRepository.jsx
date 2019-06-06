import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from '@alifd/next';
import axios from 'axios';
import IceContainer from '@icedesign/container';
import CustomBreadcrumb from '@components/CustomBreadcrumb';
import { getOrgList, getUserList } from '@api/riskManagement/SalesRepository';
import IncomeTable from './components/IncomeTable';

@withRouter
export default class SalesRepository extends Component {
  static displayName = 'SalesRepository';

  constructor(props) {
    super(props);
    this.state = {
      orgList: [],
      userList: []
    };
  }

  getOrgAndUser = () => {
    axios.all([getOrgList(), getUserList()])
      .then(axios.spread((data1, data2) => {
        const orgList = data1.data && data1.data.data.map((item) => {
          return {
            label: item.name,
            value: item.id
          };
        });

        this.setState({
          orgList,
          userList: data2.data.data
        });
      }));
  }

  // getOrgList = () => {
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
  // }


  handleRecord = () => {
    this.props.history.push('/riskManagement/salesRepository-record');
  }

  handleAdd = () => {
    this.props.history.push('/riskManagement/salesRepository-add');
  }
  componentWillMount() {
    this.getOrgAndUser();
  }
  render() {
    const { orgList, userList } = this.state;
    const breadcrumb = [
      { text: '风险控制', link: '' },
      { text: '销售对手库管理', link: '#/riskManagement/salesRepository' }
    ];

    return (
      <div className="basic-table-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        {
          orgList.length > 0 ? (
            <IceContainer style={{ padding: '10px' }}>
              <Button type="primary" onClick={this.handleAdd} style={{ marginRight: '10px' }}>
                <Icon type="add" />入库
              </Button>
              <Button type="primary" onClick={this.handleRecord}>
                <Icon type="search" />记录查询
              </Button>
              <IncomeTable
                userList={userList}
              />
            </IceContainer>
          ) : null
        }

      </div>
    );
  }
}
