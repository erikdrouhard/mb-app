import Image from 'next/image'
import Logo from '@/public/ModiBoxiLogo.svg'
import Verified from '@/public/verified.svg'
import NotFound from '@/public/reseller-not-found.svg'
import QRCodeGenerator from '@/components/QRCodeGenerator'
import db from '@/utils/db'

const getResellers = async () => {
  try {
    const resellers = await db.reseller.findMany({})
    return resellers
  } catch (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>User not found</p>
      </div>
    )
  }
}

const ResellerIdPage = async ({ params }) => {
  const resellers = await getResellers()
  const reseller = resellers.filter((reseller) => {
    // how to convert params.id value to a string?
    const id = params.id.toString()
    return reseller.resellerId === id
  })

  return (
    <div className="pt-24 flex flex-col items-center align-middle">
      {reseller[0] ? (
        <div className="flex flex-col items-center align-middle gap-8">
          <div className="bg-white p-3 rounded-md flex flex-row items-center gap-4 border-solid border-4 border-[#56804C]">
            <div className="h-full">
              <Image src={Verified} alt="Verified" />
            </div>
            <dl className="flex flex-col gap-1 h-full justify-center text-lg">
              <div className="flex flex-row gap-1">
                <dt className="min-w-16 font-semibold">Name:</dt>
                <dd>{reseller[0].name}</dd>
              </div>

              <div className="flex flex-row gap-1">
                <dt className="min-w-16 font-semibold">Email:</dt>
                <dd>{reseller[0].email}</dd>
              </div>

              <div className="flex flex-row gap-1">
                <dt className="min-w-16 font-semibold">ID:</dt>
                <dd>{reseller[0].resellerId}</dd>
              </div>
            </dl>
          </div>
          <Image src={Logo} alt="ModiBoxi Logo" />
          <div>
            <div>
              <h1>Generate and Download QR Code</h1>
              <QRCodeGenerator size={50} />
              <QRCodeGenerator size={100} />
              <QRCodeGenerator size={200} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center align-middle gap-8">
          <div className="bg-white p-3 rounded-md flex flex-row gap-4 items-center border-solid border-4 border-rose-600">
            <div className="h-full">
              <Image src={NotFound} alt="Not found" />
            </div>
            <p className="font-semibold">Reseller not found.</p>
          </div>
          <Image src={Logo} alt="ModiBoxi Logo" />
        </div>
      )}
    </div>
  )
}

export default ResellerIdPage
