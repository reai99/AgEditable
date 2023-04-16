import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import TestEdit from "./pages/TestEdit";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <div style={{ margin: '20px 0'}}>
      <span>Edit模式</span>
      <TestEdit />
    </div>
  </StrictMode>
);
