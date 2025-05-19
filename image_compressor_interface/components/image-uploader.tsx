"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Loader2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ImageUploader() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64Image = e.target?.result as string
        setOriginalImage(base64Image)
        await processImage(base64Image)
      }
      reader.readAsDataURL(file)
    }
  }

  const processImage = async (base64Image: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:5000/process_image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      })

      if (!response.ok) {
        throw new Error("Failed to process image")
      }

      const data = await response.json()
      setProcessedImage(data.processed_image)
    } catch (error) {
      console.error("Error processing image:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-12">
      <Card className="border-2 border-blue-100 shadow-xl hover:shadow-2xl transition-shadow">
        <CardContent className="p-8">
          <div className="flex items-center justify-center w-full">
            <label htmlFor="file-upload" className="w-full cursor-pointer">
              <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 transition-colors bg-blue-50">
                <Upload className="w-16 h-16 mb-4 text-blue-600" />
                <p className="mb-2 text-xl font-semibold text-blue-600">Click to upload an image</p>
                <p className="text-sm text-gray-500 mb-4">PNG, JPG or GIF (MAX. 800x400px)</p>
                <Button className="bg-blue-600 hover:bg-blue-700">Select Image</Button>
              </div>
              <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
            </label>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-xl font-semibold text-blue-800">Processing your image...</p>
          <p className="text-gray-600 mt-2">This may take a few moments</p>
        </div>
      )}

      {originalImage && processedImage && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-blue-900 text-center">Results</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-blue-100 shadow-lg overflow-hidden">
              <div className="bg-blue-900 text-white py-3 px-4">
                <h3 className="text-lg font-semibold text-center">Original Image</h3>
              </div>
              <CardContent className="p-6">
                <div className="relative w-full h-64 bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={originalImage || "/placeholder.svg"}
                    alt="Original"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100 shadow-lg overflow-hidden">
              <div className="bg-blue-900 text-white py-3 px-4">
                <h3 className="text-lg font-semibold text-center">Processed Image</h3>
              </div>
              <CardContent className="p-6">
                <div className="relative w-full h-64 bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={processedImage || "/placeholder.svg"}
                    alt="Processed"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-6">
            <Card className="border-blue-100 shadow-md p-4 bg-blue-50">
              <p className="text-sm text-gray-700 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                The processed image has been reduced in dimensionality while preserving essential features
              </p>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
