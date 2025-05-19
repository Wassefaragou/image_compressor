import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Info, Brain, Lightbulb } from "lucide-react"
import DualUploader from "@/components/dual-uploader"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 py-12">
          {/* Project titles */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl font-bold text-blue-900 mb-4">Integrated Project</h1>
            <div className="h-1 w-24 bg-blue-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">Dimensionality Reduction by Autoencoder</h2>
            <p className="text-gray-600 text-lg">
              Presented by <span className="font-semibold text-blue-800">Wassef Aragou</span>
            </p>
          </div>

          {/* Features section */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="bg-white border-blue-100 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Brain className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Neural Networks</h3>
                  <p className="text-gray-600">
                    Utilizes advanced autoencoder neural networks for efficient dimensionality reduction.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-blue-100 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Lightbulb className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Research Project</h3>
                  <p className="text-gray-600">
                    Developed as part of academic research at EMI, Université Mohammed V de Rabat.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-blue-100 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Info className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Image Reduction</h3>
                  <p className="text-gray-600">
                    Compresses images while preserving essential features through deep learning.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Note about image reduction */}
          <Card className="max-w-4xl mx-auto mb-12 bg-blue-50 border-blue-200 shadow-md">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <Info className="w-10 h-10 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">About Image Reduction (Must read)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    This tool uses an autoencoder neural network to perform dimensionality reduction on images. The
                    autoencoder compresses the image into a lower-dimensional representation (stored as an NPZ file)
                    while preserving its essential features. You can upload an image to encode it or upload an NPZ file
                    to reconstruct the original image. This technique is valuable for data compression, feature
                    extraction, and noise reduction in image processing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main content */}
          <div className="max-w-5xl mx-auto">
            <DualUploader />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
