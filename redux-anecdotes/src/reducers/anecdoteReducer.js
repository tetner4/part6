import anecdoteService from '../services/anecdotes'


const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  switch(action.type){
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANEC':
      return action.data
    case 'ADD_VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      console.log(anecdoteToChange)
      const changedAnecdote = {
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
        )
  default:
    return state

  }
}

export const initializeAnecdotes = () => {
 return async dispatch => {
   const anecdotes = await anecdoteService.getAll()
   dispatch({
     type: 'INIT_ANEC',
     data: anecdotes,
   })
 }
}

export const increaseVoteOf = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})

    dispatch({
      type:'ADD_VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}


export default anecdoteReducer