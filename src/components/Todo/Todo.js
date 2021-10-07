import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import List from './List';
import './Todo.css';

class Todo extends Component {
    constructor() {
        super();

        // Estado inicial...
        this.state = {
            task: '',
            items: []
        };
    }

    componentWillMount() {
        // Establecemos las tareas por defecto...
        this.setState({
            items: [{
                    id: uuidv4(),
                    task: 'Default Task 1',
                    completed: false
                },
                {
                    id: uuidv4(),
                    task: 'Default Task 2',
                    completed: true
                },
                {
                    id: uuidv4(),
                    task: 'Default Task 3',
                    completed: false
                }
            ]
        });
    }

    handleOnChange = e => {
        const { target: { value } } = e;

        // Actualizamos el estado de la tarea con el valor de entrada...
        this.setState({
            task: value
        });
    }

    handleOnSubmit = e => {
      e.preventDefault();//preventDefault evita el envio del formulario
      if (this.state.task.trim() !== '') {
          this.setState({ task: '', items: [...this.state.items, { id: uuidv4(), task: this.state.task, completed: false }] });
      }
  }
        markAsCompleted = id => {
            // Encontramos la tarea por el id...
            const foundTask = this.state.items.find(task => task.id === id);

            // Actualizamos el estado completado...
            foundTask.completed = true;

            // Actualizamos el estado con la nueva tarea actualizada...
            this.setState({
                items: [
                    ...this.state.items,
                    ...foundTask
                ]
            });
        }

        removeTask = id => {
            // Filtramos las tareas eliminando el id específico de la tarea...
            const filteredTasks = this.state.items.filter(task => task.id !== id);

            // Actualizamos es estado de los elementos...
            this.setState({
                items: filteredTasks
            });
        };

        render(){
            return ( <div className= "Todo">
                <h1 > New Task: </h1>

                <form onSubmit = { this.handleOnSubmit } >
                <
                input value = { this.state.task }
                onChange = { this.handleOnChange }
                /> </form>

                <List items = { this.state.items }
                markAsCompleted = { this.markAsCompleted }
                removeTask = { this.removeTask }
                /> 
                </div>
            );
        }
    }

    export default Todo;