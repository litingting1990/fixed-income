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
        console.log('Errors in form!!!');
        return;
      }
      this.props.updateData(values);
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
        <Button type="primary" onClick={() => this.onOpen(index, record)}>
        调整
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="调整"
        >
          <Form field={this.field}>
            <FormItem label="机构" {...formItemLayout}>
              <Input
                {...init('organization', {
                  rules: [{ required: true, message: '必填选项' }]
                })}
              />
            </FormItem>

            <FormItem label="机构全称" {...formItemLayout}>
              <Input
                {...init('organizationName', {
                  rules: [{ required: true, message: '必填选项' }]
                })}
              />
            </FormItem>

            <FormItem label="级别" {...formItemLayout}>
              <Input
                {...init('level', {
                  rules: [{ required: true, message: '必填选项' }]
                })}
              />
            </FormItem>

            <FormItem label="入库原因" {...formItemLayout}>
              <Input
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
