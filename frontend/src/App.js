import './App.css';
import Room from './components/Room/Room';
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Room/>
      <Footer/>
    </div>
  );
}

export default App;
