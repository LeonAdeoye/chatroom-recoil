import {selectorFamily} from "recoil";
import {usersState} from "../State/UsersState";


const fullNameSelector = selectorFamily({
    key: "fullNameSelector",
    get: (authorId) => ({get}) =>
    {
        const users = get(usersState);
        return users.find(user => user.id === authorId).fullName;
    }
});

export default fullNameSelector;
