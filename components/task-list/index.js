import React from 'react'
import { ListItem } from 'react-native-elements'
import { View } from 'react-native'
import { TASK } from '../../model'
import { APP_COLORS } from '../../styles/colors'
import _ from 'lodash'

const TaskList = ({ taskList, onPressCallBack, onLongPressCallBack }) => {
  
  return (
    <View>
      {
        taskList.map( task => {
          const background = task.status === TASK.todoStatus ?
          APP_COLORS.accent 
          : APP_COLORS.lightPrimaryColor

          return (
          <ListItem 
          key={task.id} 
          title={ task.content }
          onPress={ () => onPressCallBack(task)}
          onLongPress={ () => onLongPressCallBack(task)}
          chevron={ true }
          bottomDivider={ true }
          badge={{ 
            value: task.status,
            badgeStyle: {
              backgroundColor: background 
            },
            textStyle: {
              marginHorizontal: 7
            }
        }}
          />
  )})
      }
    </View>
  )
}

export default TaskList
