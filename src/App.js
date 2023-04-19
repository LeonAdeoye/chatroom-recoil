import ChatRoomAppComponent from "./Components/ChatRoomAppComponent";
import {RecoilRoot} from "recoil";

function App()
{
  return (
      <div className="App">
        <RecoilRoot>
            <ChatRoomAppComponent/>
        </RecoilRoot>
      </div>
  );
}

export default App;
