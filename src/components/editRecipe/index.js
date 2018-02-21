import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import swal from 'sweetalert';

/**
 * Dialog with action buttons. The actions are passed in as an array
 * of React objects, in this example [FlatButtons]
 * (/#/components/flat-button).
 * You can also close this dialog by clicking outside the dialog,
 * or with the 'Esc' key.
 */
class EditRecipe extends Component {
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
        this.updaterecipe = this.updaterecipe.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleNameChange = (event) => {
        event.preventDefault();
        // update the state with new value from input
        const field = event.target.name;
        const recipe = this.state;
        recipe[field] = event.target.value;
        this.setState({ recipe });
        console.log(this.state.name);
    };

    handleSubmit = (event, category_id, item_id) => {
        // prevent the default browser action
        event.preventDefault();

        if (this.state.name === '' || this.state.description === '') {
            // error empty inputs
        }
        this.updaterecipe(category_id, item_id);
        this.setState({ open: false });
        swal('Recipe has been updated', '', 'success');
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

    handleOpen = (event) => {
        event.preventDefault();
        this.setState({ open: true });
    };

    componentDidMount() {
        const _this = this;
        const url = `https://yummy-recipev2.herokuapp.com//category/${
            this.props.category_id
        }/recipe/${this.props.item_id}`;
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('yummy_token'),
            }),
        })
            .then(response => response.json())
            .then((recipe) => {
                _this.setState({
                    name: recipe.recipe_name,
                    description: recipe.recipe_description,
                });

                console.log(recipe);
            })
            .catch((e) => {});
    }

    // make request to the api
    updaterecipe = (category_id, item_id) => {
        this.setState({ recipeId: item_id, categoryId: category_id });
        const _this = this;
        const url = `https://yummy-recipev2.herokuapp.com//category/${category_id}/recipe/${item_id}`;
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(this.state),
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('yummy_token'),
            }),
        })
            .then(resp => resp.json()) // Transform the data into json
            .then((data) => {
                // Create and append the li's to the ul
                if (data.status === 'success') {
                    this.props.fetchRecipes();
                    // login was successful
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
    };

    render() {
        const actions = [
            <FlatButton label="Cancel" primary onClick={this.handleClose} />,
            <FlatButton
                label="Save"
                primary
                keyboardFocused
                onClick={event =>
                    this.handleSubmit(
                        event,
                        this.props.category_id,
                        this.props.item_id,
                        'info',
                    )
                }
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Edit Recipe"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <form method="POST" action="">
                        <div>
                            <TextField
                                id="name"
                                name="name"
                                value={this.state.name}
                                hintText="name"
                                onChange={this.handleNameChange}
                            />
                        </div>
                        <div>
                            <TextField
                                id="description"
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

export default EditRecipe;
