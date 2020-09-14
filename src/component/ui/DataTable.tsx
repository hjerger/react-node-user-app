import * as React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

import './DataTable.css';

export interface DataTableProps {
    data: any[];
    onUserDelete: any;
}

export interface SortState {
   column: any;
   desc: any;
}

export default class DataTable extends React.Component<DataTableProps,SortState, {}> {
    constructor(props: DataTableProps) {
        super(props);
        this.state = {
        	column: undefined,
            desc: undefined
        };
        this.setSortOrder = this.setSortOrder.bind(this);
    }

    setSortOrder(id: any, sortOrder: any) {
        this.setState({
            column: id,
            desc: sortOrder
        });
    }
    
    render() {
        let dataLength = this.props.data.length;
        if (dataLength < 1) {
            return (<div></div>)
        }

        // @ts-ignore
        let tableColumns = [
            {
                Header: "Username",
                accessor: "username",
            }, {
                Header: "Email",
                accessor: "email"
            }, {
                Header: "Created",
                accessor: "created"
            }, {
            // @ts-ignore
                Cell: ({ original }) => (
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<DeleteIcon />}
                        value={original.id} onClick={() => this.props.onUserDelete(original.id, original.username)}>
                        Delete
                    </Button>
                )
            },
        ]

        return (
            <ReactTable
                data={this.props.data}
                columns={tableColumns}
                defaultPageSize={dataLength > 10 ? 10 : dataLength}
                className="-striped -highlight"
                showPagination={dataLength > 10}
                onSortedChange={(newSorted) => {
                    this.setSortOrder(newSorted[0].id, newSorted[0].desc);
                }}
            />
        )
    }
}
