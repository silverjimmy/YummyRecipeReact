import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Search from 'react-search';
import Pagination from 'material-ui-pagination';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import swal from 'sweetalert';
import YummyRecipeCard from '../card/YummyRecipeCard';
import './search.css';
import './dashboard.css';
import NewCategory from '../newcategory';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            searchedCategories: [],
            totalSearchPages: null,
            searchPageNumber: null,
            items: [],
            token: '',
            error: '',
            open: false,
            total: 5,
            page: 1,
        };

        this.handlePageChange = this.handlePageChange.bind(this);
    }
    componentDidMount() {
        if (typeof localStorage !== undefined) {
            const token = localStorage.getItem('yummy_token');
            if (token === null) {
                swal('Token not found, please login again', '', 'error');
                browserHistory.push({
                    pathname: '/login',
                });
            } else {
                this.setState(
                    {
                        token,
                    },
                    () => {
                        this.fetchCategory();
                    },
                );
            }
        }
    }
    handleClose = () => {
        this.setState({ open: false });
    };

    redirectTo(event, category_id, category_name) {
        browserHistory.push({
            pathname: `/category/${category_id}`,
            state: {
                title: category_name,
            },
        });
    }

    HiItems(items) {
        console.log(items);
    }

    handlePageChange(number) {
        const _this = this;
        _this.setState({ page: number }, () => {
            if (this.state.searchedCategories.length) {
                this.getItemsAsync(this.state.searchterm);
            } else {
                this.fetchCategory();
            }
        });
    }

    getItemsAsync(searchValue, cb) {
        const _this = this;
        if (searchValue === '') {
            _this.setState({ searchedCategories: [] });
            return;
        }

        const url = `https://yummy-recipev2.herokuapp.com//category/?limit=3&q=${searchValue}&page=${
            _this.state.page
        }`;
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: this.state.token,
            }),
        })
            .then(res => res.json())
            .then((results) => {
                if (results !== undefined) {
                    _this.setState({
                        searchedCategories: results.categories,
                        totalSearchPages: results.total,
                        searchPageNumber: results.current_page,
                        searchterm: searchValue,
                    });
                }
            });
    }

    fetchCategory() {
        const _this = this;

        const url = `https://yummy-recipev2.herokuapp.com//category/?limit=3&page=${
            _this.state.page
        }`;
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: this.state.token,
            }),
        })
            .then(resp => resp.json()) // Transform the data into json
            .then((data) => {
                _this.setState({
                    categories: data.categories,
                    total: data.total,
                    number: data.current_page,
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        const actions = [
            <FlatButton label="Discard" primary onTouchTap={this.handleClose} />,
        ];

        const categoriesToRender = this.state.searchedCategories.length
            ? this.state.searchedCategories
            : this.state.categories;
        const total = this.state.searchedCategories.length
            ? this.state.totalSearchPages
            : this.state.total;
        const number = this.state.searchedCategories.length
            ? this.state.searchPageNumber
            : this.state.number;
        return (
            <div id="main">
                <Search
                    items={this.state.reps}
                    multiple
                    getItemsAsync={this.getItemsAsync.bind(this)}
                    placeholder="Search your categories"
                />
                <div className="inner">
                    <header id="header">
                        <h1>Yummy Recipes</h1>
                        <h4>Categories</h4>
                    </header>
                    <br />
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        {this.state.error !== '' && this.state.error}
                    </Dialog>
                    <div>
                        <NewCategory />
                        <br />
                        <YummyRecipeCard
                            redirect={this.redirectTo}
                            categories={categoriesToRender}
                        />
                        <br />
                        <br />
                        <Pagination
                            total={total}
                            current={number}
                            display={total}
                            onChange={this.handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
