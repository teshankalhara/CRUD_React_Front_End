import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Category from './pages/Category'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Order from './pages/orders/Orders'
import CreateOrder from './pages/orders/CreateOrder'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/auth/login'
import ProtectedRoute from './components/ProtectedRoute'

//parent component
function App() {//functional component
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* protected routes - need login to access*/}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/category' element={<Category />} />
            <Route path='/product' element={<Product />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/order' element={<Order />} />
            <Route path='/order/create' element={<CreateOrder />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}


export default App
