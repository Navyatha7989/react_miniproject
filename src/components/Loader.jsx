import React from 'react'
import {BeatLoader, ClipLoader} from 'react-spinners'

export default function Loader({type='beat'}) {
  return (
    <div className="loader-container" data-testid="loader">
      {type === 'clip'
        ? <ClipLoader color="#D81F26" size={50} />
        : <BeatLoader color="#D81F26" size={15} />}
    </div>
  )
}