import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field, Select } from '@alifd/next';

const FormItem = Form.Item;

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex: null,
      organizationList: []
    };
    this.field = new Field(this);
  }


  componentWillMount() {
  }
  handleSubmit = () => {
    this.field.validate((errors, values) => {
      if (errors) {
        return;
      }
      const { dataIndex } = this.state;

      this.props.updateData(dataIndex, values);
      this.setState({
        visible: false
      });
    });
  };

  onOpen = (index, record) => {
    this.field.setValues({ ...record });
    this.setState({
      visible: true,
      dataIndex: index
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const init = this.field.init;

    const { index, record, serverStatue } = this.props;
    const { organizationList } = this.state;
    const formItemLayout = {
      labelCol: {
        fixedSpan: 6
      },
      wrapperCol: {
        span: 14
      }
    };

    return (
      <div style={styles.editDialog}>
        <Button type="primary" onClick={() => this.onOpen(index, record)}>
          编辑
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="编辑"
        >
          <Form field={this.field}>
            <FormItem label="组织:" required {...formItemLayout}>
              <Select
                name="organizationId"
                dataSource={organizationList}
                defaultValue={organizationList.length > 0 && organizationList[0].value}
                style={{ width: '100%' }}
              />
            </FormItem>
            <FormItem label="ipmi地址:" {...formItemLayout} required>
              <Input
                {...init('ipmiIp', {
                  rules: [{ required: true, message: '必填选项' }]
                })}
              />
            </FormItem>
            <FormItem label="状态:" required {...formItemLayout}>
              <Select
                name="serverStatue"
                dataSource={serverStatue}
                defaultValue={serverStatue[0].value}
                style={{ width: '100%' }}
              />
            </FormItem>
            <FormItem label="服务器名称:" required {...formItemLayout}>
              <Input
                {...init('serverName', {
                  rules: [{ required: true, message: '必填选项' }]
                })}
              />
            </FormItem>
            <FormItem label="机房:" required {...formItemLayout}>
              <Input
                {...init('engineRoom', {
                  rules: [{ required: true, message: '必填选项' }]
                })}
              />
            </FormItem>
            <FormItem label="主机型号:" required {...formItemLayout}>
              <Input
                {...init('serverType', {
                  rules: [{ required: true, message: '必填选项' }]
                })}
              />
            </FormItem>
            <FormItem label="CPU总核数:" {...formItemLayout} required>
              <Input
                htmlType="number"
                addonTextAfter="核"
                size="medium"
                style={{ width: '100%' }}
                aria-label="style width 400"
                {...init('cpuCoreTotal', {
                  rules: [{ required: true, message: '必填选项' }]
                })}
              />
            </FormItem>
            <FormItem label="内存大小:" {...formItemLayout} required>
              <Input
                htmlType="number"
                addonTextAfter="M"
                size="medium"
                style={{ width: '100%' }}
                aria-label="style width 400"
                {...init('ramTotal', {
                  rules: [{ required: true, message: '必填选项' }]
                })}
              />
            </FormItem>
            <FormItem label="磁盘大小:" {...formItemLayout} required>
              <Input
                htmlType="number"
                addonTextAfter="G"
                size="medium"
                style={{ width: '100%' }}
                aria-label="style width 400"
                {...init('diskTotal', {
                  rules: [{ required: true, message: '必填选项' }]
                })}
              />
            </FormItem>

            <FormItem label="描述:" {...formItemLayout}>
              <Input
                {...init('description')}
                value={init('description').value || ''}
              />
            </FormItem>
          </Form>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px'
  }
};
