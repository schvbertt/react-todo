// ------------------------TO DO INPUT
class TodoInput extends React.Component {
    render() {
        const {
            item, 
            handleChange,
            handleSubmit,
            editItem} = this.props;

        return (
            // INPUT
            <div className='card card-body my-3'>
                <h3 className='text-capitalize text-center'>
                    input
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className='input-group mt-2'>
                        <div className='input-group-prepend'>
                            <div className='input-group-text bg-primary text-white'>
                                <i className='fas fa-book'></i>
                            </div>
                        </div>
                        <input type='text'
                        className='form-control'
                        placeholder='add a todo item'
                        value={item}
                        onChange={handleChange}
                        />
                    </div>
                    <button type='submit'
                    className={editItem
                        ? 'btn btn-block btn-success mt-3'
                        : 'btn btn-block btn-primary mt-3'}
                    >
                    {editItem ? 'Apply' : 'Add item'}
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
            handleEdit} = this.props;
        return (
            <li className="list-group-item text-capitalize 
             my-2">
                <div className='d-flex'>
                <div className='text-wrap' style={{width: '90%'}}>
                    <span>{title}</span>
                </div>
                <div 
                className='todo-icon d-lg-flex'
                style={{width: '10%'}}
                >
                    <span className="text-success mx-2"
                    onClick={handleEdit}
                    >
                        <i className="fas fa-pen"></i>
                    </span>
                    <span className="text-danger mx-2"
                    onClick={handleDelete}
                    >
                        <i className="fas fa-trash"></i>
                    </span>
                </div>
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
            // SEARCH
            <div className='input-group'>
            <div className='input-group-prepend'>
                <div className='input-group-text bg-primary text-white'>
                    <i className='fas fa-search'></i>
                </div>
            </div>
            <input type='text'
            className='form-control'
            placeholder='search it'
            value={searchItem}
            onChange={handleSearch}
            />
            <div className='input-group-prepend'>
                <div
                className='input-group-text bg-white text-danger'
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
            editItem: false
        }
    }
    uuid() {
        return 1 + Math.random();
    }
// INPUT HANDLER
    handleChange = e => {
        this.setState({
            item: e.target.value
        })
    }
// SEARCH HANDLER
    handleSearch = e => {
        // console.log(e.target.value)
        this.setState({
            searchItem: e.target.value
        })
    }

    deleteSearch = () => {
        this.setState({
            searchItem: ''
        })
    }

    handleSubmit = e => {
        e.preventDefault();

        if(this.state.item === '') {
            alert('Input cannot be clear!')
            return;
        }

        const newItem = {
            id: this.state.id,
            title: this.state.item
        };
        // console.log(newItem);
        const updatedItems = [...this.state.items, newItem];

        this.setState({
            items: updatedItems,
            item: '',
            id: this.uuid(),
            editItem: false
        })

    }

    clearList = () => {
        this.setState({
            items:[]
        })
    }

    handleDelete = id => {
        const filteredItems = this.state.items.filter
        (item => item.id !== id)

        this.setState({
            items: filteredItems
        })
    }

    handleEdit = id => {
        const filteredItems = this.state.items.filter(item => 
            item.id !== id)

        const selectedItem = this.state.items.find(item => item.id === id)
        // console.log(selectedItem)

        this.setState({
            items: filteredItems,
            item: selectedItem.title,
            editItem: true,
            id: id
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