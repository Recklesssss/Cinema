import './App.css';
import Room from './components/Room/Room';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Movie from './components/movie/Movie';
import Friends from './components/friends/Friends';
import Signup from './components/signup/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route
          path="/signup"
          element={
            <>
              <Signup/>
            </>
          }
        />
      <Route
          path="/friends"
          element={
            <>
              <Friends/>
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
      </Routes>
    </div>
  );
}

export default App;
