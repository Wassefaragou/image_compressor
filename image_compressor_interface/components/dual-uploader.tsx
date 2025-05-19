"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Info, Download, FileDown, ImageIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DualUploader() {
  // Image upload state
  const [processed, setProcessed] = useState<string | null>(null)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [encodedFileUrl, setEncodedFileUrl] = useState<string | null>(null)
  const [isImageLoading, setIsImageLoading] = useState(false)

  // NPZ upload state
  const [reconstructedImage, setReconstructedImage] = useState<string | null>(null)
  const [isNpzLoading, setIsNpzLoading] = useState(false)
  const [npzFileName, setNpzFileName] = useState<string | null>(null)

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsImageLoading(true)
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64Image = e.target?.result as string
        setOriginalImage(base64Image)
        await processImage(base64Image, file.name)
      }
      reader.readAsDataURL(file)
    }
  }

  // Process image through Flask backend
  const processImage = async (base64Image: string, fileName: string) => {
    try {
      const response = await fetch(`/api/process_image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image, filename: fileName }),
      })

      if (!response.ok) {
        throw new Error("Failed to process image")
      }

      const data = await response.json()
      setProcessed(data.processed)
      setProcessedImage(data.processed_image)
      setEncodedFileUrl(data.encoded_file_url) // URL to download the .npz file
    } catch (error) {
      console.error("Error processing image:", error)
    } finally {
      setIsImageLoading(false)
    }
  }

  // Handle NPZ file upload
  const handleNpzUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.name.endsWith(".npz")) {
      setIsNpzLoading(true)
      setNpzFileName(file.name)

      const formData = new FormData()
      formData.append("npz_file", file)

      try {
        const response = await fetch(`/api/reconstruct_from_npz`, {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Failed to reconstruct image")
        }

        const data = await response.json()
        setReconstructedImage(data.reconstructed_image)
      } catch (error) {
        console.error("Error reconstructing image:", error)
      } finally {
        setIsNpzLoading(false)
      }
    }
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="image" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="image" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            <span>Upload Image</span>
          </TabsTrigger>
          <TabsTrigger value="npz" className="flex items-center gap-2">
            <FileDown className="w-4 h-4" />
            <span>Upload NPZ File</span>
          </TabsTrigger>
        </TabsList>

        {/* Image Upload Tab */}
        <TabsContent value="image" className="space-y-8 mt-6">
          <Card className="border-2 border-blue-100 shadow-xl hover:shadow-2xl transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center justify-center w-full">
                <label htmlFor="image-upload" className="w-full cursor-pointer">
                  <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 transition-colors bg-blue-50">
                    <ImageIcon className="w-20 h-20 mb-6 text-blue-600" />
                    <p className="mb-2 text-2xl font-semibold text-blue-600">Click to upload an image</p>
                    <p className="text-sm text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                </label>
              </div>
            </CardContent>
          </Card>

          {isImageLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
              <p className="text-xl font-semibold text-blue-800">Processing your image...</p>
              <p className="text-gray-600 mt-2">Creating encoded representation</p>
            </div>
          )}

          {processed && processedImage && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-900 text-center">Results</h3>

              {encodedFileUrl && (
                <div className="flex justify-center mt-6">
                  <Card className="border-blue-100 shadow-md p-6 bg-blue-50 w-full max-w-md">
                    <div className="flex flex-col items-center gap-4">
                      <Info className="w-8 h-8 text-blue-600" />
                      <p className="text-center text-gray-700">
                        Your image has been encoded. You can download the NPZ file containing the encoded
                        representation.
                      </p>
                      <a
                        href={encodedFileUrl}
                        download="encoded_image.npz"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors text-lg"
                      >
                        <Download className="w-5 h-5" />
                        Download NPZ File
                      </a>
                    </div>
                  </Card>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-blue-100 shadow-lg overflow-hidden">
                  <div className="bg-blue-900 text-white py-3 px-4">
                    <h3 className="text-lg font-semibold text-center">Original Image</h3>
                  </div>
                  <CardContent className="p-6">
                    <div className="relative w-full h-64 bg-gray-50 rounded-lg overflow-hidden">
                      <Image
                        src={processed || "/placeholder.svg"}
                        alt="processed"
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

              
            </div>
          )}
        </TabsContent>

        {/* NPZ Upload Tab */}
        <TabsContent value="npz" className="space-y-8 mt-6">
          <Card className="border-2 border-blue-100 shadow-xl hover:shadow-2xl transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center justify-center w-full">
                <label htmlFor="npz-upload" className="w-full cursor-pointer">
                  <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 transition-colors bg-blue-50">
                    <FileDown className="w-20 h-20 mb-6 text-blue-600" />
                    <p className="mb-2 text-2xl font-semibold text-blue-600">Click to upload an NPZ file</p>
                    <p className="text-sm text-gray-500">Only .npz files generated by this application</p>
                  </div>
                  <input id="npz-upload" type="file" className="hidden" onChange={handleNpzUpload} accept=".npz" />
                </label>
              </div>
            </CardContent>
          </Card>

          {isNpzLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
              <p className="text-xl font-semibold text-blue-800">Reconstructing image...</p>
              <p className="text-gray-600 mt-2">Decoding from NPZ file</p>
            </div>
          )}

          {reconstructedImage && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-900 text-center">Reconstructed Image</h3>

              <Card className="border-2 border-blue-100 shadow-lg overflow-hidden max-w-2xl mx-auto">
                <div className="bg-blue-900 text-white py-3 px-4">
                  <h3 className="text-lg font-semibold text-center">
                    {npzFileName ? `Reconstructed from ${npzFileName}` : "Reconstructed Image"}
                  </h3>
                </div>
                <CardContent className="p-6">
                  <div className="relative w-full h-80 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={reconstructedImage || "/placeholder.svg"}
                      alt="Reconstructed"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center mt-6">
                <Card className="border-blue-100 shadow-md p-4 bg-blue-50">
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    This image has been reconstructed from the encoded NPZ file using the decoder
                  </p>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
