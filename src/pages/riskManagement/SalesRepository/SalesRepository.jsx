import React, { Component } from 'react';
import axios from 'axios';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
import { getOrgList, getUserList } from '@api/riskManagement/SalesRepository';
import IncomeTable from './components/IncomeTable';


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
  componentWillMount() {
    this.getOrgAndUser();
  }
  render() {
    const { orgList, userList } = this.state;

    return (
      <div className="basic-table-page">
        {
          orgList.length > 0 ? (
            <IceContainer>
              <Tab onChange={this.handleTabChange}>
                <Tab.Item title="入库" key="income">
                  <IncomeTable
                    orgList={orgList}
                    userList={userList}
                  />
                </Tab.Item>
                <Tab.Item title="出库" key="outgoing">
                出库
                </Tab.Item>
                <Tab.Item title="调整" key="adjust">
                调整
                </Tab.Item>
                <Tab.Item title="申请" key="apply">
                申请
                </Tab.Item>
              </Tab>
            </IceContainer>
          ) : null
        }

      </div>
    );
  }
}
