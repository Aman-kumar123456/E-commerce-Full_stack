import React from 'react'
import { MdConnectWithoutContact } from "react-icons/md";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className='border-t'>

    <div className='mx-auto p-4 flex flex-col text-center gap-2 lg:flex-row justify-between bg-blue-200 '>
                <p>ᯤ  Contact, address and business hours</p>
      <div className="flex items-center justify-center gap-3 text-2xl">
        <a href=''><CiFacebook /></a>
        <a href=''><FaInstagram /></a>
        <a href=''><FaWhatsapp /></a>

        </div>
    </div>

    </footer>
   
  )
}

export default Footer
