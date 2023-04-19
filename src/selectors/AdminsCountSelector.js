import {selector} from "recoil";
import {administratorsState} from "../State/RoomsState";


const adminsCountSelector = selector({
    key: "adminsCountSelector",
    get: ({get}) =>
    {
        const admins = get(administratorsState);
        return `Admins: ${admins.length}`;
    }
});

export default adminsCountSelector;
