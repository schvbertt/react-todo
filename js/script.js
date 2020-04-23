var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ------------------------TO DO INPUT
var TodoInput = function (_React$Component) {
    _inherits(TodoInput, _React$Component);

    function TodoInput() {
        _classCallCheck(this, TodoInput);

        return _possibleConstructorReturn(this, (TodoInput.__proto__ || Object.getPrototypeOf(TodoInput)).apply(this, arguments));
    }

    _createClass(TodoInput, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                item = _props.item,
                handleChange = _props.handleChange,
                handleSubmit = _props.handleSubmit,
                editItem = _props.editItem,
                deleteInput = _props.deleteInput,
                error = _props.error;


            return (
                // INPUT
                React.createElement(
                    'div',
                    { className: 'card card-body my-3' },
                    React.createElement(
                        'form',
                        { onSubmit: handleSubmit },
                        React.createElement(
                            'div',
                            { className: 'input-group mt-2' },
                            React.createElement(
                                'div',
                                { className: 'input-group-prepend' },
                                React.createElement(
                                    'div',
                                    { className: 'input-group-text bg-primary text-white' },
                                    React.createElement('i', { className: 'fas fa-book' })
                                )
                            ),
                            React.createElement('input', { type: 'text',
                                className: 'form-control',
                                placeholder: 'add a todo item',
                                value: item,
                                onChange: handleChange
                            }),
                            React.createElement(
                                'div',
                                { className: 'input-group-prepend' },
                                React.createElement(
                                    'div',
                                    {
                                        className: 'input-group-text bg-white text-danger',
                                        style: { cursor: 'pointer' },
                                        onClick: deleteInput
                                    },
                                    React.createElement('i', { className: 'fas fa-times' })
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'mt-2', style: { height: '30px' } },
                            error.show ? React.createElement(
                                'div',
                                {
                                    className: 'alert alert-' + error.type + ' text-center',
                                    style: { padding: '5px' },
                                    role: 'alert' },
                                error.text
                            ) : ''
                        ),
                        React.createElement(
                            'button',
                            { type: 'submit',
                                className: editItem ? 'btn btn-block btn-success mt-3' : 'btn btn-block btn-primary mt-3'
                            },
                            editItem ? 'Apply' : 'Add item'
                        )
                    )
                )
            );
        }
    }]);

    return TodoInput;
}(React.Component);

// ------------------------TO DO LIST


var TodoList = function (_React$Component2) {
    _inherits(TodoList, _React$Component2);

    function TodoList() {
        _classCallCheck(this, TodoList);

        return _possibleConstructorReturn(this, (TodoList.__proto__ || Object.getPrototypeOf(TodoList)).apply(this, arguments));
    }

    _createClass(TodoList, [{
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                items = _props2.items,
                clearList = _props2.clearList,
                _handleDelete = _props2.handleDelete,
                _handleEdit = _props2.handleEdit,
                searchItem = _props2.searchItem;


            var search = void 0;
            var myRender = void 0;

            // HANDLE SHOWING INFORMATION
            if (!!searchItem && items.length === 0) {
                search = 'No results';
            } else {
                search = '';
            }

            // if (search.length === 0 && items.length === 0) {
            //     myRender = "You're clear bro! :)"
            // } else {
            //     myRender = ''
            // }

            // SHOW BUTTON OR NOT
            var button = void 0;
            if (items.length > 0 && !!searchItem) {
                button = React.createElement(
                    'button',
                    { type: 'button',
                        className: 'btn btn-danger btn-block mt-5',
                        onClick: clearList
                    },
                    'Clear search list'
                );
            } else if (items.length > 0) {
                button = React.createElement(
                    'button',
                    { type: 'button',
                        className: 'btn btn-danger btn-block mt-5',
                        onClick: clearList
                    },
                    'Clear list'
                );
            }
            return React.createElement(
                'div',
                { className: 'mr-5' },
                React.createElement(
                    'ul',
                    { className: 'list group my-5' },
                    React.createElement(
                        'h3',
                        { className: 'text-capitalize text-center' },
                        'List'
                    ),
                    React.createElement('hr', null),
                    React.createElement(
                        'h4',
                        { className: 'text-center' },
                        search,
                        myRender
                    ),
                    items.map(function (item) {
                        return React.createElement(TodoItem, {
                            key: item.id,
                            title: item.title,
                            date: item.date,
                            isEdited: item.isEdited,
                            editedAt: item.editedAt,
                            handleDelete: function handleDelete() {
                                return _handleDelete(item.id);
                            },
                            handleEdit: function handleEdit() {
                                return _handleEdit(item.id);
                            }
                        });
                    }),
                    button
                )
            );
        }
    }]);

    return TodoList;
}(React.Component);

// ------------------------TO DO ITEM


var TodoItem = function (_React$Component3) {
    _inherits(TodoItem, _React$Component3);

    function TodoItem() {
        _classCallCheck(this, TodoItem);

        return _possibleConstructorReturn(this, (TodoItem.__proto__ || Object.getPrototypeOf(TodoItem)).apply(this, arguments));
    }

    _createClass(TodoItem, [{
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                title = _props3.title,
                handleDelete = _props3.handleDelete,
                handleEdit = _props3.handleEdit,
                date = _props3.date,
                isEdited = _props3.isEdited,
                editedAt = _props3.editedAt;


            return React.createElement(
                'li',
                { className: 'list-group-item my-2' },
                React.createElement(
                    'div',
                    {
                        className: 'd-flex justify-content-between'
                    },
                    React.createElement(
                        'div',
                        { className: 'd-flex' },
                        React.createElement(
                            'div',
                            null,
                            date
                        ),
                        React.createElement(
                            'div',
                            { className: 'ml-2' },
                            React.createElement(
                                'small',
                                null,
                                isEdited ? '| edited at' : '',
                                ' ',
                                editedAt
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        {
                            className: 'todo-icon d-flex' },
                        React.createElement(
                            'span',
                            {
                                className: 'text-success mx-2',
                                style: { cursor: 'pointer' },
                                onClick: handleEdit
                            },
                            React.createElement('i', { className: 'fas fa-pen' })
                        ),
                        React.createElement(
                            'span',
                            {
                                className: 'text-danger mx-2',
                                style: { cursor: 'pointer' },
                                onClick: handleDelete
                            },
                            React.createElement('i', { className: 'fas fa-trash' })
                        )
                    )
                ),
                React.createElement('hr', null),
                React.createElement(
                    'div',
                    { className: 'text-wrap text-capitalize' },
                    React.createElement(
                        'span',
                        null,
                        title
                    )
                )
            );
        }
    }]);

    return TodoItem;
}(React.Component);

// SEARCH


var TodoSearch = function (_React$Component4) {
    _inherits(TodoSearch, _React$Component4);

    function TodoSearch() {
        _classCallCheck(this, TodoSearch);

        return _possibleConstructorReturn(this, (TodoSearch.__proto__ || Object.getPrototypeOf(TodoSearch)).apply(this, arguments));
    }

    _createClass(TodoSearch, [{
        key: 'render',
        value: function render() {
            var _props4 = this.props,
                searchItem = _props4.searchItem,
                handleSearch = _props4.handleSearch,
                deleteSearch = _props4.deleteSearch;


            return (
                // SEARCH ICON
                React.createElement(
                    'div',
                    { className: 'input-group' },
                    React.createElement(
                        'div',
                        { className: 'input-group-prepend' },
                        React.createElement(
                            'div',
                            {
                                className: 'input-group-text bg-primary text-white' },
                            React.createElement('i', { className: 'fas fa-search' })
                        )
                    ),
                    React.createElement('input', { type: 'text',
                        className: 'form-control',
                        placeholder: 'search it',
                        value: searchItem,
                        onChange: handleSearch
                    }),
                    React.createElement(
                        'div',
                        { className: 'input-group-prepend' },
                        React.createElement(
                            'div',
                            {
                                className: 'input-group-text bg-white text-danger',
                                style: { cursor: 'pointer' },
                                onClick: deleteSearch
                            },
                            React.createElement('i', { className: 'fas fa-times' })
                        )
                    )
                )
            );
        }
    }]);

    return TodoSearch;
}(React.Component);

// ------------------------APP


var App = function (_React$Component5) {
    _inherits(App, _React$Component5);

    function App(props) {
        _classCallCheck(this, App);

        var _this5 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this5.handleChange = function (e) {
            _this5.setState({
                item: e.target.value
            });
        };

        _this5.handleSearch = function (e) {
            _this5.setState({
                searchItem: e.target.value
            });
        };

        _this5.deleteSearch = function () {
            // ALERT
            if (_this5.state.searchItem !== '') {
                _this5.handleAlert({ type: 'danger', text: "Search input cleared" });
            }

            _this5.setState({
                searchItem: ''
            });
        };

        _this5.deleteInput = function () {
            // ALERT
            if (_this5.state.item !== '') {
                _this5.handleAlert({ type: 'danger', text: "Input cleared" });
            }

            _this5.setState({
                item: '',
                editItem: false,
                isEdited: false
            });
        };

        _this5.handleSubmit = function (e) {
            e.preventDefault();

            // CHECK IF INPUT IS CLEAR
            if (_this5.state.item === '') {
                // ALERT
                _this5.handleAlert({ type: 'danger', text: "Input can't be clear" });
                return;
            }

            // PREVENT REPEATING OF ITEMS
            var itemExist = _this5.state.items.findIndex(function (o) {
                return o.title === _this5.state.item;
            });

            if (itemExist !== -1 && _this5.state.editItem === false) {
                // ALERT
                _this5.handleAlert({ type: 'danger', text: 'Item is already on the list' });
                return;
            }

            // CHECK IF ITEM IS EDITED + EDIT POSITION
            if (_this5.state.editItem) {
                var tempItems = _this5.state.items.map(function (item) {
                    return item.id === _this5.state.id ? Object.assign({}, item, { title: _this5.state.item, isEdited: true, editedAt: _this5.date() }) : item;
                });
                // ALERT
                _this5.handleAlert({ type: 'success', text: 'Item edited' });

                _this5.setState({
                    items: tempItems,
                    editItem: false,
                    item: '',
                    id: _this5.uuid()
                });
            } else {
                var newItem = {
                    id: _this5.state.id,
                    title: _this5.state.item,
                    date: _this5.date()
                };

                var updatedItems = [].concat(_toConsumableArray(_this5.state.items), [newItem]);

                // ALERT
                _this5.handleAlert({ type: 'success', text: 'Item added' });

                _this5.setState({
                    items: updatedItems,
                    item: '',
                    id: _this5.uuid(),
                    editItem: false
                });
            }
        };

        _this5.clearList = function () {
            // ALERT
            if (!!_this5.state.searchItem) {
                _this5.handleAlert({ type: 'danger', text: 'Search list cleared' });
            } else {
                _this5.handleAlert({ type: 'danger', text: 'List cleared' });
            }

            var filteredArray = _this5.state.items.filter(function (item) {
                return item.title.toLowerCase().indexOf(_this5.state.searchItem.toLowerCase()) !== -1;
            });

            var difference = _this5.state.items.filter(function (item) {
                return !filteredArray.includes(item);
            });

            _this5.setState({
                items: difference,
                searchItem: ''
            });
        };

        _this5.handleDelete = function (id) {
            // ALERT
            _this5.handleAlert({ type: 'danger', text: 'Item deleted' });

            var filteredItems = _this5.state.items.filter(function (item) {
                return item.id !== id;
            });

            _this5.setState({
                items: filteredItems
            });
        };

        _this5.handleEdit = function (id) {
            var item = _this5.state.items.find(function (item) {
                return item.id === id;
            });

            // SMOOTH SCROLLING WHEN EDITING
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            if (_this5.state.editItem) {
                // ALERT
                _this5.handleAlert({ type: 'danger', text: 'Some item is already edited' });
                return;
            }

            _this5.setState({
                item: item.title,
                editItem: true,
                id: id
            });
        };

        _this5.handleAlert = function (_ref) {
            var type = _ref.type,
                text = _ref.text;

            // CLEARING TIMEOUT FOR EACH ALERT CALL
            clearTimeout(_this5.timer);

            _this5.setState({
                error: Object.assign({}, _this5.state.error, {
                    show: true,
                    type: type,
                    text: text
                })
            });
            _this5.timer = setTimeout(function () {
                _this5.setState({
                    error: Object.assign({}, _this5.state.error, {
                        show: false,
                        type: type,
                        text: text
                    })
                });
            }, 3000);
        };

        _this5.state = {
            items: [],
            id: _this5.uuid(),
            item: '',
            searchItem: '',
            editItem: false,
            error: { show: false, type: '', text: '' }, //!!!!!!
            isEdited: false
        };
        return _this5;
    }
    // UNIQUE ID GENERATOR


    _createClass(App, [{
        key: 'uuid',
        value: function uuid() {
            return 1 + Math.random();
        }
        // NEW DATE GENERATOR

    }, {
        key: 'date',
        value: function date() {
            return new Date().toLocaleString();
        }
        // INPUT HANDLER

        // SEARCH HANDLER

        // DELETE SEARCH INPUT

        // DELETE INPUT INPUT

        // SUBMIT FORM

        // CLEAR ALL


        // ICON

        // ICON


        // HANDLE ALERT

    }, {
        key: 'render',


        // END OF METHODS
        value: function render() {
            var _this6 = this;

            var filteredSearch = this.state.items.filter(function (item) {
                return item.title.toLowerCase().indexOf(_this6.state.searchItem.toLowerCase()) !== -1;
            });

            return React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-10 mx-auto col-md-8 mt-4' },
                        React.createElement(TodoSearch, {
                            searchItem: this.state.searchItem,
                            handleSearch: this.handleSearch,
                            deleteSearch: this.deleteSearch
                        }),
                        React.createElement(TodoInput, {
                            item: this.state.item,
                            handleChange: this.handleChange,
                            handleSubmit: this.handleSubmit,
                            editItem: this.state.editItem,
                            deleteInput: this.deleteInput,
                            error: this.state.error
                        }),
                        React.createElement(TodoList, {
                            items: filteredSearch,
                            clearList: this.clearList,
                            handleDelete: this.handleDelete,
                            handleEdit: this.handleEdit,
                            searchItem: this.state.searchItem
                        })
                    )
                )
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.querySelector('.script'));