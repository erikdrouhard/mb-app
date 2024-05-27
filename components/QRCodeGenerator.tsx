// 'use client'

// import React, { useState, useRef, useEffect } from 'react'
// import QRCode from 'qrcode'
// import { saveAs } from 'file-saver'
// import { usePathname } from 'next/navigation'
// import Canvas from './Canvas'
// import logo from '@/public/ModiBoxiLogo.svg'
// import Stack from '@/components/Stack'

// interface drawQRCodeProps {
//   (ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void
// }

// // URL to be used in the QR code
// const URL = 'https://resellers.modiboxi.com'

// const QRCodeGenerator = ({ reseller }) => {
//   const { resellerId } = reseller

//   const drawQRCode: drawQRCodeProps = async (ctx, x, y, size) => {
//     const qrDataURL = await QRCode.toDataURL(`${URL}/verified/${resellerId}`)
//     const image = new Image()
//     image.onload = () => {
//       ctx.drawImage(image, x, y, size, size)
//     }
//     image.src = qrDataURL
//   }

//   // const downloadAll = () => {
//   //   const canvases = document.querySelectorAll('canvas')
//   //   canvases.forEach((canvas, index) => {
//   //     const sizes = [300, 600, 900] // small, medium, and large sizes
//   //     sizes.forEach((size, sizeIndex) => {
//   //       const newCanvas = document.createElement('canvas')
//   //       newCanvas.width = size
//   //       newCanvas.height = size
//   //       const ctx = newCanvas.getContext('2d')
//   //       ctx.drawImage(canvas, 0, 0, size, size)
//   //       const link = document.createElement('a')
//   //       link.download = `qrcode${index + 1}_${sizeIndex + 1}.png`
//   //       link.href = newCanvas.toDataURL()
//   //       link.click()
//   //     })
//   //   })
//   // }

//   const downloadAll = () => {
//     const canvases = document.querySelectorAll('canvas')
//     const sizes = [300, 600, 900] // small, medium, and large sizes

//     canvases.forEach((canvas, canvasIndex) => {
//       sizes.forEach((size, sizeIndex) => {
//         try {
//           // Create a high-resolution offscreen canvas
//           const offscreenCanvas = document.createElement('canvas')
//           const offscreenCtx = offscreenCanvas.getContext('2d')
//           offscreenCanvas.width = canvas.width * 2 // Increase the resolution by a factor of 2
//           offscreenCanvas.height = canvas.height * 2

//           // Draw the original canvas onto the high-resolution canvas
//           offscreenCtx.drawImage(
//             canvas,
//             0,
//             0,
//             offscreenCanvas.width,
//             offscreenCanvas.height
//           )

//           // Create a new canvas for the resized image
//           const newCanvas = document.createElement('canvas')
//           newCanvas.width = size
//           newCanvas.height = size
//           const ctx = newCanvas.getContext('2d')

//           // Clear the context before drawing
//           ctx.clearRect(0, 0, newCanvas.width, newCanvas.height)

//           // Enable image smoothing
//           ctx.imageSmoothingEnabled = true

//           // Draw the high-resolution image onto the new canvas
//           ctx.drawImage(
//             offscreenCanvas,
//             0,
//             0,
//             offscreenCanvas.width,
//             offscreenCanvas.height, // source rectangle
//             0,
//             0,
//             size,
//             size // destination rectangle
//           )

//           // Create the download link
//           const link = document.createElement('a')
//           link.download = `qrcode${canvasIndex + 1}_${sizeIndex + 1}.png`
//           link.href = newCanvas.toDataURL()
//           link.click()
//         } catch (error) {
//           console.error(
//             `Error processing canvas ${canvasIndex + 1} at size ${size}:`,
//             error
//           )
//         }
//       })
//     })
//   }

//   return (
//     <div className="mt-2 text-white">
//       <Stack direction="col" className="items-center">
//         <button
//           onClick={downloadAll}
//           className="bg-black p-2 rounded-md text-white border-2 text-lg uppercase min-w-72"
//         >
//           Download
//         </button>
//         <Stack>
//           <Canvas
//             width={300}
//             height={100}
//             draw={(canvas, ctx) => {
//               canvas.width = 190
//               canvas.height = 190
//               ctx.fillStyle = 'transparent'
//               ctx.fillRect(0, 0, canvas.width, canvas.height)

//               ctx.fillStyle = '#C6D5C3'
//               ctx.fillRect(0, 0, canvas.width / 2, canvas.height)

//               const img = new Image()
//               img.src = logo.src
//               img.onload = () => {
//                 ctx.drawImage(img, 15, 42, 64, 53)
//               }

//               drawQRCode(ctx, 106, 40, 72)

//               ctx.fillStyle = '#608058'
//               ctx.font = 'bold 16px sans-serif'
//               ctx.textAlign = 'center'
//               // ctx.textBaseline = 'middle'
//               ctx.fillText('OFFICIAL', canvas.width / 4, 120)
//               ctx.fillText('RESELLER', canvas.width / 4, 136)

//               ctx.fillStyle = '#E3EAE1'
//               ctx.font = '10px sans-serif'
//               ctx.fillText(`ID: ${reseller.resellerId}`, canvas.width - 50, 136)
//               ctx.fillText(`${reseller.name}`, canvas.width - 50, 152)
//               ctx.strokeStyle = '#608058'
//               ctx.lineWidth = 6
//               ctx.strokeRect(0, 0, canvas.width, canvas.height)
//             }}
//           />
//           <Canvas
//             width={300}
//             height={100}
//             draw={(canvas, ctx) => {
//               canvas.width = 190
//               canvas.height = 190
//               ctx.fillStyle = 'transparent'
//               ctx.fillRect(0, 0, canvas.width, canvas.height)

//               ctx.fillStyle = '#C6D5C3'
//               ctx.fillRect(0, 0, canvas.width / 2, canvas.height)

//               ctx.fillStyle = '#2D3C2A'
//               ctx.fillRect(0, 0, canvas.width, 28)

//               ctx.fillStyle = '#E3EAE1'
//               ctx.font = 'bold 16px sans-serif'
//               ctx.textAlign = 'center'
//               // ctx.textBaseline = 'middle'
//               ctx.fillText('OFFICIAL RESELLER', canvas.width / 2, 20)

//               const img = new Image()
//               img.src = logo.src
//               img.onload = () => {
//                 ctx.drawImage(img, 15, 54, 64, 53)
//               }

//               drawQRCode(ctx, 106, 50, 72)

//               ctx.fillStyle = '#E3EAE1'
//               ctx.font = '10px sans-serif'
//               ctx.fillText(`ID: ${reseller.resellerId}`, canvas.width - 50, 146)
//               ctx.fillText(`${reseller.name}`, canvas.width - 50, 162)
//               ctx.strokeStyle = '#608058'
//               ctx.lineWidth = 6
//               ctx.strokeRect(0, 0, canvas.width, canvas.height)
//             }}
//           />
//         </Stack>
//       </Stack>
//     </div>
//   )
// }

// export default QRCodeGenerator
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

// URL to be used in the QR code
const URL = 'https://resellers.modiboxi.com'

const QRCodeGenerator = ({ reseller }) => {
  const { resellerId } = reseller

  const drawQRCode: drawQRCodeProps = async (ctx, x, y, size) => {
    const qrDataURL = await QRCode.toDataURL(`${URL}/verified/${resellerId}`, {
      scale: 10,
    }) // increase the scale for higher resolution
    const image = new Image()
    image.onload = () => {
      ctx.drawImage(image, x, y, size, size)
    }
    image.src = qrDataURL
  }

  const downloadAll = () => {
    const canvases = document.querySelectorAll('canvas')
    const sizes = [300, 600, 900] // small, medium, and large sizes

    canvases.forEach((canvas, canvasIndex) => {
      sizes.forEach((size, sizeIndex) => {
        try {
          // Create a high-resolution offscreen canvas
          const highResCanvas = document.createElement('canvas')
          const highResCtx = highResCanvas.getContext('2d')
          highResCanvas.width = canvas.width * 2 // Increase the resolution by a factor of 2
          highResCanvas.height = canvas.height * 2

          // Draw the original canvas onto the high-resolution canvas
          highResCtx.drawImage(
            canvas,
            0,
            0,
            highResCanvas.width,
            highResCanvas.height
          )

          // Create a new canvas for the resized image
          const newCanvas = document.createElement('canvas')
          newCanvas.width = size
          newCanvas.height = size
          const ctx = newCanvas.getContext('2d')

          // Clear the context before drawing
          ctx.clearRect(0, 0, newCanvas.width, newCanvas.height)

          // Enable image smoothing
          ctx.imageSmoothingEnabled = true

          // Draw the high-resolution image onto the new canvas
          ctx.drawImage(
            highResCanvas,
            0,
            0,
            highResCanvas.width,
            highResCanvas.height, // source rectangle
            0,
            0,
            size,
            size // destination rectangle
          )

          // Create the download link
          const link = document.createElement('a')
          link.download = `qrcode${canvasIndex + 1}_${sizeIndex + 1}.png`
          link.href = newCanvas.toDataURL('image/png')
          link.click()
        } catch (error) {
          console.error(
            `Error processing canvas ${canvasIndex + 1} at size ${size}:`,
            error
          )
        }
      })
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
            width={600} // High resolution width for drawing
            height={600} // High resolution height for drawing
            draw={(canvas, ctx) => {
              canvas.width = 600 // High resolution
              canvas.height = 600
              ctx.fillStyle = 'transparent'
              ctx.fillRect(0, 0, canvas.width, canvas.height)

              ctx.fillStyle = '#C6D5C3'
              ctx.fillRect(0, 0, canvas.width / 2, canvas.height)

              const img = new Image()
              img.src = logo.src
              img.onload = () => {
                // drawImage parameters: image, x, y, width, height
                ctx.drawImage(
                  img,
                  canvas.width / 10,
                  canvas.height / 4,
                  128 * 1.5,
                  106 * 1.5
                ) // Adjust positioning for larger canvas
              }

              ctx.fillStyle = '#608058'
              ctx.font = 'bold 40px sans-serif'
              ctx.textAlign = 'center'
              ctx.fillText('OFFICIAL', canvas.width / 3.9, canvas.height / 1.5)
              ctx.fillText('RESELLER', canvas.width / 3.9, canvas.height / 1.35)

              // drawQRCode parameters: ctx, x, y, size
              drawQRCode(ctx, canvas.width / 1.75, canvas.height / 4, 144 * 1.5)

              ctx.fillStyle = '#E3EAE1'
              ctx.font = '24px sans-serif'
              ctx.fillText(
                `ID: ${reseller.resellerId}`,
                canvas.width / 1.4,
                canvas.height / 1.4
              )
              ctx.fillText(
                `${reseller.name}`,
                canvas.width / 1.4,
                canvas.height / 1.3
              )
              ctx.strokeStyle = '#608058'
              ctx.lineWidth = 12
              ctx.strokeRect(0, 0, canvas.width, canvas.height)
            }}
            style={{ width: '300px', height: '300px' }} // Scaled down for display
          />
          <Canvas
            width={600} // High resolution width for drawing
            height={600} // High resolution height for drawing
            draw={(canvas, ctx) => {
              canvas.width = 600 // High resolution
              canvas.height = 600
              ctx.fillStyle = 'transparent'
              ctx.fillRect(0, 0, canvas.width, canvas.height)

              ctx.fillStyle = '#C6D5C3'
              ctx.fillRect(0, 0, canvas.width / 2, canvas.height)

              ctx.fillStyle = '#2D3C2A'
              ctx.fillRect(0, 0, canvas.width, 56)

              ctx.fillStyle = '#E3EAE1'
              ctx.font = 'bold 32px sans-serif'
              ctx.textAlign = 'center'
              ctx.fillText('OFFICIAL RESELLER', canvas.width / 2, 40)

              const img = new Image()
              img.src = logo.src
              img.onload = () => {
                // drawImage parameters: image, x, y, width, height
                ctx.drawImage(
                  img,
                  canvas.width / 10,
                  canvas.height / 4,
                  128 * 1.5,
                  106 * 1.5
                ) // Adjust positioning for larger canvas
              }

              // drawQRCode parameters: ctx, x, y, size
              drawQRCode(ctx, canvas.width / 1.75, canvas.height / 4, 144 * 1.5) // Adjust positioning and size for larger canvas

              ctx.fillStyle = '#E3EAE1'
              ctx.font = '24px sans-serif'
              ctx.fillText(
                `ID: ${reseller.resellerId}`,
                canvas.width / 1.4,
                canvas.height / 1.4
              )
              ctx.fillText(
                `${reseller.name}`,
                canvas.width / 1.4,
                canvas.height / 1.3
              )
              ctx.strokeStyle = '#608058'
              ctx.lineWidth = 12
              ctx.strokeRect(0, 0, canvas.width, canvas.height)
            }}
            style={{ width: '300px', height: '300px' }} // Scaled down for display
          />
        </Stack>
      </Stack>
    </div>
  )
}

export default QRCodeGenerator
