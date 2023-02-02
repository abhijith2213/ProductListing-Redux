import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import UserPage from './pages/user/UserPage'
import Home from './components/home/Home'
import ProductDetails from './components/detailedView/ProductDetails'
function App() {

  return (
    <Router>
      <Routes>
        <Route element={<UserPage/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/product/:id' element={<ProductDetails/>}/>
        </Route>
      </Routes>
    </Router>

  )
}

export default App
