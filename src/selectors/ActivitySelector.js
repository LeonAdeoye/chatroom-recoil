import fullNameSelector from "./FullNameSelector";
import {selectorFamily} from "recoil";


const activitySelector = selectorFamily({
    key: "activitySelector",
    get: (activityDetails) => ({get}) =>
    {
        const {instigatorId, thirdPartyId, activity} = activityDetails
        const instigatorName = get(fullNameSelector(instigatorId));
        const targetName = get(fullNameSelector(thirdPartyId));

        if(instigatorName && targetName)
        {
            switch(activity)
            {
                case "ADD_ADMIN":
                    return `NEW ACTIVITY: ${instigatorName} added new administrator ${targetName} to the room.`;
                case "REMOVE_ADMIN":
                    return ` NEW ACTIVITY: ${instigatorName} removed administrator ${targetName} to the room.`;
                case "ADD_MEMBER":
                    return `NEW ACTIVITY: ${instigatorName} added new member ${targetName} to the room.`;
                case "REMOVE_MEMBER":
                    return `NEW ACTIVITY: ${instigatorName} removed member ${targetName} to the room.`;
                default:
                    return "";
            }
        }
        return "";
    }
});

export default activitySelector;
