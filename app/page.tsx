import Image from 'next/image'
import Logo from '@/public/ModiBoxiLogo.svg'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <section className="w-30 h-30">
        <Image src={Logo} alt="ModiBoxi Logo" />
      </section>
      <section className="mt-24">
        <h2 className="text-3xl font-bold mb-4">
          Commerical QR Code Generator
        </h2>
        <form className="flex flex-col">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name..."
            className="p-2 mb-4 border rounded-md w-full text-black"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email..."
            className="p-2 mb-4 border rounded-md w-full text-black"
          />
          <label htmlFor="id">Reseller ID:</label>
          <input
            type="text"
            id="id"
            name="id"
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
      </section>
    </main>
  )
}
