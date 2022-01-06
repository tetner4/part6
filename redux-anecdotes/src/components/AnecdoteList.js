import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseVoteOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'



const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()

    const voteForAndDisplayNotification = () => {
        dispatch(increaseVoteOf(anecdote))
        dispatch(setNotification(`'You voted for ${anecdote.content}'`, 5))
        
    }

    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has this many votes: {anecdote.votes}
                <button onClick={voteForAndDisplayNotification}>Vote</button>
            </div>
        </div>
    )
}
const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
        if (filter === null) {
            return anecdotes
        }

        const regex = new RegExp(filter, 'i')
        return anecdotes.filter(anecdote => anecdote.content.match(regex))
    })

    const sortByVotes = (first, second) => second.votes - first.votes

    return (
        anecdotes.sort(sortByVotes).map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} />)
    )
}


export default AnecdoteList