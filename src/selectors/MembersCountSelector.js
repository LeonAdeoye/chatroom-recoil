import {selector} from "recoil";
import {membersState} from "../State/RoomsState";


const membersCountSelector = selector({
    key: "membersCountSelector",
    get: ({get}) =>
    {
        const members = get(membersState);
        return `Members: ${members.length}`;
    }
});

export default membersCountSelector;
