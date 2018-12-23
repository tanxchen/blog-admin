import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values, this.props);
        // password: "2"
        // remember: false
        // userName: "2"
        // if (values.userName === 'blog-admin' && values.password === '1234') {
        this.props.history.push('/home')
        // }
      }
    });
  }

  validatorUserName = (rule, value, callback) => {
    // const form = this.props.form;
    // form.getFieldValue('password')
    if (value && value !== 'blog-admin') {
      callback('用户名不正确');
    } else {
      callback();
    }
  }

  validatorPassword = (rule, value, callback) => {
    // const form = this.props.form;
    // form.getFieldValue('password')
    if (value && value !== '1234') {
      callback('密码不正确');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h2 className="title">Ryanx Chen&#x27; back end of blog</h2>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [
              { required: true, message: '请输入用户名' },
              { validator: this.validatorUserName }
            ],
          })(
            <Input size="large" autoComplete="off" prefix={
              <Icon type="user" style={{ color: '#1890ff' }} />
            } placeholder="请输入用户名" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码' },
              { validator: this.validatorPassword }
            ],
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
