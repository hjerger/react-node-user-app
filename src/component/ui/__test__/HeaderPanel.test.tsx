import React from 'react';
//import * as renderer from "react-test-renderer";
import {shallow} from 'enzyme';
import HeaderPanel from "../HeaderPanel";
import * as Enzyme from 'enzyme';
import IconButton from '@material-ui/core/IconButton';

export const headerPanelProps = {
  onAddUser: jest.fn(),
  userCount: '1',
}

describe('HeaderPanel tests', () => {
  const getMountedForm = () => {
    return Enzyme.shallow(<HeaderPanel {...headerPanelProps} />);
  };

  // it('renders HeaderPanel correctly', () => {
  //   const render = renderer.create(
  //       <HeaderPanel {...headerPanelProps} />).toJSON();
  //   expect(render).toMatchSnapshot();
  // });

  it('renders without crashing', () => {
    shallow(<HeaderPanel {...headerPanelProps}/>);
  });

  it('add user button is clicked', () => {
    const wrapper = getMountedForm();
    const button = wrapper.find(IconButton);
    expect(button.length).toBe(1);

    button.at(0).simulate('click');
    expect(headerPanelProps.onAddUser).toBeCalled();
  });
});