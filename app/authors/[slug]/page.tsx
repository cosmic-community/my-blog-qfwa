// app/authors/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAuthor, getPostsByAuthor, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const photo = author.metadata?.profile_photo

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12">
        {photo ? (
          <img
            src={`${photo.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
            alt={name}
            width={120}
            height={120}
            className="w-28 h-28 rounded-full object-cover ring-4 ring-brand-50"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-brand-50 flex items-center justify-center text-4xl">
            👤
          </div>
        )}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900">{name}</h1>
          {bio && <p className="mt-3 text-gray-600 max-w-2xl">{bio}</p>}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Posts by {name}</h2>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No posts by this author yet.</p>
      )}

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link href="/authors" className="text-brand-600 hover:text-brand-700 font-medium">
          ← Back to all authors
        </Link>
      </div>
    </div>
  )
}