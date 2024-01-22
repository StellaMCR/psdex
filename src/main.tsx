import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import List from './List'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Details from './Details';

const router = createBrowserRouter([
  {
    path: "/",
    element: <List/>,
  },
  {
    path: "animes/:animeId",
    element: <Details/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
