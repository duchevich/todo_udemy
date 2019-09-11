import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
    maxId = 100;

    state={
        searchString: '',
        viewAllState: true,
        viewActiveState: false,
        viewDoneState: false,
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ]
    }

    createTodoItem(label){
        return{
            label, 
            important: false, 
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArr = [
                ...todoData.slice(0, idx), 
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArr
            }

        });
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({ todoData }) => {
            const newArr = [...todoData, newItem];
            return {
                todoData: newArr
            }
        });
    }

    toggleProperty(arr, id, propName){
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [
            ...arr.slice(0, idx), 
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData:  this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData:  this.toggleProperty(todoData, id, 'important')
            };
        })
    };
    
    onSearch = (e) => {
        const text = e.target.value;
        this.setState(({ searchString }) => {
            return {
                searchString:  text
            };
        })
    }

    viewAll = () => {
        this.setState(({ searchString }) => {
            return {
                viewAllState: true,
                viewActiveState: false,
                viewDoneState: false,
            };
        })
    };

    viewActive = () => {
        this.setState(({ searchString }) => {
            return {
                viewAllState: false,
                viewActiveState: true,
                viewDoneState: false,
            };
        })
    };

    viewDone = () => {
        this.setState(({ searchString }) => {
            return {
                viewAllState: false,
                viewActiveState: false,
                viewDoneState: true,
            };
        })
    };

    render(){

        const {todoData, searchString } = this.state;
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        let filteredData = todoData.filter((el) => el.label.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
        if(this.state.viewDoneState){
            filteredData = filteredData.filter((el) => el.done === true);
        }
        if(this.state.viewActiveState){
            filteredData = filteredData.filter((el) => el.done === false);
        }

        return (
            <div className="todo-app">
            <AppHeader toDo={todoCount} done={doneCount} />
            <div className="top-panel d-flex">
                <SearchPanel 
                    onSearch={this.onSearch}
                />
                <ItemStatusFilter 
                    viewAllState={this.state.viewAllState}
                    viewActiveState={this.state.viewActiveState}
                    viewDoneState={this.state.viewDoneState}
                    viewAll={this.viewAll}
                    viewActive={this.viewActive}
                    viewDone={this.viewDone}
                />
            </div>

            <TodoList 
                todos={filteredData} 
                onDeleted={this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone}
            />
            <ItemAddForm
                onItemAdded={this.addItem}/>
            </div>
        );
    }
};
