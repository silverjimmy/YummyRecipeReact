import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import swal from 'sweetalert';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

class NewCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            open: false,
            _open: false,
            token: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.setState({ _open: false });
    };

    handleNameChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            open: false,
        });
        if (this.state.name === '' || this.state.description === '') {
        }
        swal('Category Created', '', 'success');
        browserHistory.push({
            pathname: '/dashboard',
        });
        this.addcategory();
    }

    componentDidMount() {
        if (typeof localStorage !== undefined) {
            // store the token
            const token = localStorage.getItem('yummy_token');
            if (token === null) {
                swal('Token not found, please login again', '', 'error');
            } else {
                console.log('token', token);
                this.setState({
                    token,
                });
            }
        }
    }

    addcategory() {
        const _this = this;
        const url = 'https://yummy-recipev2.herokuapp.com//category/';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(this.state),
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: this.state.token,
            }),
        })
            .then(resp => resp.json()) // Transform the data into json
            .then((data) => {
                if (data.status === 'fail') {
                    _this.setState({
                        error: data.message,
                        _open: true,
                    });
                } else {
                    _this.setState({
                        error: data.message,
                        _open: true,
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        const actions = [
            <FlatButton label="Cancel" primary onClick={this.handleClose} />,
            <FlatButton
                label="Submit"
                primary
                keyboardFocused
                onClick={this.handleSubmit}
            />,
        ];
        const action = [
            <FlatButton label="Cancel" primary onClick={this.handleClose} />,
        ];

        return (
            <div>
                <a className="logo">
                    <span className="symbol">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/add.svg`}
                            onClick={this.handleOpen}
                            className="App-logo"
                            alt="Logo "
                        />
                    </span>
                    <span className="title" />
                </a>
                <Dialog
                    title="New Category"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <form method="POST" action="">
                        <div className="error" />
                        <div>
                            <TextField
                                name="name"
                                hintText="Name"
                                onChange={this.handleNameChange}
                            />
                        </div>
                        <div>
                            <TextField
                                type="Description"
                                name="description"
                                hintText="Description"
                                onChange={this.handleNameChange}
                            />
                        </div>
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default NewCategory;
