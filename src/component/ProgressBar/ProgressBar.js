import React from "react";
import "./ProgressBar.scss";
class ProgressBar extends React.Component {
  renderSteps() {
    const length = this.props.steps.length + 1;
    return this.props.steps.map((s, index) => (
      <div
        className={`${s.active ? "Step active" : "Step"}`}
        style={{ minWidth: `${100 / length}%` }}
        key={index}
      >
        <div className="filled"></div>
        <div className="Step-Content">
          <span className="Step-Number">{index + 1}</span>
          <span className="Step-Name">{s.name}</span>
        </div>
      </div>
    ));
  }
  render() {
    return (
      <div className="ProgressBar">
        {this.renderSteps()}
        <div
          className={this.props.lastStep ? "rest-bar active" : "rest-bar"}
        ></div>
      </div>
    );
  }
}

export default ProgressBar;
