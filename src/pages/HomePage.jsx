import React, { useRef } from 'react'
import { setTrainerG } from '../store/states/trainer.state'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './HomePage.css';


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
  <div className="container__Home">       <h1>Pokedex</h1>
      <h2 className='hi__trainer'>Hi Trainer!</h2>
      <p className='hi__trainer'>To start write your name coach</p>
      <form className='hi__trainer' onSubmit={handleSubmit}>
        <input className='hi__trainer' ref={inputTrainer} type="text" />
        <button className='hi__trainer'>Cath Them All</button>
      </form>
    </div>
  )
}

export default HomePage
