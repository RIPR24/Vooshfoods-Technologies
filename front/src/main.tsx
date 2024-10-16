import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/VTrouter.tsx";
import VooshContextProvider from "./context/VooshContext.tsx";

createRoot(document.getElementById("root")!).render(
  <VooshContextProvider>
    <RouterProvider router={router} />
  </VooshContextProvider>
);
