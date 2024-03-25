import { createSlice } from "@reduxjs/toolkit";


const todoSlice = createSlice({
    name: 'todo',
    initialState: { data: [], isGetApi: false, selectedId: '' },
    reducers: {
        getTodo: (state, actions) => {
            if (actions.payload.length) {
                state.data = actions.payload
                state.isGetApi = true;
            }
            return state;
        },
        addTodo: (state, actions) => {
            if (actions.payload.title) state.data.push(actions.payload)
            return state;
        },
        editTodo: (state, action) => {
            const index = state.data.findIndex(item => item._id === action.payload.id);
            state.selectedId = '';
            state.data[index] = { ...state.data[index], ...action.payload.data }
        },
        deleteTodo: (state, action) => {
            state.data = state.data.filter(item => item._id !== action.payload)
            return state;
        },
        selectEditTodo: (state, action) => {
            state.selectedId = action.payload;
            return state;
        }
    }
})

export const { getTodo, addTodo, editTodo, deleteTodo, selectEditTodo } = todoSlice.actions;
export default todoSlice.reducer;