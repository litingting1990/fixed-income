import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field } from '@alifd/next';

const FormItem = Form.Item;

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.field = new Field(this);
  }

  handleSubmit = () => {
    this.field.validate((errors, values) => {
      if (errors) {
        return;
      }
      this.props.deleteData(values);
      this.setState({
        visible: false
      });
    });
  };

  onOpen = (index, record) => {
    this.field.setValues({ ...record });
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
    const init = this.field.init;

    const { index, record } = this.props;

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
        <Button type="normal" warning onClick={() => this.onOpen(index, record)}>
        出库
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="出库"
        >
          <Form field={this.field}>
            <FormItem label="机构简称" {...formItemLayout}>
              <Input
                disabled
                {...init('orgname')}
              />
            </FormItem>

            <FormItem label="机构全称" {...formItemLayout}>
              <Input
                disabled
                {...init('orgfullname')}
              />
            </FormItem>

            <FormItem label="等级" {...formItemLayout}>
              <Input
                disabled
                {...init('grade')}
                value={init('grade').value === 0 ? '黑名单' : '灰名单'}
              />
            </FormItem>

            <FormItem label="状态" {...formItemLayout}>
              <Input
                disabled
                {...init('status')}
                value={init('status').value === 0 ? '在库' : '已出库'}
              />
            </FormItem>
            <FormItem label="入库申请人名称" {...formItemLayout}>
              <Input
                disabled
                {...init('putapplicanter')}
              />
            </FormItem>

            <FormItem label="出库原因" required {...formItemLayout}>
              <Input.TextArea
                placeholder="请输入出库原因"
                {...init('reason', {
                  rules: [{ required: true, message: '必填选项' }]
                })}
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
