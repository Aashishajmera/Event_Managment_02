import { Route, Routes } from "react-router-dom";
import './App.css';
import AllEventList from './components/EventListComponent/AllEventList';
import FooterComponent from './components/footerComponent/FooterComponent';
import HeaderComponent from './components/headerComponent/HeaderComponent';
import HomePage from './components/homeComponent/HomePageComponent';
import SignIn from './components/loginComponent/Signin';
import SignUp from './components/loginComponent/Signup';
import OurEventComponent from './components/OurEventComponent/OurEvent';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/signIn' element={<SignIn/>}/>
      <Route path='/homePage' element={<HomePage/>} />
      <Route path='/header' element={<HeaderComponent/>}/>
      <Route path='/footer' element={<FooterComponent/>}/>
      <Route path='/eventList' element={<AllEventList/>}/>
      <Route path='/ourEvent' element={<OurEventComponent/>}/>
    </Routes>
    </>
  );
}

export default App;
