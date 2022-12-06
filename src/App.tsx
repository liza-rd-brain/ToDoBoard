import { Provider } from "react-redux";

import { store } from "./business/store";

import "./App.css";

import { AppContainer } from "./AppContainer";
import { RouterComponent } from "./component/RouterComponent";

// const router = createBrowserRouter(
//   createRoutesFromElements(<Route path="/" element={<Main />}></Route>)
// );

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <AppContainer>
          <RouterComponent />
        </AppContainer>
      </div>
    </Provider>
  );
};

export default App;
