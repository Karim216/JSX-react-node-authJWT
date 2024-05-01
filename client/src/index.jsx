import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";

export const ConfigContext = createContext();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigContext.Provider
        value={{
          apiUrl: import.meta.env.VITE_REACT_APP_API_BASE_URL,
          config: {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          },
        }}
      >
        <App />
      </ConfigContext.Provider>
    </Provider>
  </React.StrictMode>
);
