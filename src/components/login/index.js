import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import './login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        // default state
        this.state = {
            error: '',
            open: false,
        };
        /* by default in the function scope, this refers to the function scope
          we need to bind the this object to the function in order to change
          the value of inside the function scope
         */
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleNameChange(event) {
        // update the state with new value from input
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    redirectTo(event, username) {
        // event.preventDefault();
        console.log('redirecting');
        browserHistory.push({
            pathname: '/dashboard',
            state: { username },
        });
    }

    handleSubmit(event) {
        // prevent the default browser action
        event.preventDefault();

        if (this.state.username === '' || this.state.password === '') {
            // error empty inputs
        }
        // make request to the api
        const _this = this;
        const url = 'http://127.0.0.1:5000/auth/login';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(this.state),
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
            .then(resp => resp.json()) // Transform the data into json
            .then((data) => {
                console.log(data);
                if (data.status === 'success') {
                    // login was successful
                    _this.setState({
                        error: data.message,
                        open: true,
                    });
                    // store token in the browser localStorage

                    if (typeof localStorage !== undefined) {
                        // store the token
                        localStorage.setItem('yummy_token', data.auth_token);
                    }

                    _this.redirectTo(event, _this.state.username);
                } else {
                    _this.setState({
                        error: data.message,
                        open: true,
                    });
                }
            })
            .catch((e) => {});
    }

    render() {
        const actions = [
            <FlatButton
                label="Discard"
                primary
                onTouchTap={this.handleClose}
            />,
        ];
        return (
            <div>
                <section className="tiles">
                    <article>
                        <span className="image">
                            <img
                                src={`${process.env.PUBLIC_URL}/images/pic13.jpg`}
                                alt=""
                            />
                        </span>
                        <a>
                            <h2> Yummy Recipes </h2>
                            <div className="content">
                                <h4> Sign In</h4>
                                <form method="POST" action="" id="login_form">
                                    <div className="error">
                                        <Dialog
                                            actions={actions}
                                            modal={false}
                                            open={this.state.open}
                                            onRequestClose={this.handleClose}
                                        >
                                            {this.state.error !== '' &&
                                                this.state.error}
                                        </Dialog>
                                    </div>
                                    <div>
                                        <TextField
                                            id="username"
                                            name="username"
                                            hintText="username"
                                            onChange={this.handleNameChange}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            id="password"
                                            type="password"
                                            name="password"
                                            hintText="password"
                                            onChange={this.handleNameChange}
                                        />
                                    </div>
                                    <FlatButton
                                        label="Login"
                                        type="submit"
                                        onClick={this.handleSubmit}
                                    />
                                </form>
                            </div>
                        </a>
                    </article>
                </section>
            </div>
        );
    }
}

export default Login;
