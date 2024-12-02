import './App.scss'
import { Header } from './components/Header/Header'
import { LoginForm } from './components/Login/Login';
import { AdminPanel } from './module/AdminPanel/AdminPanel';
import { ProductItemById } from './module/Product/ProductItemById/ProductItemById';
import { ProductList } from './module/Product/ProductList/ProductList';
import { CartPage } from './page/CartPage'
import { HomePage } from './page/HomePage'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div>
        <Header/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='product/:categoryId' element={<ProductList/>}/>
          <Route path='cart' element={<CartPage/>}/>
          <Route path='admin' element={<AdminPanel/>}/>
          <Route path='productItem/:id' element={<ProductItemById/>}/>
          <Route path='login' element={<LoginForm/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
