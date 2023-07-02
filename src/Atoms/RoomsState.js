import {atom} from "recoil";

export const selectedRoomState = atom({
    key: 'selectedRoomState',
    default: null,
});

export const roomsState = atom({
    key: 'roomsState',
    default: [],
});

export const selectedRoomIndexState = atom({
    key: 'selectedRoomIndexState',
    default: -1,
});

export const selectedChatMessageIndexState = atom({
    key: 'selectedChatMessageIndexState',
    default: -1,
});

export const realtimeMessageState = atom({
    key: 'realtimeMessageState',
    default: {},
});
