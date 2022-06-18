
import { Greetings } from './components/Greetings'
import { TitleBar } from './components/TitleBar'
import './styles/global.scss';



export function App() {
  return (
    <>
      <TitleBar />
      <Greetings/>
    </>
  )
}