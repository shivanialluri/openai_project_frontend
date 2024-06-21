
import './App.css';
import Navbar from './Components/Navabar/Navbar';
import  { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Latest from './Pages/Latest';
import Sale from './Pages/Sale';
import Dashboard from './Pages/Dashboard';
import Profile  from './Pages/Profile';
import StoreFront from './Pages/StoreFront';
import Checkout from './Pages/Checkout';
import StripePayment from './Pages/StripePayment';
import PaymentSuccess from './Pages/PaymentSuccess';
import Orders from './Pages/Orders';
import ForgotPassword from './Pages/ForgotPassword';
import Settings from '@mui/icons-material/Settings';
import OpenAIComponent from './Pages/OpenAIComponent';
import ChatAssistant from './Pages/ChatAssistant';
// import ChatUsersPortal from './Pages/ChatUsersPortal';
import SupportTicketsPortal from './Pages/ChatUsersPortal';




function App() {
  return (
    <div> 
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/latest' element={<Latest/>}/>
        <Route path='/sale' element={<Sale/>}/>
        {/* <Route path='product' element={<Product/>}>
          <Route path= ':productID' element= {<Product/>}></Route> */}

        {/* </Route> */}
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/storefront" element={<StoreFront/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/payment" element={<StripePayment/>}/>
        <Route path="/success" element={<PaymentSuccess/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/chat-assistant" element={<ChatAssistant/>}/>
        <Route path="/openai" element={<OpenAIComponent/>}/>
        <Route path="/supportticketsportal" element={<SupportTicketsPortal/>}/>
      </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
