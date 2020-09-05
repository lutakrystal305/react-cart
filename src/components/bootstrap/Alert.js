import React from "react";
import { UncontrolledAlert } from "reactstrap";

function AlertExample(props) {
  return <UncontrolledAlert color="danger">{props.children}</UncontrolledAlert>;
}

export default AlertExample;
    