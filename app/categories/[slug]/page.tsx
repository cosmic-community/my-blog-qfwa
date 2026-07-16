// app/categories/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategory, getPostsByCategory, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl p-10 text-white">
        <div className="text-3xl mb-3">🏷️</div>
        <h1 className="text-3xl font-extrabold">{name}</h1>
        {description && <p className="mt-3 text-brand-100 max-w-2xl">{description}</p>}
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No posts in this category yet.</p>
      )}

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link href="/categories" className="text-brand-600 hover:text-brand-700 font-medium">
          ← Back to all categories
        </Link>
      </div>
    </div>
  )
}