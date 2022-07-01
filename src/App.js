import './App.css';
import Navbar from './Components/Navbar';
// import Header from './Components/Header';
import Main from './Components/Main';
import WasteDetail from './Components/WasteDetail';
import WasteQuote from './Components/WasteQuote';

function App() {
  return (
    <div>
      <Navbar />
      {/* <Header /> */}
      <Main />
      <WasteDetail />
      <WasteQuote />
    </div>
  );
}

export default App;



