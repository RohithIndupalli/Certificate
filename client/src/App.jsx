// import { useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter,Routes,Route } from 'react-router-dom'
// import Signup from './Signup';
// import Login from './Login';
// import Layout from './Layout';
// import Home from './Home';
// import Certificates from './Certificates';
// import FirstPage from './FirstPage';

// function App() {

//   return (
//     <BrowserRouter>
//     <Routes>
//       <Route path='/' element={<Layout />}>
//       <Route index element={<Signup />} /> {/* Shows Signup by default */}
//       <Route path='/register' element={<Signup />}></Route>
//       <Route path='/login' element={<Login />}></Route>
//       <Route path='/home' element={<Home />}></Route>
//       <Route path="/certificates" element={<Certificates />} />
//       </Route>
//     </Routes>
//     </BrowserRouter>
//   )
// }

// export default App


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import Layout from './Layout';
import Home from './Home';
import Certificates from './Certificates';
import FirstPage from './FirstPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* FirstPage is independent and does NOT use Layout */}
        <Route path="/" element={<FirstPage />} />

        {/* All other pages are wrapped inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="register" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="certificates" element={<Certificates />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

