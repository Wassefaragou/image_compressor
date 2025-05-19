import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, BookOpen, Code, User, Award, Briefcase, Mail } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl font-bold text-blue-900 mb-4">About Us</h1>
            <div className="h-1 w-24 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Learn more about our research team and the technology behind our dimensionality reduction project.
            </p>
          </div>

          {/* Researcher Profile */}
          <Card className="max-w-4xl mx-auto mb-12 border-blue-100 shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-48 h-48 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <User className="w-24 h-24 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-blue-900 mb-2">Wassef Aragou</h2>
                  <p className="text-blue-600 font-medium mb-4">Lead Researcher</p>
                  <p className="text-gray-700 mb-6 leading-relaxed">
Wassef Aragou is an engineering student at École Mohammadia d'Ingénieurs (EMI), specializing in machine learning and deep learning. His interests include dimensionality reduction, neural networks, and computer vision.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-gray-700">EMI, Université Mohammed V</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-gray-700">Machine Learning Engineer</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Award className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-gray-700">Deep Learning Specialist</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-gray-700">aragou.wassif@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-blue-900 mb-4">Academic Background</h2>
                    <p className="text-gray-700 leading-relaxed">
                      This project is developed at Université Mohammed V de Rabat, one of Morocco's leading institutions
                      in engineering and computer science research. Our team consists of dedicated researchers and
                      students working at the intersection of machine learning and computer vision. The École Mohammadia
                      d'Ingénieurs (EMI) provides a strong foundation in engineering principles and cutting-edge
                      research facilities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-blue-900 mb-4">Research Focus</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Our research focuses on developing efficient dimensionality reduction techniques using deep
                      learning approaches. The autoencoder project demonstrates practical applications of these
                      techniques in image processing and data compression. By reducing the dimensionality of complex
                      data while preserving essential features, we enable more efficient data storage, transmission, and
                      analysis.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                    <Code className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-blue-900 mb-4">Technical Implementation</h2>
                    <p className="text-gray-700 leading-relaxed">
                      The project utilizes state-of-the-art deep learning frameworks and is implemented using Python for
                      the backend processing and React with Next.js for the frontend interface. This combination allows
                      for efficient processing and a smooth user experience. The autoencoder neural network architecture
                      includes an encoder that compresses the input data and a decoder that reconstructs it, trained to
                      minimize the difference between the original and reconstructed data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
