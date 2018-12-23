import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

class NormalLoginForm extends React.Component {
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

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h2 className="title">Ryanx Chen&#x27; blog admin</h2>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }]
          })(
            <Input size="large" autoComplete="off" prefix={
              <Icon type="user" style={{ color: '#1890ff' }} />
            } placeholder="请输入用户名" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }]
          })(
            <Input size="large" autoComplete="off" prefix={
              <Icon type="lock" style={{ color: '#1890ff' }} />
            } type="password" placeholder="请输入密码" />
          )}
        </Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(
          <Checkbox style={{ marginBottom: '20px' }}>记住我</Checkbox>
        )}
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
