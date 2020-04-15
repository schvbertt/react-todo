// ------------------------TO DO INPUT
class TodoInput extends React.Component {
    render() {
        const {
            item, 
            handleChange,
            handleSubmit,
            editItem,
            deleteInput,
            inputError,
            editError} = this.props;

    
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
                    <div
                    className='container d-flex'
                    style={{height: '13px'}}>
                        <div className='ml-auto mt-1'>
                            <span className='badge badge-pill badge-warning d-flex'>
                                {inputError}
                                {editError}
                            </span>
                        </div>
                    </div>

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

            if (search.length === 0 && items.length === 0) {
                myRender = "You're clear bro! :)"
            } else {
                myRender = ''
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
                        handleDelete={() => handleDelete(item.id)}
                        handleEdit={() => handleEdit(item.id)}
                        />
                    )
                })}
                <button type='button'
                className='btn btn-danger btn-block mt-5'
                onClick={clearList}
                >
                    Clear list
                </button>
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
            isEdited} = this.props;

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
                            <small>{isEdited ? '| edited' : ''}</small>
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
            inputError: '',
            editError: '',
            date: this.date(),
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
        this.setState({
            searchItem: ''
        })
    }
// DELETE INPUT INPUT
    deleteInput = () => {
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
                    this.setState({
                        inputError: "INPUT CAN'T BE CLEAR"
                    })
                    setTimeout(
                        () => {
                            this.setState({
                                inputError: ''
                            })
                        },
                        3000
                    ) 
                    return;
            }


        const newItem = {
            id: this.state.id,
            title: this.state.item,
            date: this.state.date,
            isEdited: this.state.isEdited
        };
        // console.log(newItem);
        // console.log(this.state.editItem);

        
        const updatedItems = [...this.state.items, newItem];

        this.setState({
            items: updatedItems,
            item: '',
            id: this.uuid(),
            editItem: false,
            date: this.date(),
            isEdited: false
        })

    }
// CLEAR ALL
    clearList = () => {
        this.setState({
            items: []
        })
    }

// ICON
    handleDelete = id => {
        const filteredItems = this.state.items.filter
        (item => item.id !== id)

        this.setState({
            items: filteredItems
        })
    }
// ICON
    handleEdit = id => {
        const filteredItems = this.state.items.filter(item => 
            item.id !== id)

        const selectedItem = this.state.items.find(item => item.id === id)

        // SCROLL TO TOP FOR EACH EDIT
        window.scrollTo(0, 0);
        
        if (this.state.editItem) {
            this.setState({
                editError: 'ITEM IS BEING EDITED ALREDY',
            })
            setTimeout(
                () => {
                    this.setState({
                        editError: ''
                    })
                },
                3000
            ) 
            return;
    }

        this.setState({
            items: filteredItems,
            item: selectedItem.title,
            editItem: true,
            id: id,
            isEdited: true
        })

    }

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
                        inputError={this.state.inputError}
                        editError={this.state.editError}
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