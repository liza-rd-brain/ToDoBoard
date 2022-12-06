import { Provider } from "react-redux";

import { store } from "./business/store";
import "./App.css";

import { AppContainer } from "./AppContainer";
import { RouterComponent } from "./component/RouterComponent";

export const App = () => {
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
