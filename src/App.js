import ChatRoomAppComponent from "./Components/ChatRoomAppComponent";
import LoginDialogComponent from "./Components/LoginDialogComponent";
import NewRoomDialogComponent from "./Components/NewRoomDialogComponent";
import NewMemberDialogComponent from "./Components/NewMemberDialogComponent";
import NewAdminDialogComponent from "./Components/NewAdminDialogComponent";
import ErrorMessageDialogComponent from "./Components/ErrorMessageDialogComponent";

function App()
{
    return (
        <div className="App">
            <LoginDialogComponent/>
            <NewRoomDialogComponent/>
            <NewMemberDialogComponent/>
            <NewAdminDialogComponent/>
            <ErrorMessageDialogComponent/>
            <ChatRoomAppComponent/>
        </div>
    );
}

export default App;
