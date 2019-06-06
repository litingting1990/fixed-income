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
      <div>
        <Button
          type="primary"
          onClick={() => this.onOpen()}
          style={{
            display: 'inline-block',
            marginBottom: '10px'
          }}
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


            <FormItem label="机构简称:" required {...formItemLayout}>
              <Input
                {...init('orgname', {
                  rules: [{ required: true, message: '必填选项' }]
                })}
              />
            </FormItem>
            <FormItem label="机构全称:" required {...formItemLayout}>
              <Input
                {...init('orgfullname', {
                  rules: [{ required: true, message: '必填选项' }]
                })}
              />
            </FormItem>


            <FormItem label="入库原因:" {...formItemLayout}>
              <Input
                {...init('reason')}
              />
            </FormItem>
          </Form>
        </Dialog>
      </div>
    );
  }
}


