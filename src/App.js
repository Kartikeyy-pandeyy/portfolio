import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import V1Landing from "./v1/pages/v1-landing";
import V2Landing from "./v2/pages/v2-landing";
import versionRoutes from "./config/versionRoutes.json";

// V1 (kept for reference)
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Landing from "./pages/Landing";
//
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Landing />} />
//       </Routes>
//     </Router>
//   );
// }
//
// export default App;

// V2
function App() {
  const defaultPath = versionRoutes.routes[versionRoutes.defaultVersion] || "/v2";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={defaultPath} replace />} />
        <Route path={versionRoutes.routes.v1} element={<V1Landing />} />
        <Route path={versionRoutes.routes.v2} element={<V2Landing />} />
        <Route path="*" element={<Navigate to={defaultPath} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
