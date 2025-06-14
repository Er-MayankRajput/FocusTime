import React ,{useState} from 'react';
import { StyleSheet, View ,Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { spacing } from "../../utils/sizes";
import { colors } from "../../utils/colors";

export const Focus= ({addSubject}) => {
  const [tmpItem,setTmpItem]=useState(null)
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
      <Text>What  would you like to Focus On ? </Text>
      <View style={styles.inputContainer}>
        <TextInput style={{flex:1 ,marginRight:spacing.md}}  onSubmitEditing={({ nativeEvent }) => {
              setTmpItem(nativeEvent.text); 
            }} />
        <RoundedButton size={50} title="+" onPress={()=>addSubject(tmpItem)}/>
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer : {
    flex:0.5,
    padding:spacing.md,
    justifyContent: "center"
  },
  title : {
       color:colors.white,
       fontWeight:"bold",
       fontSize:spacing.lg,
  },
  inputContainer: {
    paddingTop:spacing.md,
    flexDirection:'row',
    alignItems:'center'
  }
});
