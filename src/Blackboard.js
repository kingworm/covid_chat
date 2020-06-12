import React, { Component } from "react";
import "./Blackboard.css";

class Blackboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notice: "",
      inputBoxDisplay: "none",
      buttonValue: "수정"
    };
  }
  blackboardDoFix() {
    this.setState({
      inputBoxDisplay: "block"
    });
  }
  blackboardDoSubmit() {
    this.props.sendNotice({ notice: this.state.notice });
    if (this.state.buttonValue === "적용") {
      this.setState({
        inputBoxDisplay: "none",
        buttonValue: "수정"
      });
    } else {
      this.setState({
        inputBoxDisplay: "block",
        buttonValue: "적용"
      });
    }
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
          className="Blackboard-updateButton"
          onClick={() => this.blackboardDoSubmit()}
        >
          {this.state.buttonValue}
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
