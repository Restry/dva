import React from 'react';
import { connect } from 'dva';
import LocaleSample from '../components/LocaleSample';
// import MainLayout from '../components/MainLayout/MainLayout';

function LocaleSampleComponent({ location }) {
  return ( 
      <LocaleSample /> 
  );
}

export default connect()(LocaleSampleComponent);
