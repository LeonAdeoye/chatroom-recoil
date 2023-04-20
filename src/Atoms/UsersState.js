import {atom} from "recoil";

export const usersState = atom({
    key: 'usersState',
    default: [],
});

export const loggedInUserIdState = atom({
    key: 'loggedInUserIdState',
    default: '',
});
