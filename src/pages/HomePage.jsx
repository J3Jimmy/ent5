import React, { useRef } from 'react'
import { setTrainerG } from '../store/states/trainer.state'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
const inputTrainer = useRef()

const dispatch = useDispatch()

const navigate = useNavigate()

const handleSubmit = e => {
  e.preventDefault()
  dispatch(setTrainerG(inputTrainer.current.value.trim()))
  navigate('/Pokedex')
}

  return (
    <div>
      <h1>Pokedex</h1>
      <h2>Hi Trainer!</h2>
      <p>To Start</p>
      <form onSubmit={handleSubmit}>
        <input ref={inputTrainer} type="text" />
        <button>Cath Them All</button>
      </form>
    </div>
  )
}

export default HomePage
