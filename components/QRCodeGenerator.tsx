'use client'

import React, { useState, useRef } from 'react'
import QRCode from 'react-qr-code'
import { saveAs } from 'file-saver'
import { usePathname } from 'next/navigation'

const QRCodeGenerator = ({ size }) => {
  const [downloadUrl, setDownloadUrl] = useState('')
  const qrCodeRef = useRef()
  const pathname = usePathname()

  const downloadQRCode = () => {
    // fix the below line
    const canvas = qrCodeRef.current.querySelector('canvas')
    canvas.toBlob((blob) => {
      saveAs(blob, 'qrcode.png')
    })
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

  return (
    <div ref={qrCodeRef}>
      <QRCode
        value={`https://mb-app-delta.vercel.app${pathname}`}
        size={size}
      />
      <button onClick={downloadQRCode}>Download QR Code</button>
      <button onClick={copyEmbedCode}>Copy Embed Code</button>
    </div>
  )
}

export default QRCodeGenerator
