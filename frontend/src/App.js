import './App.css';
import Room from './components/Room/Room';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Movie from './components/movie/Movie';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Room />
              <Footer />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Movie/>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
