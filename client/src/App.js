import React, {useState} from 'react';
import DataTable from './Pages/DataTable';
import Header from './Components/Header';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
      localStorage.getItem("loggedIn") === "true"
    );

    const handleLogin = (email, password) => {
      if (email === "admin@gmail.com" && password === "admin@456123") {
        setIsLoggedIn(true);
        localStorage.setItem("loggedIn", "true");
      }
    };
  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
      <DataTable isLoggedIn={isLoggedIn}/>
    </div>
  );
}

export default App;
