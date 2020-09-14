import * as React from 'react';
import axios from 'axios';
import HeaderPanel from "../ui/HeaderPanel";
import DataTable from "../ui/DataTable";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
    //@ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface UserDataProps {
}

export interface UserDataState {
    userData: string[];
    loading: boolean;
    status: number;
    error: string;
    showDeleteDialog: boolean;
    deleteId: string;
    deleteName: string;
    showFormDialog: boolean;
    newUsername: string
    newEmail: string
    userCount: string;
}

export default class UserData extends React.Component<UserDataProps, UserDataState> {
    constructor(props: UserDataProps) {
        super(props);
        this.state = {
            userData: [],
            loading: false,
            status: NaN,
            error: '',
            showDeleteDialog: false,
            deleteId: '',
            deleteName: '',
            showFormDialog: false,
            newUsername: '',
            newEmail: '',
            userCount: '',
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.createUser = this.createUser.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleFormClose = this.handleFormClose.bind(this);
        this.handleUsernameField = this.handleUsernameField.bind(this);
        this.handleEmailField = this.handleEmailField.bind(this);
    }

    componentDidMount() {
        this.loadData();
        this.getUserCount();
    };

    private loadData() {
        if (this.state.loading) {
            return;
        }

        this.setState({status: NaN, error: '', loading: true});

        axios.get('http://localhost:8080/users',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                this.setState({userData: response.data.results, status: response.status, loading: false});
            })
            .catch(error => {
                console.log(error)
            });
    }
    private getUserCount() {
        this.setState({userCount: ''});

        axios.get('http://localhost:8080/usercount',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                this.setState({userCount: response.data});
            })
            .catch(error => {
                console.log(error)
            });
    }

    deleteUser = (id: string, name: string) => {
        this.setState({showDeleteDialog: true, deleteId: id, deleteName: name});
    }

    handleClose = () => {
        this.setState({showDeleteDialog: false, deleteId: '', deleteName: ''});
    }

    handleDelete = () => {
        const id = this.state.deleteId;
        axios.get('http://localhost:8080/delete',
            {
                params: {
                    'id': id,
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                this.loadData();
                this.getUserCount();
            })
            .catch(error => {
                console.log(error)
            });
        this.handleClose();
    }

    createUser = () => {
        this.setState({showFormDialog: true});
    }

    handleFormClose = () => {
        this.setState({showFormDialog: false, newUsername: '', newEmail: ''});
    }

    handleCreate = () => {
        const username = this.state.newUsername;
        const email = this.state.newEmail;
        axios.get('http://localhost:8080/create',
            {
                params: {
                    'username': username,
                    'email': email,
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                this.loadData();
                this.getUserCount();
            })
            .catch(error => {
                console.log(error)
            });
        this.handleFormClose();
    }

    handleUsernameField(event: any, value: any): void {
        event.persist();
        this.setState({newUsername: event.target.value});
    }

    handleEmailField(event: any): void {
        event.persist();
        this.setState({newEmail: event.target.value});
    }

    render() {
        let createButton;
        if (this.state.newUsername.length > 0 && this.state.newEmail.length > 0) {
            createButton =
                <Button onClick={this.handleCreate} color="primary">
                    Create
                </Button>
        } else {
            createButton =
                <Button disabled onClick={this.handleCreate} color="primary">
                    Create
                </Button>
        }

        return (
            <div>
                <HeaderPanel userCount= {this.state.userCount} onAddUser={this.createUser}/>
                <DataTable data={this.state.userData} onUserDelete={this.deleteUser}/>

                <Dialog
                    open={this.state.showDeleteDialog}
                    //@ts-ignore
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Delete User"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to delete user {this.state.deleteName}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDelete} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.showFormDialog}
                    //@ts-ignore
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleFormClose}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create User</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Username"
                            type="name"
                            fullWidth
                            value={this.state.newUsername}
                            //@ts-ignore
                            onChange={this.handleUsernameField}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            value={this.state.newEmail}
                            //@ts-ignore
                            onChange={this.handleEmailField}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleFormClose} color="primary">
                            Cancel
                        </Button>
                        {createButton}
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

