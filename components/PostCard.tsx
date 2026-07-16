import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const title = getMetafieldValue(post.metadata?.title) || post.title

  return (
    <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <Link href={`/posts/${post.slug}`}>
        <div className="aspect-video overflow-hidden bg-gray-100">
          {featuredImage ? (
            <img
              src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">
              📝
            </div>
          )}
        </div>
      </Link>
      <div className="p-5">
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="inline-block text-xs font-semibold uppercase tracking-wide text-brand-600 hover:text-brand-700 mb-2"
          >
            {getMetafieldValue(category.metadata?.name) || category.title}
          </Link>
        )}
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        {author && (
          <div className="mt-4 flex items-center gap-2">
            {author.metadata?.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                alt={getMetafieldValue(author.metadata?.name) || author.title}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <span className="text-sm text-gray-600">
              {getMetafieldValue(author.metadata?.name) || author.title}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}