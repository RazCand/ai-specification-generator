import Head from 'next/head'
import Layout from '@/components/common/Layout'
import { FileText, Clock, CheckCircle, Zap, Shield } from 'lucide-react'

export default function About() {
  return (
    <>
      <Head>
        <title>About - AI Spec Generator</title>
        <meta name="description" content="Learn about the AI Specification Generator" />
      </Head>
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                About AI Specification Generator
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Revolutionizing procurement processes for Australian councils through 
                intelligent automation and AI-powered specification generation.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Clock className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">80% Time Savings</h3>
                <p className="text-gray-600">
                  Reduce specification development time from days to minutes with intelligent AI generation.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Compliance Ready</h3>
                <p className="text-gray-600">
                  Automatically includes Australian procurement standards and council-specific requirements.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Zap className="w-12 h-12 text-yellow-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Instant Generation</h3>
                <p className="text-gray-600">
                  Generate comprehensive specifications in under 30 seconds with minimal input required.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Shield className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Government Grade Security</h3>
                <p className="text-gray-600">
                  Built with security and privacy in mind, suitable for government and council use.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <FileText className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Professional Output</h3>
                <p className="text-gray-600">
                  Generate specifications that meet professional standards and regulatory requirements.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <CheckCircle className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Multiple Formats</h3>
                <p className="text-gray-600">
                  Export specifications in PDF, Word, and HTML formats for maximum compatibility.
                </p>
              </div>
            </div>

            {/* About Tribus Advisory */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Tribus Advisory</h2>
              <p className="text-gray-600 mb-4">
                Tribus Advisory is a boutique consulting company specializing in transforming 
                government and council operations through innovative technology solutions. 
                We understand the unique challenges faced by Australian local governments 
                and create tailored solutions that drive efficiency and value.
              </p>
              <p className="text-gray-600">
                This AI Specification Generator represents our commitment to modernizing 
                procurement processes while maintaining the highest standards of compliance 
                and professional quality expected by government organizations.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}