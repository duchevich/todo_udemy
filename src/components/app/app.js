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
    // onSearch = (e) => {
    //     // this.setState(({ searchString }) => {
    //     //     return {
    //     //         searchString:  todoData.filter((el) => el.label.indexOf(text) !== -1)
    //     //     };
    //     // })
    // }
    onSearch = (e) => {
        const text = e.target.value;
        this.setState(({ searchString }) => {
            return {
                searchString:  text
            };
        })
    }
    render(){

        const {todoData, searchString } = this.state;
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
            <AppHeader toDo={todoCount} done={doneCount} />
            <div className="top-panel d-flex">
                <SearchPanel 
                    onSearch={this.onSearch}
                />
                <ItemStatusFilter />
            </div>

            <TodoList 
                todos={todoData.filter((el) => el.label.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)} 
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
