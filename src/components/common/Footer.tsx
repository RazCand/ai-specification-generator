export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600">
              © 2024 Tribus Advisory. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-600">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}