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
                deleteInput = _props.deleteInput;


            return (
                // INPUT
                React.createElement(
                    'div',
                    { className: 'card card-body my-3' },
                    React.createElement(
                        'h3',
                        { className: 'text-capitalize text-center' },
                        'input'
                    ),
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

            if (search.length === 0 && items.length === 0) {
                myRender = "You're clear bro! :)";
            } else {
                myRender = '';
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
                            handleDelete: function handleDelete() {
                                return _handleDelete(item.id);
                            },
                            handleEdit: function handleEdit() {
                                return _handleEdit(item.id);
                            }
                        });
                    }),
                    React.createElement(
                        'button',
                        { type: 'button',
                            className: 'btn btn-danger btn-block mt-5',
                            onClick: clearList
                        },
                        'Clear list'
                    )
                )
            );
        }
    }]);

    return TodoList;
}(React.Component);

// ------------------------TO DO ITEM


var TodoItem = function (_React$Component3) {
    _inherits(TodoItem, _React$Component3);

    function TodoItem(props) {
        _classCallCheck(this, TodoItem);

        var _this3 = _possibleConstructorReturn(this, (TodoItem.__proto__ || Object.getPrototypeOf(TodoItem)).call(this, props));

        _this3.state = {
            date: new Date().toLocaleString()
        };
        return _this3;
    }

    _createClass(TodoItem, [{
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                title = _props3.title,
                handleDelete = _props3.handleDelete,
                handleEdit = _props3.handleEdit;


            return React.createElement(
                'li',
                { className: 'list-group-item text-capitalize \r my-2' },
                React.createElement(
                    'div',
                    {
                        className: 'd-flex justify-content-between'
                    },
                    React.createElement(
                        'div',
                        null,
                        this.state.date
                    ),
                    React.createElement(
                        'div',
                        {
                            className: 'todo-icon d-flex'
                        },
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
                    { className: 'text-wrap' },
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
            _this5.setState({
                searchItem: ''
            });
        };

        _this5.deleteInput = function () {
            _this5.setState({
                item: ''
            });
        };

        _this5.handleSubmit = function (e) {
            e.preventDefault();

            if (_this5.state.item === '') {
                alert('Input cannot be clear!');
                return;
            }

            var newItem = {
                id: _this5.state.id,
                title: _this5.state.item
            };
            // console.log(newItem);
            // console.log(this.state.editItem);
            var updatedItems = [].concat(_toConsumableArray(_this5.state.items), [newItem]);

            _this5.setState({
                items: updatedItems,
                item: '',
                id: _this5.uuid(),
                editItem: false
            });
        };

        _this5.clearList = function () {
            _this5.setState({
                items: ''
            });
        };

        _this5.handleDelete = function (id) {
            var filteredItems = _this5.state.items.filter(function (item) {
                return item.id !== id;
            });

            _this5.setState({
                items: filteredItems
            });
        };

        _this5.handleEdit = function (id) {
            var filteredItems = _this5.state.items.filter(function (item) {
                return item.id !== id;
            });

            var selectedItem = _this5.state.items.find(function (item) {
                return item.id === id;
            });
            // console.log(selectedItem)

            _this5.setState({
                items: filteredItems,
                item: selectedItem.title,
                editItem: true,
                id: id
            });
        };

        _this5.state = {
            items: [],
            id: _this5.uuid(),
            item: '',
            searchItem: '',
            editItem: false
        };
        return _this5;
    }

    _createClass(App, [{
        key: 'uuid',
        value: function uuid() {
            return 1 + Math.random();
        }
        // INPUT HANDLER

        // SEARCH HANDLER

        // DELETE SEARCH INPUT

        // DELETE INPUT INPUT

    }, {
        key: 'render',
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
                            deleteInput: this.deleteInput
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