import React, { Component } from 'react';

function ToDoStatus(props) {
  return <p>{props.remainingTasks} remaining out of {props.totalTasks} tasks</p>
}

class AddNewTask extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit() {
    if (this.state.name.length > 0) {
      this.props.addTask(this.state.name);
    }
    this.setState({ name: '' });
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <div>
        <input value={this.state.name} onChange={this.handleChange}></input>
        <button onClick={this.handleSubmit}>Add</button>
      </div>
    );
  }
};

function TaskItem(props) {
  return <li onClick={props.handleTaskClick} className={props.itemClass}>{props.name}</li>;
}

function TaskItemsList(props) {
  return props.taskList ? <ul>{props.taskList}</ul> : null;
}

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
    this.addTask = this.addTask.bind(this);
  }

  addTask(name) {
    const length = this.state.tasks.length;
    const task = { name: name, id: `${name}${length}`, finished: false };
    this.state.tasks.push(task);
    this.setState({ tasks: this.state.tasks });
  }

  getRemainingTasks(tasks) {
    let length = 0;

    tasks.forEach(task => {
      if (task.finished) {
        length++;
      }
    })
    return length;
  }

  handleTaskClick(task) {
    task.finished = !task.finished;
    this.setState({ tasks: this.state.tasks });
  }

  render() {
    const totalTasks = this.state.tasks.length;
    const remainingTasks = this.getRemainingTasks(this.state.tasks);
    const taskList = this.state.tasks.map((task, index) => {
      return (
        <TaskItem key={task.id}
              name = { task.name }
              itemClass = { task.finished ? 'is-done' : '' }
              handleTaskClick = { this.handleTaskClick.bind(this, task) }
      />
          );
  })
  return(
            <>
  <div>
    <h2>
      Todo List
                    </h2>
  </div>

  <AddNewTask addTask={this.addTask} />

  <ToDoStatus totalTasks={totalTasks} remainingTasks={remainingTasks} />

  <TaskItemsList taskList={taskList} />

  <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                `}</style>
            </>
        );
    }
}
