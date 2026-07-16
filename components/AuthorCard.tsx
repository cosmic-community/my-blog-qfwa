import Link from 'next/link'
import type { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const photo = author.metadata?.profile_photo

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex justify-center mb-4">
        {photo ? (
          <img
            src={`${photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
            alt={name}
            width={100}
            height={100}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-brand-50"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-brand-50 flex items-center justify-center text-3xl">
            👤
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
        {name}
      </h3>
      {bio && <p className="mt-2 text-sm text-gray-500 line-clamp-3">{bio}</p>}
    </Link>
  )
}