import React from 'react';
import { Spin } from 'antd';
import { SpinSize } from 'antd/es/spin';

import './Loader.css';

type Props = {
  size: SpinSize;
};

export const Loader = (props: Props) => (
  <div className="loader">
    <Spin {...props} />
  </div>
);
