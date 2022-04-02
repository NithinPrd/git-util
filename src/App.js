import './App.css';
import Header from './Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Body/Home';
import Operations from './Body/Operations';
import Project from './Body/Project';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </div>
  );
}

export default App;
