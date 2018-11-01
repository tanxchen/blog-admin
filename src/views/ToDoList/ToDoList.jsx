import React, { Component } from 'react'
import { Input, Checkbox, Button } from 'antd'
const Search = Input.Search

export default class extends Component {
  state = {
    currentList: [],
    overList: [],
    iptVal: ''
  }

  onSearch (value) {
    this.setState({
      [`currentList`]: [ ...this.state[`currentList`], value ],
      iptVal: ''
    })
  }

  onChange (index, val, type1) {
    const type2 = type1 === 'current' ? 'over' : 'current'
    this.setState({
      [`${type1}List`]: this.state[`${type1}List`].filter((item, i) => {
        return index !== i
      }),
      [`${type2}List`]: [ ...this.state[`${type2}List`], val ]
    })
  }

  remove (index, type) {
    this.setState({
      [`${type}List`]: this.state[`${type}List`].filter((item, i) => {
        return index !== i
      })
    })
  }

  render () {
    return (
      <div className="todolist">
        <h1>ToDoList</h1>
        <div className="todolist-main">
          <Search
            placeholder="添加 ToDo"
            enterButton="添加"
            value={this.state.iptVal}
            onSearch={value => this.onSearch(value)}
            onChange={e => this.setState({
              iptVal: e.target.value
            })}
            style={{ width: 300 }}
          />
          <br/>
          <br/>
          <h2>正在进行：{this.state.currentList.length}</h2>
          {
            this.state.currentList.map((item, index) => {
              return (<p key={index} className="todolist-row">
                <Checkbox
                  onChange={() => this.onChange(index, item, 'current')}
                  checked={false}
                >{item}</Checkbox>
                <Button
                  type="danger"
                  size="small"
                  onClick={() => this.remove(index, 'current')}
                >删除</Button>
              </p>)
            })
          }
          <h2>已完成：{this.state.overList.length}</h2>
          {
            this.state.overList.map((item, index) => {
              return (<p key={index} className="todolist-row">
                <Checkbox
                  onChange={() => this.onChange(index, item, 'over')}
                  checked={false}
                >{item}</Checkbox>
                <Button
                  type="danger"
                  size="small"
                  onClick={() => this.remove(index, 'over')}
                >删除</Button>
              </p>)
            })
          }
        </div>
      </div>
    )
  }
}
