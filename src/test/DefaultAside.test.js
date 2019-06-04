import React from 'react';
import ReactDOM from 'react-dom';
import DefaultAside from '../containers/DefaultLayout/DefaultAside';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DefaultAside />, div);
  ReactDOM.unmountComponentAtNode(div);
});
