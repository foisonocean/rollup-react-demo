import * as React from 'react'

export default class App extends React.PureComponent<{}, {}> {
  state = {
    count: 1,
  }

  handleButtonClick = () => {
    this.setState((prevState: {count: number}) => ({
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
