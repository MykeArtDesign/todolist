import React from 'react'
import Modal from 'react-native-modal'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { style } from './style'

const MenuTask = ({ isVisible, onDisapearCallBack, onDeleteCallBack, onChangeStatusCallBack }) => (
      <Modal 
      isVisible={ isVisible }
      animationIn={'zoomInDown'}
      animationOut={'zoomOutUp'}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={1000}
      onBackdropPress={ () => onDisapearCallBack()}
      >
          <View style={style.modal}>
            <View style={style.textView}>
              <Text>Que souhaitez-vous faire de cette tâche?</Text>
            </View>
            <View style={ style.buttonView }>
              <Button
              title="Supprimer"
              buttonStyle={ style.buttonDelete }
              onPress={() => onDeleteCallBack() }
              />
              <Button
              title="Changer Status"
              buttonStyle={ style.buttonChangeStatus }
              onPress={() => onChangeStatusCallBack()}
              />
            </View>
          </View>
      </Modal>
)

export default MenuTask