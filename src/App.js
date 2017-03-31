import React, { PureComponent } from 'react'

export default class App extends PureComponent {
  state = {
    count: 1,
  }

  handleButtonClick = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  render () {
    return (
      <div>
        { this.state.count }
        <button
          onClick={this.handleButtonClick}
        >
          add 1
        </button>
      </div>
    )
  }
}
