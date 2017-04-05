import * as React from 'react';

export default class App extends React.PureComponent<{}, {}> {
  public state = {
    count: 1,
  };

  public render() {
    return (
      <div>
        { this.state.count }
        <button
          onClick={this.handleButtonClick}
        >
          add 1
        </button>
      </div>
    );
  }

  private handleButtonClick = () => {
    this.setState((prevState: {count: number}) => ({
      count: prevState.count + 1,
    }));
  }
}
