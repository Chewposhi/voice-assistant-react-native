import Rive, { Fit, Alignment, RiveRef } from 'rive-react-native';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface RiveVoiceBlobProps {
  audioLevel: number;
  size?: number;
}

export default function RiveVoiceBlob({ audioLevel, size = 400 }: RiveVoiceBlobProps) {
  const riveRef = useRef<RiveRef>(null);
  
  useEffect(() => {
    if (riveRef.current) {
      try {
        // Set audio level to 100 when active, 0 when inactive
        riveRef.current.setInputState('State Machine 1', 'Audio Level', audioLevel);
      } catch (e) {
        console.error('Failed to set input state:', e);
      }
    }
  }, [audioLevel]);

  const animationStyle: ViewStyle = {
    width: size,
    height: size,
    alignSelf: 'center',
  };

  return (
    <View style={styles.container}>
      <Rive
        ref={riveRef}
        resourceName="voice_blob"
        autoplay={true}
        fit={Fit.Contain}
        alignment={Alignment.Center}
        stateMachineName="State Machine 1"
        style={animationStyle}
        onStateChanged={(stateMachineName, stateName) => {
          console.log('State changed:', stateMachineName, stateName);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
}); 