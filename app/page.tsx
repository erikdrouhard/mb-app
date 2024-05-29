import Image from 'next/image'
import Logo from '@/public/ModiBoxiLogo.svg'
import GetQRCodeForm from '@/components/GetQRCodeForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <section className="w-30 h-30">
        <Image src={Logo} alt="ModiBoxi Logo" />
      </section>
      <section className="mt-24">
        <h2 className="text-3xl font-bold mb-4">
          Commercial QR Code Generator
        </h2>
        <GetQRCodeForm />
      </section>
    </main>
  )
}
