import React, { Component } from "react";
import "./Blackboard.css";

class Blackboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notice: this.props.notice,
      inputBoxDisplay: "none"
    };
  }
  blackboardDoFix() {
    this.setState({
      inputBoxDisplay: "block"
    });
  }
  blackboardDoSubmit() {
    this.props.sendNotice({ notice: this.state.notice });
    this.setState({
      inputBoxDisplay: "none"
    });
  }
  blackboardDoChange(e) {
    const newValue = e.target.value;
    this.setState({ notice: newValue });
  }
  render() {
    const blackboardDoChange = e => this.blackboardDoChange(e);
    const inputBoxStyle = {
      display: this.state.inputBoxDisplay
    };
    return (
      <div className="Blackboard-layout">
        <div className="Blackboard-title">공지사항</div>
        <button
          className="Blackboard-fixButton"
          onClick={() => this.blackboardDoFix()}
        >
          수정
        </button>
        <button
          className="Blackboard-updateButton"
          onClick={() => this.blackboardDoSubmit()}
        >
          적용
        </button>
        <pre className="Blackboard-notice">{this.state.notice}</pre>
        <textarea
          className="Blackboard-inputBox"
          value={this.state.notice}
          onChange={blackboardDoChange}
          style={inputBoxStyle}
        />
      </div>
    );
  }
}

export default Blackboard;
