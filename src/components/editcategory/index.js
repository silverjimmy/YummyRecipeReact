import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { browserHistory } from 'react-router';
import swal from 'sweetalert';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class Editcategory extends Component {
    constructor(props) {
        super(props);
        // default state
        this.state = {
            open: false,
            erroropen: false,
            token: '',
            items: [],
            name: '',
            description: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updatecategory = this.updatecategory.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen = (event) => {
        event.preventDefault();
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleNameChange = (event) => {
        event.preventDefault();
        // update the state with new value from input
        const field = event.target.name;
        const category = this.state;
        category[field] = event.target.value;
        this.setState({ category });
        console.log(category);
    };

    handleSubmit = (event, category_id) => {
        // prevent the default browser action
        event.preventDefault();

        if (this.state.name === '' || this.state.description === '') {
            // error empty inputs
        }
        this.updatecategory(category_id);
        this.setState({ open: false });
        swal('Category has been Updated', '', 'success');
    };
    componentWillMount() {
        if (typeof localStorage !== undefined) {
            // store the token
            const token = localStorage.getItem('yummy_token');
            if (token === null) {
                swal('Token not found, please login again', '', 'error');
            } else {
                // console.log("token", token);
                this.setState({
                    token,
                });
            }
        }
    }

    componentDidMount() {
        const _this = this;
        const url = `http://127.0.0.1:5000/category/${this.props.category_id}`;
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('yummy_token'),
            }),
        })
            .then(response => response.json())
            .then((category) => {
                _this.setState({
                    name: category.category.title,
                    description: category.category.description,
                });

                console.log(category);
            })
            .catch((e) => {});
    }

    // make request to the api
    updatecategory(category_id) {
        const _this = this;
        const url = `http://127.0.0.1:5000/category/${category_id}`;
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(this.state),
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: this.state.token,
            }),
        })
            .then(resp => resp.json()) // Transform the data into json
            .then((data) => {
                // Create and append the li's to the ul
                if (data.status === 'success') {
                    // login was successful
                    browserHistory.push({
                        pathname: '/dashboard',
                    });
                    _this.setState({
                        item: data.items,
                    });
                } else {
                    _this.setState({
                        error: data.message,
                        // open: true
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
                label="Save"
                primary
                keyboardFocused
                onClick={event =>
                    this.handleSubmit(event, this.props.category_id, 'info')
                }
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Edit Category"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <form method="POST" action="">
                        <div>
                            <TextField
                                name="name"
                                value={this.state.name}
                                hintText="name"
                                onChange={this.handleNameChange}
                            />
                        </div>
                        <div>
                            <TextField
                                type="Description"
                                name="description"
                                value={this.state.description}
                                hintText="Description"
                                onChange={this.handleNameChange}
                            />
                        </div>
                    </form>
                </Dialog>
                <span className="symbol">
                    <img
                        src={`${process.env.PUBLIC_URL}/images/edit.svg`}
                        onClick={event => this.handleOpen(event)}
                    />
                </span>
            </div>
        );
    }
}

export default Editcategory;
