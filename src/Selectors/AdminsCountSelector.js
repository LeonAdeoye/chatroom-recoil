import {selector} from "recoil";
import {selectedRoomState} from "../Atoms/RoomsState";


const adminsCountSelector = selector({
    key: "adminsCountSelector",
    get: ({get}) =>
    {
        const room = get(selectedRoomState);
        return `Admins: ${room.administrators.length}`;
    }
});

export default adminsCountSelector;
