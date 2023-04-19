import {selector} from "recoil";
import {selectedRoomState} from "../State/RoomsState";


const membersCountSelector = selector({
    key: "membersCountSelector",
    get: ({get}) =>
    {
        const room = get(selectedRoomState);
        return `Members: ${room.members.length}`;
    }
});

export default membersCountSelector;
