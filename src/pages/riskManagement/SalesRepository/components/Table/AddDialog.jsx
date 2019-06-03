import React, { Component } from 'react';
import { Dialog, Button, Icon, Form, Input, Field, Select } from '@alifd/next';

const FormItem = Form.Item;

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
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
      this.props.addData(values);
      this.setState({
        visible: false
      });
    });
  };

  onOpen = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };


  render() {
    const { organizationList } = this.state;
    const init = this.field.init;
    const formItemLayout = {
      labelCol: {
        fixedSpan: 8
      },
      wrapperCol: {
        span: 14
      }
    };

    return (
      <div style={styles.editDialog}>
        <Button
          type="primary"
          style={{ marginBottom: '10px' }}
          onClick={() => this.onOpen()}
        >
          <Icon type="add" /> 入库
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="入库"
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
