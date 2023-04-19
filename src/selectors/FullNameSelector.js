import {selectorFamily} from "recoil";
import {usersState} from "../State/UsersState";


const fullNameSelector = selectorFamily({
    key: "fullNameSelector",
    get: (userIdToFind) => ({get}) =>
    {
        const users = get(usersState);
        return userIdToFind ? users.find(user => user.id === userIdToFind).fullName : "NO FULL NAME";
    }
});

export default fullNameSelector;
