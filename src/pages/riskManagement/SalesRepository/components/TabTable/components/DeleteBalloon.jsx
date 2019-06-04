import React, { Component } from 'react';
import { Button, Balloon } from '@alifd/next';

import PropTypes from 'prop-types';

export default class DeleteBalloon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handleHide = (visible, code) => {
    if (code === 1) {
      this.props.deleteData();
    }
    this.setState({
      visible: false
    });
  };

  handleVisible = (visible) => {
    this.setState({ visible });
  };

  render() {
    const visibleTrigger = (
      <Button type="normal" warning>
        删除
      </Button>
    );

    const content = (
      <div>
        <div style={styles.contentText}>确认删除？</div>
        <Button
          id="confirmBtn"
          type="normal"
          warning
          style={{ marginRight: '5px' }}
          onClick={(visible) => this.handleHide(visible, 1)}
        >
          确认
        </Button>
        <Button
          id="cancelBtn"
          onClick={(visible) => this.handleHide(visible, 0)}
        >
          关闭
        </Button>
      </div>
    );

    return (
      <Balloon
        trigger={visibleTrigger}
        triggerType="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisible}
      >
        {content}
      </Balloon>
    );
  }
}

const styles = {
  contentText: {
    padding: '5px 0 15px'
  }
};
