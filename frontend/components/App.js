import axios from 'axios'
import React from 'react'

const URL = 'http://localhost:9000/api/todos'//ease of use for later

export default class App extends React.Component {
  state={
    todos: [],//initialize state with empty array of todos then GET the todos
    error: '',//create state for error
  }
  //helper function for fetching all todos:
  fetchAllTodos = () =>{
    axios.get(URL)
    .then(res =>{
      //debugger
      this.setState({  ...this, todos: res.data.data})//make sure that the data is being send correctly
    })
    .catch(err =>{
      //debugger
      this.setState({ ...this, error: err.response.data.message})
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
        <form id="todoForm">
          <input type="text" placeholder="Type your todo here"></input>
          <input type="submit"></input>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}
