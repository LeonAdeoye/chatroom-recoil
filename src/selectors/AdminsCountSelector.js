import {selector} from "recoil";
import {selectedRoomState} from "../State/RoomsState";


const adminsCountSelector = selector({
    key: "adminsCountSelector",
    get: ({get}) =>
    {
        const room = get(selectedRoomState);
        return `Admins: ${room.administrators.length}`;
    }
});

export default adminsCountSelector;
