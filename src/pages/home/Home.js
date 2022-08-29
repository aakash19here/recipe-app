import React from 'react'
import RecipeList from '../../components/RecipeList'
import { useFetch } from '../../hooks/useFetch'
import './Home.css'
const Homepage = () => {
  // const {data , isPending , error} = useFetch('http://localhost:3000/recipes')
  const {data , isPending , error} = useFetch('https://api-recipe-project.herokuapp.com/recipes')
  return (
    <div className='home'>
      {isPending && <p className='loading'>Loading...</p>}
      {error && <p className='error'>{error}</p>}
      {data && <RecipeList recipes = {data}/>}
    </div>
  )
}

export default Homepage