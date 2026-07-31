import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "../../data/blog";
import "../../animations.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  
  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  if (postIndex === -1) {
    notFound();
  }

  const post = blogPosts[postIndex];
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  // Simple related articles: just pick 2 from the same category, or if not enough, pick latest.
  const related = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 2);
  
  if (related.length < 2) {
    const extra = blogPosts.filter((p) => p.id !== post.id && !related.find((r) => r.id === p.id)).slice(0, 2 - related.length);
    related.push(...extra);
  }

  return (
    <div className="min-h-screen py-20">
      <article className="container mx-auto px-6 max-w-4xl">
        
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-10 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Blog
        </Link>

        {/* Header / Meta */}
        <header className="mb-10 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
            <span className="px-3 py-1 bg-red-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-red-300 border border-red-400/30">
              {post.category}
            </span>
            <span className="text-sm text-zinc-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {post.date}
            </span>
            <span className="text-sm text-zinc-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readingTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-center md:justify-start gap-4 pb-8 border-b border-white/10">
            <div className="w-12 h-12 rounded-full overflow-hidden relative">
              <Image src={post.author.avatar} alt={post.author.name} fill unoptimized />
            </div>
            <div className="text-left">
              <div className="text-base font-medium text-white">{post.author.name}</div>
              <div className="text-sm text-zinc-500">{post.author.role}</div>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden mb-16 bg-zinc-900 border border-white/10 shadow-2xl shadow-red-500/5">
          <Image 
            src={post.coverImage}
            alt={post.title}
            fill
            unoptimized
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-red-400 hover:prose-a:text-red-300 prose-img:rounded-2xl prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-blockquote:border-l-red-500 prose-blockquote:bg-white/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-zinc-300 mb-16"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-8 border-t border-white/10 mb-16">
          <span className="text-zinc-400 mr-2 flex items-center">Tags:</span>
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-sm text-zinc-300 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer">
              {tag}
            </span>
          ))}
        </div>

        {/* Pagination (Prev/Next) */}
        <div className="grid sm:grid-cols-2 gap-4 mb-24">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="group flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/10 transition-all">
              <span className="text-sm text-zinc-500 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous Article
              </span>
              <span className="font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2">{prevPost.title}</span>
            </Link>
          ) : <div />}
          
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="group flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/10 transition-all text-right items-end">
              <span className="text-sm text-zinc-500 mb-2 flex items-center gap-2">
                Next Article
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2">{nextPost.title}</span>
            </Link>
          ) : <div />}
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="pt-16 border-t border-white/10">
            <h3 className="text-2xl font-bold text-white mb-8">Related Articles</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((item) => (
                <Link href={`/blog/${item.slug}`} key={item.id} className="group">
                  <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all h-full items-center">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-900">
                      <Image src={item.coverImage} alt={item.title} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-red-400 mb-1">{item.category}</span>
                      <h4 className="font-bold text-white text-sm group-hover:text-red-300 transition-colors line-clamp-2">{item.title}</h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
