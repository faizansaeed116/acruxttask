class Timer extends React.Component {
    constructor(props) {
      super(props);
      this.state = { seconds: 0 };
    }
  
    tick() {
      this.setState(state => ({
        seconds: state.seconds + 1
      }));
    }
  
    componentDidMount() {
      this.interval = setInterval(() => this.tick(), 1000);
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  
    render() {
      return (
        <div>
          Seconds: {this.state.seconds}
        </div>
      );
    }
}

class TestButton extends React.Component {
    handleClick() {
        //   return <Timer />
        const rootE2 = document.getElementById('Button_Test');
        ReactDOM.render(<Timer />, rootE2);
    }
  
    render() {
      // This syntax ensures `this` is bound within handleClick
      return (
        <button onClick={() => this.handleClick()}>
          Click me
        </button>
      );
    }
}
  

const rootE1 = document.getElementById('content_root');

const melement = <div class="row">
    <div class="col-md-6">
        <Timer />
    </div>

    <div class="col-md-6" id="Button_Test">
        <TestButton />
    </div>
</div>

ReactDOM.render(melement, rootE1);