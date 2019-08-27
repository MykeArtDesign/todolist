import { StyleSheet } from 'react-native'
import { APP_COLORS } from '../../styles/colors'

export const style = StyleSheet.create({
  buttonChangeStatus:{
    backgroundColor: APP_COLORS.primaryAction
  },
  buttonDelete:{
    backgroundColor: APP_COLORS.deleteColor,
    marginRight: 30
  },
  modal:{
    backgroundColor: APP_COLORS.primaryText,
    height: 200,
    justifyContent: "space-around"
  },
  buttonView:{
    flexDirection: "row",
    justifyContent:"center"
  },
  textView:{
    justifyContent:"center",
    alignItems:"center"
  }
})