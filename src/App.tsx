import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Coinpage from './components/Coinpage';
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthContextProvider } from './context/AuthContext';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Account from './components/Account';


function App() {
  //state for coins
  const [coins, setCoins] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  // console.log(coins)
  
  
  const url: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d'


  //fetch coin data
  useEffect(() => {
    setLoading(true)
    axios.get(url).then((response) => {
      setCoins(response.data)
      setLoading(false)
      // console.log(response.data)
  })
  }, [])


  // if (loading) return <h1>Loading...</h1>

  return (
    <div className='dark:bg-black dark:text-white  relative flex flex-col' >
    <ThemeProvider>
      <AuthContextProvider>
        <Navbar />
        
        <Routes>
          <Route path='/' element={<Home coins={coins} loading={loading} />} />
          <Route path='/coin/:coinId' element={<Coinpage />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/account' element={<Account />} />
        </Routes>
        
        <Footer />
      </AuthContextProvider>
      
    </ThemeProvider>
    </div>
  );
}

export default App;
