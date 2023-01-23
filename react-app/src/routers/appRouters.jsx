import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutAdmin from '../layout/layoutAdmin/layoutAdmin';
import Layout from '../layout/layoutUser/layout';
import Login from '../components/pages/login';
import Home from '../components/home';
import Order from '../components/pages/login';


const AppRouters = () => {

  return (
    <Router>
      <Routes>
    {/* User Layout */}
        <Route path='/' element={<Layout />}>
          
          <Route index element={<Home />} />
          <Route path='/order' element={<Order />} />

          
        </Route>

    {/* Admin Layout */}
        <Route path='/admin' element={<LayoutAdmin />}>
          <Route path='/admin' element={<Home />} />
        </Route>


{/* Not Found */}
        <Route path='/*' element={<h1>Not Found 404</h1>} />
      </Routes>


    </Router>
  )
}

export default AppRouters