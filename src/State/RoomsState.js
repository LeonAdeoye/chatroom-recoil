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

export const conversationState = atom({
    key: 'conversationState',
    default: [],
});

export const administratorsState = atom({
    key: 'administratorsState',
    default: [],
});

export const membersState = atom({
    key: 'membersState',
    default: [],
});

export const activitiesState = atom({
    key: 'activitiesState',
    default: [],
});

export const roomNameState = atom({
    key: 'roomNameState',
    default: '',
});

export const favouriteRoomsState = atom({
    key: 'favouriteRoomsState',
    default: [],
});
