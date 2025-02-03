import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App"
import Home from "./components/Home";
import CountryDetail from "./components/CountryDetail";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path:"/",
            element: <Home/>
        },
        {
            path:"/:country",
            element: <CountryDetail />
        }
      ]
    },
  ]);

const root = createRoot(document.querySelector("#root"));


root.render(
    <RouterProvider router={router} />
)