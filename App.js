import React ,{useState} from 'react';
import { StyleSheet, View ,Text,Platform} from 'react-native';

import { Focus } from './src/features/focus/Focus.js';
import { colors, Colors } from './src/utils/colors';
import { Timer } from './src/features/timer/Timers.js'; 
import { spacing ,fontSizes} from './src/utils/sizes.js';



export default function App() {
 const [focusSubject,setfocusSubject]=useState("Learning React Native");
 return (
    <View style={styles.container}>
      {focusSubject ?(
         <Timer focusSubject={focusSubject}/>
         ) : (
          <Focus addSubject={setfocusSubject}/>
         )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:Platform.OS === 'ios' ?spacing.md :spacing.lg,
    backgroundColor:colors.darkBlue,
  },
});

