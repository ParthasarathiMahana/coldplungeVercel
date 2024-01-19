import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState ={
    doubts:[],
    activeDoubt:""
}

const doubtSlice = createSlice({
    name: "doubts",
    initialState: initialState,
    reducers:{
        addDoubts:(state, action)=>{
            state.doubts = [...action.payload]
        },
        activateDoubt:(state, action)=>{
            state.activeDoubt = state.doubts[action.payload].id
        },
        addAnswer:(state, action)=>{
            state.doubts.map((item, index)=>{
                if(item.id == action.payload.id){
                    state.doubts[index].answer = action.payload.reply
                }
            })
        }
    }
})

export const doubtActions = doubtSlice.actions;
export const doubtReducer = doubtSlice.reducer;
export const doubtSelector = (state)=>state.doubtReducer.doubts;
export const activeDoubtSelector = (state)=>state.doubtReducer.activeDoubt;