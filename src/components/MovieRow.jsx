import React from 'react'
import Slider from 'react-slick'
import MovieCard from './MovieCard'
import Loader from './Loader'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function MovieRow({title, movies, loading=false}) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
    responsive: [
      {breakpoint: 1200, settings: {slidesToShow: 4}},
      {breakpoint: 900, settings: {slidesToShow: 3}},
      {breakpoint: 600, settings: {slidesToShow: 2}},
      {breakpoint: 420, settings: {slidesToShow: 1}}
    ]
  }

  if (loading) return <section className="movie-section"><h2>{title}</h2><Loader type="clip" /></section>

  return (
    <section className="movie-section">
      <h2>{title}</h2>
      <Slider {...settings}>
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </Slider>
    </section>
  )
}