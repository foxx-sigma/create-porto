import Link from 'next/link';
import { blogPosts } from '../data/blog';

export default function BlogPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
            </svg>
            <span className="text-sm text-zinc-300">Blog & Articles</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Thoughts & Insights
            </span>
          </h1>
          
          <p className="text-lg text-zinc-400">
            Just Article
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <div className="max-w-5xl mx-auto mb-16">
            <Link href={`/blog/${blogPosts[0].slug}`}>
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500/10 via-red-600/10 to-red-700/10 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10">
                
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 bg-red-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-red-300 border border-red-400/30">
                      Featured Article
                    </span>
                    <span className="text-sm text-zinc-500">{blogPosts[0].date}</span>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">
                    {blogPosts[0].title}
                  </h2>

                  <p className="text-lg text-zinc-400 mb-6 max-w-3xl">
                    {blogPosts[0].excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-red-400 font-medium group-hover:gap-3 transition-all">
                    <span>Read Article</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-red-600/20 rounded-full blur-3xl"></div>
              </div>
            </Link>
          </div>
        )}

        {/* Recent Posts Grid */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Recent Articles</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <Link href={`/blog/${post.slug}`} key={post.id}>
                <article className="group h-full">
                  <div className="h-full rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-red-500/5 hover:-translate-y-1 p-6">
                    
                    {/* Date */}
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <time className="text-sm text-zinc-500">{post.date}</time>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-zinc-400 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-red-400 font-medium text-sm group-hover:gap-3 transition-all">
                      <span>Read More</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

       
            
             
            </div>
          </div>
    
  );
}