import './App.scss'
import { Header } from './components/Header/Header'
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
          <Route path='cart' element={<CartPage/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
