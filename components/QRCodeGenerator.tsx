'use client'

import React, { useState, useRef, useEffect } from 'react'
import QRCode from 'qrcode'
import { saveAs } from 'file-saver'
import { usePathname } from 'next/navigation'
import CanvasTest from './CanvasTest'
import logo from '@/public/ModiBoxiLogo.svg'

const QRCodeGenerator = () => {
  const [downloadUrl, setDownloadUrl] = useState('')
  const qrCodeRef = useRef()
  const pathname = usePathname()

  const downloadQRCode = () => {
    // Access the canvas element from the QRCode component
    const canvas = qrCodeRef.current.querySelector('canvas')
    if (canvas) {
      canvas.toBlob((blob) => {
        saveAs(blob, 'qrcode.png')
      })
    } else {
      console.error('No canvas element found')
    }
  }
  const copyEmbedCode = () => {
    const embedCode = `<img src="${downloadUrl}" alt="QR Code" />`
    navigator.clipboard.writeText(embedCode).then(
      () => {
        alert('Embed code copied to clipboard!')
      },
      (err) => {
        alert('Could not copy embed code: ', err)
      }
    )
  }

  const drawQRCode = async (ctx, x, y, size) => {
    const qrDataURL = await QRCode.toDataURL(pathname)
    const image = new Image()
    image.onload = () => {
      ctx.drawImage(image, x, y, size, size)
    }
    image.src = qrDataURL
  }

  return (
    <div className="border-solid border-4 border-[#608058] p-4 rounded-md mt-2 text-white">
      <CanvasTest
        width={300}
        height={100}
        draw={(canvas, ctx) => {
          canvas.width = 190
          canvas.height = 190
          ctx.fillStyle = 'transparent'
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          ctx.fillStyle = '#C6D5C3'
          ctx.fillRect(0, 0, canvas.width / 2, canvas.height)

          const img = new Image()
          img.src = logo.src
          img.onload = () => {
            ctx.drawImage(img, 15, 42, 64, 53)
          }

          drawQRCode(ctx, 106, 40, 72)

          ctx.fillStyle = '#608058'
          ctx.font = 'bold 16px sans-serif'
          ctx.textAlign = 'center'
          // ctx.textBaseline = 'middle'
          ctx.fillText('OFFICIAL', canvas.width / 4, 120)
          ctx.fillText('RESELLER', canvas.width / 4, 136)

          ctx.fillStyle = '#E3EAE1'
          ctx.font = '10px sans-serif'
          ctx.fillText('ID:', canvas.width / 2 + 20, 136)
          ctx.fillText('Name', canvas.width / 2 + 20, 152)
          ctx.strokeRect(0, 0, canvas.width, canvas.height)
        }}
      />
      <button onClick={downloadQRCode}>Download QR Code</button> |{' '}
      <button onClick={copyEmbedCode}>Copy Embed Code</button>
    </div>
  )
}

export default QRCodeGenerator
