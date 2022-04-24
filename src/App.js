import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Containers/Home';
import Message from './Containers/Message';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/msg" element={<Message />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
