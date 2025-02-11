import axios from 'axios'
import React from 'react'

const URL = 'http://localhost:9000/api/todos'//ease of use for later

export default class App extends React.Component {
  state={
    todos: [],//initialize state with empty array of todos then GET the todos
    error: '',//create state for error
    todoNameInput: '',//drive input using this state
  }
  //helper for todoNameInput
  onTodoNameInputChange = evt =>{
    const {value} = evt.target//extract what you need from the data when dealing with targets, then you can deal with the setState.
    //debugger//using debuggers for breakpoints to make sure that your code is working as intended and will break where you place debugger.
    this.setState({...this.state, todoNameInput: value })//see note above about putting value in
  }
  //resetting the form to empty after typing in it.
  resetForm = () => this.setState({ ...this.state, todoNameInput: ''})

  //posting todos helper function with axios
  postNewTodo = () =>{
    axios.post(URL, {name: this.state.todoNameInput})
    .then(res => {
      this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data)})
      this.resetForm();
      //debugger
    })
    .catch(err => {
      //debugger
      this.setState({ ...this.state, error: err.response.data.message})
    })
  }
  //helper to post on submit button
  onTodoFormSubmit = evt =>{
    evt.preventDefault()//to keep the page from refreshing each time that we click the submit button
    this.postNewTodo() //see how clean this is compared to trying to put it all together in one?
  }
  //helper function for fetching all todos with axios:
  fetchAllTodos = () =>{
    axios.get(URL)
    .then(res =>{
      //debugger
      this.setState({  ...this.state, todos: res.data.data})//make sure that the data is being send correctly
    })
    .catch(err =>{
      //debugger
      this.setState({ ...this.state, error: err.response.data.message})
    })

  }
  
    componentDidMount(){
    //fetch all todos from server
    this.fetchAllTodos()
  }
  render() {
    return  (
      <div>
        <div id="error">{this.state.error}</div>
        <div id="todos">
          <h2>Todos:</h2>
          {
            this.state.todos.map(td => {
              return <div key={td.id}>{td.name}</div>
            })
            }
        </div>
        <form id="todoForm" onSubmit={this.onTodoFormSubmit}>
          <input value={this.state.todoNameInput} onChange={this.onTodoNameInputChange} type="text" placeholder="Type your todo here"></input>
          <input type="submit"></input>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}
