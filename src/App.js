import './App.css';
import Header from './Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Body/Home';
import Operations from './Body/Operations';
import Project from './Body/Project';
import ProjectClass from './Body/ProjectClass';

function App() {
  return (
    <div className="App">
      <Header/>
      <div style={{margin: "10px"}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/project" element={<ProjectClass />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
