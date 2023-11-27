import './App.css'
import { DesktopChat } from './components/DesktopChat'
import { MobileChat } from './components/MobileChat'
import { useResponsive } from './hooks/useMediaQuery'

function App () {
  const isMobile = useResponsive('(max-width: 767px)')

  return (
    <div className='app'>
      <div className='bot_container'>
        {isMobile ? <MobileChat /> : <DesktopChat />}
      </div>
    </div>
  )
}

export default App
