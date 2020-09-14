import React from 'react';
//import * as renderer from "react-test-renderer";
import {shallow} from 'enzyme';
import * as Enzyme from 'enzyme';
import DataTable from "../DataTable";
import Button from "@material-ui/core/Button";
import ReactTable from 'react-table';

export const dataTableProps = {
  onUserDelete: jest.fn(),
  data: [{created: '12/03/2019', email: 'sfgsdf@gmail.com', firstName: 'Henry', id: '33'}],
}

describe('DataTable tests', () => {
  const getMountedForm = () => {
    return Enzyme.mount(<DataTable {...dataTableProps} />);
  };

  // it('renders DataTable correctly', () => {
  //   const render = renderer.create(
  //       <DataTable {...dataTableProps} />).toJSON();
  //   expect(render).toMatchSnapshot();
  // });

  it('renders without crashing', () => {
    shallow(<DataTable {...dataTableProps} />);
  });

  it('delete button is clicked', () => {
    const wrapper = getMountedForm();
    const button = wrapper.find(Button);
    expect(button.length).toBe(1);

    button.at(0).simulate('click');
    expect(dataTableProps.onUserDelete).toBeCalled();
  });

  it('column header is clicked', () => {
    const wrapper = getMountedForm();
    const setSortOrderSpy = jest.spyOn(wrapper.instance(), 'setSortOrder');
    const table = wrapper.find(ReactTable);
    expect(table.length).toBe(1);
    const columnHeader = table.find('.rt-resizable-header');
    expect(columnHeader.length).toBe(8);
    columnHeader.at(0).simulate('click');
    expect(setSortOrderSpy.mock.calls.length).toEqual(1);
  });
});