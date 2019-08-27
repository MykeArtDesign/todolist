import React, { Component } from 'react'
import { View, ScrollView, Text, AsyncStorage } from 'react-native'
import Header from './components/header'
import TaskList from './components/task-list'
import ButtonAddTask from './components/button-add-task'
import MenuTask from './components/menu-task'
import { TASK } from './model'
import TextPrompt from './components/text-prompt'
import { style } from './style'

const storageKey='taskList'

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      taskList: [],
      currentTask:{},
      menuTaskVisibility: false,
      isAddPromptVisible: false,
      isRenamePromptVisible:false,
      idGenerator: 0
    }
  }

  componentWillMount = () => {
    AsyncStorage.getItem(storageKey).then( storedTaskList => {
      if( storedTaskList ){
        this.setState({ 
          taskList: JSON.parse(storedTaskList)
        }, () => {
          this.setState({ 
            idGenerator: this.state.taskList[this.state.taskList.length - 1].id + 1 
          })
        })
      }
    })
  }

  toggleMenuTaskVisibility = task => {
    let currentTask = task
    if( this.state.menuTaskVisibility ) {
      currentTask= {}
    }
    this.setState({ 
      menuTaskVisibility: !this.state.menuTaskVisibility,
      currentTask: task 
    })
  }

  deleteCurrentTask = () => {
    const list = this.state.taskList.filter( task => {     
        return task.id !== this.state.currentTask.id
    })

    this.setState({
      taskList: list, 
      currentTask:{}
    },() => {
    this.toggleMenuTaskVisibility()
    this.saveTaskList()
    }
    )
  }

  changeStatusCurrentTask = () => {
     const updatedTask = this.state.currentTask
     updatedTask.status = updatedTask.status === TASK.doneStatus?
     TASK.todoStatus : TASK.doneStatus
     this.state.taskList.map( task => {
       return task.id === updatedTask.id ? task = updatedTask : null 
     })
     this.setState({
       taskList: this.state.taskList,
       menuTaskVisibility: false,
       currentTask:{}
     }, () => this.saveTaskList() )
  }

  hideAddPrompt = () => {
    this.setState({
      isAddPromptVisible: false
    })
  }

  onAddTask = value => {
    const task = {
      id: this.state.idGenerator,
      content: value,
      status: TASK.todoStatus
    }

    this.setState({
      taskList: [...this.state.taskList, task],
      isAddPromptVisible: false,
      idGenerator: this.state.idGenerator + 1
    }, () => this.saveTaskList())
  }

  displayAddPrompt = () => {
    this.setState({
      isAddPromptVisible: true
    })
  }

  displayRenameTask = task => {
    this.setState({
      currentTask: task,
      isRenamePromptVisible: true
    })
  }

  hideRenamePrompt = () => {
    this.setState({
      isRenamePromptVisible: false,
      currentTask: {}
    })
  }

  onRenameTask = value => {
    const updatedTask = this.state.currentTask
     this.state.taskList.map( task => {
       return task.id === updatedTask.id ? task.content = value : null 
     })

     this.setState({
       taskList: this.state.taskList },
      () => {
        this.hideRenamePrompt()
        this.saveTaskList()
      }
    )
  }

  saveTaskList = () => {
    AsyncStorage.setItem(storageKey, JSON.stringify(this.state.taskList))
  }  
  renderTaskList = () => {
    return this.state.taskList.length > 0 ?  (
      <TaskList 
          onPressCallBack={ this.toggleMenuTaskVisibility } 
          onLongPressCallBack={ this.displayRenameTask }
          taskList={ this.state.taskList } />
    )
    : (<View style={ style.noTask } ><Text>Cliquer sur le bouton pour créer une nouvelle tâche</Text></View>)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header content="Liste de tâches"/>
        
        <ScrollView>
          { this.renderTaskList() }
        </ScrollView>
        <MenuTask 
        isVisible={ this.state.menuTaskVisibility } 
        onDisapearCallBack={ this.toggleMenuTaskVisibility }
        onDeleteCallBack={ this.deleteCurrentTask }
        onChangeStatusCallBack={ this.changeStatusCurrentTask }
        />
        <TextPrompt 
        title={'Ajouter une nouvelle tâche'}
        placeholder={'Ex: Acheter du pain'}
        defaultValue={''}
        isVisible={ this.state.isAddPromptVisible } 
        onCancelCallBack={ this.hideAddPrompt } 
        onSubmitCallBack={ this.onAddTask }
        />
        <TextPrompt 
        title={'Renommer la tâche'}
        defaultValue={ this.state.currentTask ? this.state.currentTask.content : '' }
        isVisible={ this.state.isRenamePromptVisible } 
        onCancelCallBack={ this.hideRenamePrompt } 
        onSubmitCallBack={ this.onRenameTask }
        />
        <ButtonAddTask onPressCallBack={ this.displayAddPrompt }/>
      </View>
    )
  }
}