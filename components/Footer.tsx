import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <span className="text-xl">📝</span>
            <span>My Blog</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/posts" className="hover:text-brand-600 transition-colors">
              Posts
            </Link>
            <Link href="/categories" className="hover:text-brand-600 transition-colors">
              Categories
            </Link>
            <Link href="/authors" className="hover:text-brand-600 transition-colors">
              Authors
            </Link>
          </nav>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} My Blog
          </p>
        </div>
      </div>
    </footer>
  )
}