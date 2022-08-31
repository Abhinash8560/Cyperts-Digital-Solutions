import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import Details from "./pages/Details";
import Home from "./pages/Home";

function App() {
  return (
    <div className="header">
   

      <BrowserRouter >
  

        <Routes>

        <Route path='/' element={<Home />} />
      
          <Route path='/details' element={<Details/>} />
   
        </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;