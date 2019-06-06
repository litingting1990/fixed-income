/* eslint react/jsx-no-bind: 0 */
import React, { Component } from 'react';
import axios from 'axios';
import IceContainer from '@icedesign/container';
import { Table, Button, Icon } from '@alifd/next';
import { getOrgList, getUserList, addData } from '@api/riskManagement/SalesRepository';
import { success } from '@utils/iceNotification';
import CellEditorInput from './CellEditorInput';
import CellEditorSelect from './CellEditorSelect';
import CellEditorRadio from './CellEditorRadio';
import './EditableTable.scss';


export default class EditableTable extends Component {
  static displayName = 'EditableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      orgList: [],
      userList: []
    };
  }
  getOrgAndUser = () => {
    axios.all([getOrgList(), getUserList()])
      .then(axios.spread((data1, data2) => {
        this.setState({
          orgList: data1.data.data,
          userList: data2.data.data
        });
      }));
  }

  deleteItem = (index) => {
    this.state.dataSource.splice(index, 1);
    this.setState({
      dataSource: this.state.dataSource
    });
  };

  addItem = (index, record) => {
    const params = { id: '', pid: '', title: '关于xxx销售对手库入库申请', direction: '0', applyuserid: '0', applyusername: '管理员' };

    params.details = [
      { id: '', fid: '', direction: '0', orgid: record.org.id, orgname: record.org.name, orgfullname: record.org.fullname, grade1: record.grade, grade2: '0', reason: record.reason }

    ];
    addData(params).then(() => {

      this.state.dataSource[index].isIncome = !this.state.dataSource[index].isIncome;
      this.setState({
        dataSource: this.state.dataSource
      }, () => {
        success('入库成功');
      });
    });
  };

  renderOperation = (value, index, record) => {
    if (record.isIncome) {
      return (
        <Icon type="select" style={{ color: '#1DC11D' }} />
      );
    }
    return (
      <div>
        <Button
          onClick={this.addItem.bind(this, index, record)}
          type="primary"
          style={{ marginRight: '5px' }}
        >
          入库
        </Button>
        <Button
          onClick={this.deleteItem.bind(this, index)}
          type="normal"
          warning
        >
          删除
        </Button>
      </div>
    );
  };

  // 编辑框
  changeDataSource = (index, valueKey, value) => {
    this.state.dataSource[index][valueKey] = value;
    this.setState({
      dataSource: this.state.dataSource
    });
  };

  renderEditorInput = (valueKey, value, index, record) => {
    if (record.isIncome) {
      return (
        <span>{record[valueKey]}</span>
      );
    }
    return (
      <CellEditorInput
        valueKey={valueKey}
        index={index}
        value={record[valueKey]}
        onChange={this.changeDataSource}

      />
    );
  };

  // 下拉框
  changeSelectData = (value, index) => {

    this.state.dataSource[index].org = value;

    this.setState({
      dataSource: this.state.dataSource
    });

  }
  renderEditorSelect = (valueKey, value, index, record) => {
    const { orgList } = this.state;

    if (record.isIncome) {
      return (
        <span>{record[valueKey].name}</span>
      );
    }
    return (
      <CellEditorSelect
        key={valueKey}
        index={index}
        value={record[valueKey]}
        changeSelectData={this.changeSelectData}
        orgList={orgList}
      />
    );
  };

  changeRadioData = (value, index) => {

    this.state.dataSource[index].grade = value;

    this.setState({
      dataSource: this.state.dataSource
    });

  }

  renderEditorRadio = (valueKey, value, index, record) => {
    if (record.isIncome) {
      return (
        <span>{record[valueKey] === 0 ? '黑名单' : '灰名单'}</span>
      );
    }
    return (
      <CellEditorRadio
        key={valueKey}
        index={index}
        value={record[valueKey]}
        changeRadioData={this.changeRadioData}
      />
    );
  };

  addNewItem = () => {
    const { orgList } = this.state;

    this.state.dataSource.push({
      org: orgList[0],
      grade: 0,
      reason: '暂无',
      isIncome: false
    });
    this.setState({
      dataSource: this.state.dataSource
    });
  };
  componentWillMount() {
    this.getOrgAndUser();
  }
  render() {
    const { orgList } = this.state;

    return (
      <div className="editable-table">
        {
            orgList.length > 0 ? (
              <IceContainer>

                <Table dataSource={this.state.dataSource} hasBorder={false}>
                  <Table.Column
                    width={320}
                    title="机构"
                    align="center"
                    cell={this.renderEditorSelect.bind(this, 'org')}
                  />
                  <Table.Column
                    width={260}
                    title="级别"
                    align="center"
                    cell={this.renderEditorRadio.bind(this, 'grade')}
                  />
                  <Table.Column
                    title="入库原因"
                    align="center"
                    cell={this.renderEditorInput.bind(this, 'reason')}
                  />
                  <Table.Column
                    width={180}
                    title="操作"
                    align="center"
                    cell={this.renderOperation}
                  />
                </Table>
                <div onClick={this.addNewItem} style={styles.addNewItem}>
                + 新增一行
                </div>
              </IceContainer>
            ) : null
          }

      </div>
    );
  }
}

const styles = {
  addNewItem: {
    background: '#F5F5F5',
    height: 32,
    lineHeight: '32px',
    marginTop: 20,
    cursor: 'pointer',
    textAlign: 'center'
  }
};
