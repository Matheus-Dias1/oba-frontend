import { WindowAction } from '../../@types/bridge.d';
import { Button } from '../Button'
import { Container, Image, Text } from './styles'

export function Greetings() {
  function handleSayHello() {
    window.Main.resizeWindow(WindowAction.CLOSE);
  }

  return (
    <></>
  )
}
 
