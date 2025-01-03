import { todoService } from "./../services/todo.service.js"

import {
    ADD_TODO, REMOVE_TODO, SET_TODOS,
    SET_IS_LOADING, UNDO_TODOS, UPDATE_TODO
} from "../reducers/todo.reducer.js"

import { store } from "./store.js"

import {
    showErrorMsg,
    showSuccessMsg
} from "./../services/event-bus.service.js"

export const stateTodoActions = {
    loadTodos,
    removeTodo,
    removeTodoOptimistic,
    saveTodo,
}

function loadTodos(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then((todos) => {
            store.dispatch({
                type: SET_TODOS,
                todos: todos[0] ? todos : "No matching todos.",
            });
        })
        .catch((err) => {
            console.log("Action: Cannot load todos", err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false });
        })
}

async function removeTodo(todoId) {
    try {
        const data = await todoService.remove(todoId)
        store.dispatch({ type: REMOVE_TODO, todoId })
        showSuccessMsg("Todo removed")
        return data
    } catch (err) {
        console.log("Action: Cannot remove todo", err)
        showErrorMsg("Cannot remove todo")
        throw err;
    }
}

function removeTodoOptimistic(todoId) {
    store.todoModule.dispatch({ type: REMOVE_TODO, todoId });
    return todoService.remove(todoId)
        .catch((err) => {
            store.dispatch({ type: UNDO_TODOS });
            console.log("Action: Cannot remove todo", err);
        throw err;
    });
}

async function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const savedTodo = await todoService.save(todo)
        store.dispatch({ type, todo: savedTodo })
        showSuccessMsg(
            `The Todo is ${savedTodo.isDone ? "done" : "updated"}`
        )
        return savedTodo
    } catch (err) {
        showErrorMsg("Cannot save todo");
        console.log("Action: Cannot save todo", err, "todo:", todo)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}
