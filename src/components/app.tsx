import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import EventPreview from "./EventPreview";

const Layout = () => (
  <div>
    <Outlet />
  </div>
);

const Empty = () => <div>Keine Veranstaltungen gefunden</div>;

const router = createBrowserRouter([
  {
    path: "events",
    element: <Layout />,
    children: [
      { path: "", element: <Empty /> },
      { path: ":slug", element: <EventPreview /> },
      { path: "*", element: <Empty /> },
    ],
  },
], {
    basename: "/"
});

export const App = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};
