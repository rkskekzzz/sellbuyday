import * as React from "react";
import { useReducer, createContext, Dispatch } from "react";
import { Error, Home, Sign } from "./components";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

type State = {
  id: string;
};

const ProtectedRoute = () => {
  const id = window.localStorage.getItem("id");
  if (!id || id === "") {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<Home />} />
        </Route>
        <Route path="/404" element={<Error />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
