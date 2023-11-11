import React from "react";
import { Route, Routes } from "react-router-dom";

//* Components
import {
  Error,
  Password,
  Profile,
  Recovery,
  Register,
  Reset,
  Username,
} from "./components";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Username />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password" element={<Password />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
