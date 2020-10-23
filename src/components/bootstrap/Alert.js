import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const AlertExample = (props) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color="danger" isOpen={visible} toggle={onDismiss}>
      {props.children}
    </Alert>
  );
}

export default AlertExample;