'use client'
// import { validateReseller } from '@/utils/actions'
import React from 'react'
import { useRouter } from 'next/navigation'

interface Reseller {
  name: string
  email: string
  id: string
}

const GetQRCodeForm = () => {
  const [reseller, setReseller] = React.useState({
    name: '',
    email: '',
    id: '',
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReseller({
      ...reseller,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newPath = `/resellers/${reseller.id}`
    router.push(newPath)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* 
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleChange}
        placeholder="Enter your name..."
        className="p-2 mb-4 border rounded-md w-full text-black"
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        onChange={handleChange}
        placeholder="Enter your email..."
        className="p-2 mb-4 border rounded-md w-full text-black"
      /> */}
      <label htmlFor="id">Reseller ID:</label>
      <input
        type="text"
        id="id"
        name="id"
        onChange={handleChange}
        placeholder="Enter your commerical ID..."
        className="p-2 mb-8 border rounded-md w-full text-black"
      />
      <button
        type="submit"
        className="p-2 border bg-black text-white rounded-md w-full hover:bg-gray-800 active:scale-[.95] transition-transform duration-200 ease-out"
      >
        Get QR Code!
      </button>
    </form>
  )
}

export default GetQRCodeForm
