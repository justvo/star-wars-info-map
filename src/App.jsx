import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import BackgroundField from "./components/Backgraund/BackgroundField";
import { Provider } from 'react-redux'
import store from "./services/store/store";
import './App.css'
import ChatAI from "./components/ChatWithAI/ChatAI/ChatAI";

function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <BackgroundField />
      <ChatAI/>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
