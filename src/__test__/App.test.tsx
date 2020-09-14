import React from 'react';
import App from '../App';
//import * as renderer from "react-test-renderer";
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<App />);
});

// it('renders App correctly', () => {
//   const render = renderer.create(
//       <App/>).toJSON();
//   expect(render).toMatchSnapshot();
// });

