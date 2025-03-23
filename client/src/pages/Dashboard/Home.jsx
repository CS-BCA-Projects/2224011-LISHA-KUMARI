import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import HeroSection from '../../components/HeroSection'
import StatsSection from '../../components/StatsSection'
import RecentReports from '../../components/RecentReports'
import HowItWorks from '../../components/HowItWorks'





const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <StatsSection/>
      <RecentReports/>
      <HowItWorks/>
      <Footer/>
      
    </div>
  )
}

export default Home
