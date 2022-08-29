import './Create.css'

import React, { useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch';

const Create = () => {
  //States 
  const [title,setTitle] = useState('');
  const [method , setMethod] = useState('')
  const [cookingTime , setCookingTime ] = useState('')
  const [newIngredient , setNewIngredient] = useState('')
  const [ingredients , setIngredients] = useState([])
  const ingredientInput = useRef(null)
  // const {postData,data} = useFetch('http://localhost:3000/recipes','POST')
  const {postData,data} = useFetch('https://api-recipe-project.herokuapp.com/recipes','POST')
  const history = useHistory();
  //Functions
  const handleSubmit = (e) => {
    e.preventDefault();
    postData({title,ingredients,method,cookingTime: cookingTime + " minutes"})
  }
  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim()
    if(ing && !ingredients.includes(ing)) {
       setIngredients((prev) => [...prev,ing])
    }
    setNewIngredient('')
    ingredientInput.current.focus()  
  }
  //redirect user when we get data response 
  useEffect(()=>{
    if(data){
      history.push('/')
    }
  },[data,history])
  return (
    <div className='create'>
        <h2 className='page-title'>Add a new recipe</h2>
        <form onSubmit={handleSubmit}>
          {/* title */}
          <label>
            <span>Recipe title:</span>
            <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            />
          </label>
          {/* Ingredients */}
          <label>
            <span>Recipe ingredients:</span>
            <div className='ingredients'>
              <input
              type='text'
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
              />
              <button onClick={handleAdd} className='btn'>Add </button>
            </div>
          </label>
          <p>Current ingredients: {ingredients.map((ingredient) => (
            <em key={ingredient}>{ingredient},</em>
          ))}</p>
          {/* Method */}
          <label>
            <span>Recipe Method</span>
            <textarea
             onChange={(e) => setMethod(e.target.value)} 
             value = {method}
             required
            />
          </label>
          <label>
            <span>Cooking time (minutes) :</span>
            <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value = {cookingTime}
            required
            />
          </label>
          <button className='btn'>Submit</button>
        </form>
    </div>
  )
}

export default Create