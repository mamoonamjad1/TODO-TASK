import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import SingleTODO from "./pages/singleTodo";
import NavBar from "./components/navbar";
import RootLayout from "./components/root";

function App() {
  const router = createBrowserRouter([
    {path:'/',
  element:<RootLayout/>,
children:[
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/todo/:id",
      element: <SingleTODO />,
    },
  ]}
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
