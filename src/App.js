// import React from "react";
// import ComingSoonPage from "./pages/comingSoon";

// function App() {
//   return (
//     <div className="App">
//       <ComingSoonPage />
//     </div>
//   );
// }

// export default App;



//start
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StarsBackground from "./components/starsbackground";
import Landing from "./pages/Landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StarsBackground />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;