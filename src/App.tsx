import { Provider } from "react-redux";

import { store } from "./business/store";

import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { FireBaseContainer } from "./features/FireBaseContainer";

// const router = createBrowserRouter(
//   createRoutesFromElements(<Route path="/" element={<Main />}></Route>)
// );

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <FireBaseContainer />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
