import React from 'react'
import ActionButton from 'react-native-action-button'
import { APP_COLORS } from '../../styles/colors'
import { Icon } from 'react-native-elements'

const ButtonAddTask = ({ onPressCallBack }) => (
  <ActionButton
  buttonColor={ APP_COLORS.primaryAction }
  renderIcon={ () => (<Icon color={ APP_COLORS.primaryText } name={'add'} />) }
  onPress={ onPressCallBack}
  />
)


export default ButtonAddTask