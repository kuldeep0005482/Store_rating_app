import { Route } from "react-router-dom";

import Demo from "../pages/demo";
import ChartsDemo from "../components/charts/ChartsDemo";
import FormsDemo from "../components/forms/FormsDemo";

export const demoRoutes = [
  <Route key="demo" path="/demo" element={<Demo />} />,
  <Route key="demo-charts" path="/demo/charts" element={<ChartsDemo />} />,
    <Route key="demo-forms" path="/demo/forms" element={<FormsDemo />} />,
];