import React, { Component } from "react";

// export class Home extends Component {
//   return
// }

export function Chat() {
  const props = this.props;
  return (
    <>
      {props.map(prop => {
        return <a> prop </a>;
      })}
    </>
  );
}
