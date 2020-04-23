// ------------------------TO DO INPUT
class TodoInput extends React.Component {
    render() {
        const {
            item, 
            handleChange,
            handleSubmit,
            editItem,
            deleteInput,
            error} = this.props;

    
        return (
            // INPUT
            <div className='card card-body my-3'>
                <form onSubmit={handleSubmit}>
                    {/* INPUT ICON */}
                    <div className='input-group mt-2'>
                        <div className='input-group-prepend'>
                            <div className='input-group-text bg-primary text-white'>
                                <i className='fas fa-book'></i>
                            </div>
                        </div>
                        {/* INPUT INPUT */}
                        <input type='text'
                        className='form-control'
                        placeholder='add a todo item'
                        value={item}
                        onChange={handleChange}
                        />
                        {/* INPUT DELETE ICON */}
                        <div className='input-group-prepend'>
                            <div
                            className='input-group-text bg-white text-danger'
                            style={{cursor: 'pointer'}}
                            onClick={deleteInput}
                            >
                                <i className='fas fa-times'></i>
                            </div>
                        </div>
                    </div>

                    {/* ERRORS */}
                    <div className='mt-2' style={{height: '30px'}}>
                        {error.show
                        ?    <div 
                        className={`alert alert-${error.type} text-center`}
                        style={{padding: '5px'}}
                        role="alert">
                            {error.text}
                            </div>
                        : ''
                        }
                    </div>
                    
                    {/* BUTTON TYPE */}
                    <button type='submit'
                    className={editItem
                        ? 'btn btn-block btn-success mt-3'
                        : 'btn btn-block btn-primary mt-3'}
                    >
                    {editItem
                    ? 'Apply'
                    : 'Add item'}
                    </button>
                </form> 
            </div>
        )
    }
}



// ------------------------TO DO LIST
class TodoList extends React.Component {
    render() {
        const {
            items,
            clearList,
            handleDelete,
            handleEdit,
            searchItem} = this.props;

            let search;
            let myRender;

            // HANDLE SHOWING INFORMATION
            if (!!searchItem && items.length === 0) {
                search = 'No results'
            } else {
                search = ''
            }

            // if (search.length === 0 && items.length === 0) {
            //     myRender = "You're clear bro! :)"
            // } else {
            //     myRender = ''
            // }

            // SHOW BUTTON OR NOT
            let button;
            if (items.length > 0 && !!searchItem ) {
                button = (
                    <button type='button'
                    className='btn btn-danger btn-block mt-5'
                    onClick={clearList}
                    >
                        Clear search list
                    </button> 
                    )
            } else if (items.length > 0) {
                button = (
                    <button type='button'
                    className='btn btn-danger btn-block mt-5'
                    onClick={clearList}
                    >
                        Clear list
                    </button> 
                    )
            }
        return (
            <div className='mr-5'>
            <ul className="list group my-5">
                    <h3 className='text-capitalize text-center'>
                        List
                    </h3>
                <hr />
                <h4 className='text-center'>
                    {search}
                    {myRender}
                </h4>
                {items.map(item => {
                    return (
                        <TodoItem
                        key={item.id}
                        title={item.title}
                        date={item.date}
                        isEdited={item.isEdited}
                        editedAt={item.editedAt}
                        handleDelete={() => handleDelete(item.id)}
                        handleEdit={() => handleEdit(item.id)}
                        />
                    )
                })}
                {/* BUTTON */}
                {button}
            </ul>
            </div>
        )
    }
}



// ------------------------TO DO ITEM
class TodoItem extends React.Component {
    render() {
        const {
            title,
            handleDelete,
            handleEdit,
            date,
            isEdited,
            editedAt} = this.props;

        return (
            <li className="list-group-item my-2">
                <div
                className='d-flex justify-content-between'
                >
                    {/* DATE */}
                    <div className='d-flex'>
                        <div>
                            {date}
                        </div>
                        <div className='ml-2'>
                            <small>{isEdited ? '| edited at' : ''} {editedAt}</small>
                        </div>
                    </div>
                    {/* ICONS */}
                    <div 
                    className='todo-icon d-flex'>
                        <span
                        className="text-success mx-2"
                        style={{cursor: 'pointer'}}
                        onClick={handleEdit}
                        >
                            <i className="fas fa-pen"></i>
                        </span>
                        <span 
                        className="text-danger mx-2"
                        style={{cursor: 'pointer'}}
                        onClick={handleDelete}
                        >
                            <i className="fas fa-trash"></i>
                        </span>
                    </div>
                </div>
                
                <hr />
                
                <div className='text-wrap text-capitalize'>
                    <span>{title}</span>
                </div>
            </li>
        )
    }
}

// SEARCH
class TodoSearch extends React.Component {
    render() {
        const {
            searchItem,
            handleSearch,
            deleteSearch} = this.props;

        
        return (
            // SEARCH ICON
            <div className='input-group'>
                <div className='input-group-prepend'>
                    <div
                    className='input-group-text bg-primary text-white'>
                        <i className='fas fa-search'></i>
                    </div>
                </div>
            {/* SEARCH INPUT */}
            <input type='text'
            className='form-control'
            placeholder='search it'
            value={searchItem}
            onChange={handleSearch}
            />
            {/* SEARCH DELETE ICON */}
            <div className='input-group-prepend'>
                <div
                className='input-group-text bg-white text-danger'
                style={{cursor: 'pointer'}}
                onClick={deleteSearch}
                >
                    <i className='fas fa-times'></i>
                </div>
            </div>
        </div>
        )
    }
}

// ------------------------APP
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            id: this.uuid(),
            item: '',
            searchItem: '',
            editItem: false,
            error: {show: false, type: '', text: ''}, //!!!!!!
            isEdited: false
        }
    }
// UNIQUE ID GENERATOR
    uuid() {
        return 1 + Math.random();
    }
// NEW DATE GENERATOR
    date() {
        return new Date().toLocaleString();
    }
// INPUT HANDLER
    handleChange = e => {
        this.setState({
            item: e.target.value
        })
    }
// SEARCH HANDLER
    handleSearch = e => {
        this.setState({
            searchItem: e.target.value
        })
    }
// DELETE SEARCH INPUT
    deleteSearch = () => {
        // ALERT
        if (this.state.searchItem !== '') {
            this.handleAlert({type: 'danger', text: "Search input cleared"})
        }

        this.setState({
            searchItem: ''
        })
    }
// DELETE INPUT INPUT
    deleteInput = () => {
        // ALERT
        if (this.state.item !== '') {
            this.handleAlert({type: 'danger', text: "Input cleared"})
        }

        this.setState({
            item: '',
            editItem: false,
            isEdited: false
        })
    }
// SUBMIT FORM
    handleSubmit = e => {
        e.preventDefault();

            // CHECK IF INPUT IS CLEAR
            if (this.state.item === '') {
                // ALERT
                this.handleAlert({type: 'danger', text: "Input can't be clear"})
                return;
            }


            // PREVENT REPEATING OF ITEMS
            const itemExist = this.state.items.findIndex(o => o.title === this.state.item)

            if (itemExist !== -1 && this.state.editItem === false) {
                // ALERT
                this.handleAlert({type: 'danger', text: 'Item is already on the list'})
                return;
            }
            
        // CHECK IF ITEM IS EDITED + EDIT POSITION
            if (this.state.editItem) {
            let tempItems = this.state.items.map(item => {
                return item.id === this.state.id
                ? {...item, title: this.state.item, isEdited: true, editedAt: this.date()}
                : item
            })
            // ALERT
            this.handleAlert({type: 'success', text: 'Item edited'})

            this.setState({
                items: tempItems,
                editItem: false,
                item: '',
                id: this.uuid()
            })
        } else {
            const newItem = {
            id: this.state.id,
            title: this.state.item,
            date: this.date()
        };
        
        const updatedItems = [...this.state.items, newItem];

        // ALERT
        this.handleAlert({type: 'success', text: 'Item added'})

        this.setState({
            items: updatedItems,
            item: '',
            id: this.uuid(),
            editItem: false
        })
        }
    }
// CLEAR ALL
    clearList = () => {
        // ALERT
        if (!!this.state.searchItem) {
            this.handleAlert({type: 'danger', text: 'Search list cleared'})
        } else {
            this.handleAlert({type: 'danger', text: 'List cleared'})
        }

        const filteredArray = this.state.items.filter(
            item => {
                return item.title.toLowerCase().indexOf(
                    this.state.searchItem.toLowerCase()) !== -1;
                }
            )

        const difference = this.state.items.filter
        (item => !filteredArray.includes(item))

        this.setState({
            items: difference,
            searchItem: ''
        })
    }

// ICON
    handleDelete = id => {
        // ALERT
        this.handleAlert({type: 'danger', text: 'Item deleted'})

        const filteredItems = this.state.items.filter
        (item => item.id !== id)

        this.setState({
            items: filteredItems
        })
    }
// ICON
    handleEdit = id => {
        let item = this.state.items.find(
            (item) => item.id === id)

            // SMOOTH SCROLLING WHEN EDITING
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            })

                if (this.state.editItem) {
                    // ALERT
                    this.handleAlert({type: 'danger', text: 'Some item is already edited'})
            return;
    }

    this.setState({
        item: item.title,
        editItem: true,
        id: id
    })
    }

// HANDLE ALERT
handleAlert = ({type, text}) => {
        // CLEARING TIMEOUT FOR EACH ALERT CALL
        clearTimeout(this.timer)

    this.setState({
        error: 
        {...this.state.error,
            show: true,
            type: type,
            text: text
        }
    })
    this.timer = setTimeout(() => {
        this.setState({
            error: 
            {...this.state.error,
                show: false,
                type: type,
                text: text
            }
        })
    }, 3000)
  }

// END OF METHODS
    render() {

        const filteredSearch = this.state.items.filter(
            item => {
                return item.title.toLowerCase().indexOf(
                    this.state.searchItem.toLowerCase()) !== -1;
                }
            )

        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto col-md-8 mt-4">
                        <TodoSearch 
                        searchItem={this.state.searchItem}
                        handleSearch={this.handleSearch}
                        deleteSearch={this.deleteSearch}
                        />
                        <TodoInput
                        item={this.state.item}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        editItem={this.state.editItem}
                        deleteInput={this.deleteInput}
                        error={this.state.error}
                        />
                        <TodoList
                        items={filteredSearch}
                        clearList={this.clearList}
                        handleDelete={this.handleDelete}
                        handleEdit={this.handleEdit}
                        searchItem={this.state.searchItem}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <App />,
    document.querySelector('.script')
)