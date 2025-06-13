import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef= useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWQ5NDVlMDkzZTIwYmVkZGJlMDcxZjFkY2Q1YzgxMCIsIm5iZiI6MTc0NTY5NDc0Mi42NDIsInN1YiI6IjY4MGQzMDE2M2M3MThlOGM1NTM3YjQwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q5i_dy8jVI72CbBTkmtoRefDRJq1TruhRWmW8mLBnTc'
    }
  };
  

const handleWheel= (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft +=event.deltaY;
}

useEffect(()=>{
  
  fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel', handleWheel);
},[category])
  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`}  className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
