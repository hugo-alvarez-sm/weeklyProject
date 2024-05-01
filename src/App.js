import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn'; // Asegúrate de que la ruta del archivo sea correcta

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
