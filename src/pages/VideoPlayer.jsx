import React, {useRef, useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

export default function VideoPlayer() {
  const videoRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const [playing, setPlaying] = useState(false)

  const toggle = async () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      await videoRef.current.play()
      setPlaying(true)
    } else {
      videoRef.current.pause()
      setPlaying(false)
    }
  }

  return (
    <main className="video-player">
      <button onClick={() => navigate(-1)}>← Back</button>
      <video ref={videoRef} controls width="100%" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
        <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
      </video>
      <button onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
    </main>
  )
}
