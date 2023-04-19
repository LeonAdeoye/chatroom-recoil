import {selectorFamily} from "recoil";

const shorterTimeStampSelector = selectorFamily({
    key: "shorterTimeStampSelector",
    get: (timeStamp) => ({get}) =>
    {
        return new Date(timeStamp).toLocaleTimeString();
    }
});

export default shorterTimeStampSelector;
