import Image from "next/image";
import Link from "next/link";
import { arrayPorto } from '@/app/data/portofolio';
import { notFound } from 'next/navigation';

export default async function ProjectDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Await params untuk Next.js 15
  const { id } = await params;
  const project = arrayPorto.find((p) => p.id === parseInt(id));

  // Jika project tidak ditemukan, tampilkan 404
  if (!project) {
    notFound();
  }

  // Ambil related projects (kategori sama, exclude current project)
  const relatedProjects = arrayPorto
    .filter(p => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        
        {/* Back Button */}
        <Link 
          href="/portofolio"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Portfolio</span>
        </Link>

        {/* Project Header */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="mb-8">
            
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-400/30 mb-6">
              <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
              <span className="text-sm text-red-300">
                {project.category === 'mobile' ? 'Mobile Application' : 'Website Design'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                {project.name}
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-zinc-400 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Info Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm text-zinc-500 mb-2">Category</h3>
              <p className="text-white font-semibold">
                {project.category === 'mobile' ? 'Mobile App' : 'Website'}
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm text-zinc-500 mb-2">Year</h3>
              <p className="text-white font-semibold">2024</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm text-zinc-500 mb-2">Status</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-white font-semibold">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={project.image}
              alt={project.name}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>

        {/* Project Details */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="space-y-12">
            
            {/* Overview Section */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Project Overview</h2>
              <div className="space-y-4">
                <p className="text-lg text-zinc-400 leading-relaxed">
                  {project.description}
                </p>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  This project showcases modern design principles and cutting-edge technology 
                  to deliver an exceptional user experience. Every detail was carefully crafted 
                  to ensure the best possible outcome.
                </p>
              </div>
            </div>

            {/* Technologies Section */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.category === 'mobile' ? (
                  <>
                    <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300">
                      React Native
                    </span>
                    <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300">
                      Figma
                    </span>
                    <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300">
                      Adobe XD
                    </span>
                    <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300">
                      UI/UX Design
                    </span>
                  </>
                ) : (
                  <>
                    <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300">
                      Next.js
                    </span>
                    <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300">
                      React
                    </span>
                    <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300">
                      Tailwind CSS
                    </span>
                    <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300">
                      TypeScript
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Key Features Section */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Fast Performance</h3>
                  <p className="text-zinc-400">Optimized for speed and efficiency</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Responsive Design</h3>
                  <p className="text-zinc-400">Works seamlessly on all devices</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Modern UI</h3>
                  <p className="text-zinc-400">Clean and intuitive interface</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Secure</h3>
                  <p className="text-zinc-400">Built with security best practices</p>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">Related Projects</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map((related) => (
                <Link href={`/portofolio/${related.id}`} key={related.id} className="group">
                  <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-red-500/5 hover:-translate-y-1">
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                      <Image
                        src={related.image}
                        alt={related.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                        {related.name}
                      </h3>
                      <p className="text-zinc-400 text-sm line-clamp-2">
                        {related.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500/10 via-red-600/10 to-red-700/10 border border-white/10 p-12 backdrop-blur-sm">
            
            {/* Decorative Elements */}
            <div className="absolute -top-20 -left-20 w-48 h-48 bg-red-500/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-red-600/30 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">
                Interested in Working Together?
              </h2>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                Let's discuss your next project and bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:your.email@example.com"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
                >
                  Contact Me
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <Link 
                  href="/portofolio"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  View All Projects
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}