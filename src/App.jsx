import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Profile from './pages/User/Profile'
import UsersList from './pages/Admin/UsersList'
import AdminRoute from './pages/admin/AdminRoute'
import Shop from './pages/Products/Shop'
import IPhoneDetails from './pages/Products/IPhoneDetails'
import Favorites from './pages/User/Favorites'
import Cart from './pages/Cart'
import Order from './pages/Order'
import MyOrders from './pages/User/MyOrders'
import OrdersList from './pages/Admin/OrdersList'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFail from './pages/PaymentFail'

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/iPhone/:id' element={<IPhoneDetails />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/my-orders' element={<MyOrders />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/payment-fail' element={<PaymentFail />} />
        <Route path='/order/:id' element={<Order />} />
        <Route path='/admin' element={<AdminRoute />}>
          <Route path='users' element={<UsersList />} />
          <Route path='orders' element={<OrdersList />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
