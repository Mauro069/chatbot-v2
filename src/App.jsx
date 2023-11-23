import './App.css'
import { DesktopChat } from './components/DesktopChat'
import { MobileChat } from './components/MobileChat'

function App () {
  return (
    <div className='app'>
      <div className='bot_container'>
        {/* <DesktopChat /> */}
        <MobileChat />
      </div>
    </div>
  )
}

export default App
