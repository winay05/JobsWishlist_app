import Main from './components/main';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <div>
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
