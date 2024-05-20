import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: number;
  name: string;
  username: string;
  email: string;
}
  
let initialState: User[] | any = [] ;

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User>) => {
            if (state.length === 1) {
                state.pop();
                state.push(action.payload)
            } else {
                state = state.push(action.payload)
            }
        }
    }
})

export const { updateUser} = userSlice.actions;
export default userSlice.reducer