import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import classNames from 'classnames'

class NormalLoginForm extends React.Component {
  state = {
    isShowGreeting: false,
    isShowBlindfold: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // password: "2"
      // remember: false
      // userName: "2"
      if (!err) {
        this.loginHandle({
          userName: values.userName,
          password: values.password
        })
      }
    });
  }

  loginHandle = (data) => {
    window.$http.post('/api/login', data)
      .then(res => {
        if (res.success === 100) {
          this.props.history.push('/home')
          message.success('登录成功！');
        } else {
          message.error('用户名或密码不正确！');
        }
      })
      .catch((e) => {
        console.log(e);
      })
  }

  inputOnFocus (type) {
    this.setState({
      [`isShow${type}`]: true
    })
  }

  inputOnBlur(type) {
    this.setState({
      [`isShow${type}`]: false
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const classes = classNames('panfish', {
      'show-greeting': this.state.isShowGreeting,
      'show-blindfold': this.state.isShowBlindfold
    })
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <div className={classes}>
          <div className="normal"></div>
          <div className="greeting"></div>
          <div className="blindfold"></div>
        </div>
        <h2 className="title">登录</h2>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }]
          })(
            <Input size="large" autoComplete="off" prefix={
              <Icon type="user" style={{ color: '#bbb' }} />
            } placeholder="请输入用户名"
              onFocus={() => this.inputOnFocus('Greeting')}
              onBlur={() => this.inputOnBlur('Greeting')}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }]
          })(
            <Input size="large" autoComplete="off" prefix={
              <Icon type="lock" style={{ color: '#bbb' }} />
            } type="password" placeholder="请输入密码"
              onFocus={() => this.inputOnFocus('Blindfold')}
              onBlur={() => this.inputOnBlur('Blindfold')}
            />
          )}
        </Form.Item>
        {/* {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(
          <Checkbox style={{ marginBottom: '20px' }}>记住我</Checkbox>
        )} */}
        {/* <Form.Item> */}
          {/* <a className="login-form-forgot" href="www.baidu.com">Forgot password</a> */}
          {/* Or <a href="www.baidu.com">register now!</a> */}
        {/* </Form.Item> */}
        <Button type="primary" size="large" htmlType="submit"
          className="login-form-button">登录</Button>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(NormalLoginForm);

export default class extends Component {
  render () {
    return (
      <div className="login-page">
        <div className="login-form-wrap">
          <WrappedRegistrationForm {...this.props}/>
        </div>
      </div>
    )
  }
}
