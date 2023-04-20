import {atom} from "recoil";

export const errorMessageState = atom({
    key: 'errorMessageState',
    default: '',
});

export const chatEntryHeightState = atom({
    key: 'chatEntryHeightState',
    default: 50,
});
