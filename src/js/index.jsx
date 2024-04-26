import React from 'react';
import ReactDOM from 'react-dom';

import { Authentication, Board } from './components';

ReactDOM.render(
  <Authentication>
    <Board />
  </Authentication>,
  document.getElementById('root')
);
