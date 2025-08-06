import { useState } from 'react'
import { Button } from 'tamagui'
import { TouchableOpacity, Text as RNText } from 'react-native';

export default function MinimalButtonTest() {
  const [isBlue, setIsBlue] = useState(true)
  return (
    <>
      <Button
        backgroundColor={isBlue ? '#3b82f6' : '#10b981'}
        onPress={() => {
          console.log('Tamagui button pressed', isBlue)
          setIsBlue(prev => !prev)
        }}>
        Toggle ({isBlue.toString()})
      </Button>

      <TouchableOpacity onPress={() => console.log("Native touchable pressed")}>
        <RNText>Plain RN Button</RNText>
      </TouchableOpacity>
    </>
  )
}

