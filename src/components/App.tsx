import { observer } from "mobx-react";
import { Header, UserForm } from "./common";

const App = observer(() => {
  return (
    <>
      <Header />
      <UserForm />
    </>
  );
});

export default App;
