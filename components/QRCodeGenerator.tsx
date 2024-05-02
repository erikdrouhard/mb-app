'use client'

import React, { useState, useRef, useEffect } from 'react'
import QRCode from 'qrcode'
import { saveAs } from 'file-saver'
import { usePathname } from 'next/navigation'
import Canvas from './Canvas'
import logo from '@/public/ModiBoxiLogo.svg'
import Stack from '@/components/Stack'

interface drawQRCodeProps {
  (ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void
}

//temp url
const pageUrl = 'https://mb-app-delta.vercel.app'

const QRCodeGenerator = ({ reseller }) => {
  const pathname = usePathname()

  const drawQRCode: drawQRCodeProps = async (ctx, x, y, size) => {
    const qrDataURL = await QRCode.toDataURL(`${pageUrl}${pathname}`)
    const image = new Image()
    image.onload = () => {
      ctx.drawImage(image, x, y, size, size)
    }
    image.src = qrDataURL
  }

  const downloadAll = () => {
    const canvases = document.querySelectorAll('canvas')
    canvases.forEach((canvas, index) => {
      const link = document.createElement('a')
      link.download = `qrcode${index + 1}.png`
      link.href = canvas.toDataURL()
      link.click()
    })
  }

  return (
    <div className="mt-2 text-white">
      <Stack direction="col" className="items-center">
        <button
          onClick={downloadAll}
          className="bg-black p-2 rounded-md text-white border-2 text-lg uppercase min-w-72"
        >
          Download
        </button>
        <Stack>
          <Canvas
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
              ctx.fillText(`ID: ${reseller.resellerId}`, canvas.width - 50, 136)
              ctx.fillText(`${reseller.name}`, canvas.width - 50, 152)
              ctx.strokeStyle = '#608058'
              ctx.lineWidth = 6
              ctx.strokeRect(0, 0, canvas.width, canvas.height)
            }}
          />
          <Canvas
            width={300}
            height={100}
            draw={(canvas, ctx) => {
              canvas.width = 190
              canvas.height = 190
              ctx.fillStyle = 'transparent'
              ctx.fillRect(0, 0, canvas.width, canvas.height)

              ctx.fillStyle = '#C6D5C3'
              ctx.fillRect(0, 0, canvas.width / 2, canvas.height)

              ctx.fillStyle = '#2D3C2A'
              ctx.fillRect(0, 0, canvas.width, 28)

              ctx.fillStyle = '#E3EAE1'
              ctx.font = 'bold 16px sans-serif'
              ctx.textAlign = 'center'
              // ctx.textBaseline = 'middle'
              ctx.fillText('OFFICIAL RESELLER', canvas.width / 2, 20)

              const img = new Image()
              img.src = logo.src
              img.onload = () => {
                ctx.drawImage(img, 15, 54, 64, 53)
              }

              drawQRCode(ctx, 106, 50, 72)

              ctx.fillStyle = '#E3EAE1'
              ctx.font = '10px sans-serif'
              ctx.fillText(`ID: ${reseller.resellerId}`, canvas.width - 50, 146)
              ctx.fillText(`${reseller.name}`, canvas.width - 50, 162)
              ctx.strokeStyle = '#608058'
              ctx.lineWidth = 6
              ctx.strokeRect(0, 0, canvas.width, canvas.height)
            }}
          />
        </Stack>
      </Stack>
    </div>
  )
}

export default QRCodeGenerator
