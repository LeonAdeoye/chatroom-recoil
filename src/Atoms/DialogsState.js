import {atom} from "recoil";

export const loginDialogDisplayState = atom({
    key: 'loginDialogDisplayState',
    default: true,
});

export const newRoomDialogDisplayState = atom({
    key: 'newRoomDialogDisplayState',
    default: false,
});

export const newAdminDialogDisplayState = atom({
    key: 'newAdminDialogDisplayState',
    default: false,
});

export const newMemberDialogDisplayState = atom({
    key: 'newMemberDialogDisplayState',
    default: false,
});

export const errorDialogDisplayState = atom({
    key: 'errorDialogDisplayState',
    default: false,
});
