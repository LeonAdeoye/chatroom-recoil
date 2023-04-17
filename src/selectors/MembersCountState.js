import {selector} from "recoil";
import {membersState} from "../State/RoomsState";


const membersCountState = selector({
    key: "membersCountState",
    get: ({get}) =>
    {
        const members = get(membersState);
        return members.length;
    }
});

export default membersCountState;
