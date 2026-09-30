import React from 'react'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="footer">
      <p>Contact us</p>
      <div className="social-icons">
        <button aria-label="Google"><FaGoogle /></button>
        <button aria-label="Twitter"><FaTwitter /></button>
        <button aria-label="Instagram"><FaInstagram /></button>
        <button aria-label="Youtube"><FaYoutube /></button>
      </div>
    </footer>
  )
}