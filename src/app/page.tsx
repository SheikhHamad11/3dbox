"use client";
import React from "react";
import SideBar from "../components/SideBar";
import { Provider } from "react-redux";
import store from "../ReduxConfig/store";
import Main from "@/components/Main";

const App = () => {
  return (
    <Provider store={store}>
      <div className="flex h-screen w-full">
        <SideBar />
        <Main />
      </div>
    </Provider>
  );
};

export default App;
