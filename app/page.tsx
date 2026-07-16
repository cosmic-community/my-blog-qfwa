import Link from 'next/link'
import { getPosts, getCategories, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryCard from '@/components/CategoryCard'
import type { Post } from '@/types'

export default async function HomePage() {
  const posts = await getPosts()
  const categories = await getCategories()

  const featured: Post | undefined = posts[0]
  const rest = posts.slice(1)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Welcome to <span className="text-brand-600">My Blog</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            A creative portfolio of stories, ideas, and inspiration — explore
            our latest posts, meet the authors, and browse by category.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/posts"
              className="px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors"
            >
              Read the Blog
            </Link>
            <Link
              href="/authors"
              className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Meet the Authors
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Featured post */}
        {featured && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Post</h2>
            <Link
              href={`/posts/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video lg:aspect-auto bg-gray-100 overflow-hidden">
                {featured.metadata?.featured_image ? (
                  <img
                    src={`${featured.metadata.featured_image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                    alt={featured.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl text-gray-300">
                    📝
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col justify-center">
                {featured.metadata?.category && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 mb-3">
                    {getMetafieldValue(featured.metadata.category.metadata?.name) ||
                      featured.metadata.category.title}
                  </span>
                )}
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                  {getMetafieldValue(featured.metadata?.title) || featured.title}
                </h3>
                {featured.metadata?.author && (
                  <p className="mt-4 text-sm text-gray-500">
                    By{' '}
                    {getMetafieldValue(featured.metadata.author.metadata?.name) ||
                      featured.metadata.author.title}
                  </p>
                )}
              </div>
            </Link>
          </section>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
              <Link href="/categories" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
        )}

        {/* Latest posts */}
        {rest.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
              <Link href="/posts" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No posts yet. Add some in your Cosmic bucket!</p>
          </div>
        )}
      </div>
    </div>
  )
}