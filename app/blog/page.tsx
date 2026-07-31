"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { blogPosts } from "../data/blog";
import "../animations.css";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // --- Header entrance ---
    if (headerRef.current) {
      gsap.from(Array.from(headerRef.current.children), {
        opacity: 0,
        y: 28,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.2,
      });
    }

    // --- Featured post entrance ---
    if (featuredRef.current) {
      gsap.from(featuredRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 88%",
          once: true,
        },
      });
    }

    // --- Article cards stagger ---
    if (articlesRef.current) {
      const cards = articlesRef.current.querySelectorAll(".article-card");
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        scale: 0.96,
        stagger: 0.12,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: articlesRef.current,
          start: "top 88%",
          once: true,
        },
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen py-20">
      <div className="container mx-auto px-6">

        {/* Header Section */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <span className="text-sm text-zinc-300">Blog &amp; Articles</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Thoughts &amp; Insights
            </span>
          </h1>

          <p className="text-lg text-zinc-400">
            Berbagi pemikiran, tutorial, dan pengalaman seputar web development dan teknologi terbaru.
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <div ref={featuredRef} className="max-w-5xl mx-auto mb-16">
            <Link href={`/blog/${blogPosts[0].slug}`}>
              <motion.div
                className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors duration-300"
                whileHover={{
                  y: -4,
                  boxShadow: "0 24px 60px rgba(239,68,68,0.12)",
                }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative aspect-video lg:aspect-auto overflow-hidden bg-zinc-900">
                    <Image 
                      src={blogPosts[0].coverImage} 
                      alt={blogPosts[0].title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 lg:from-black/60 to-transparent"></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center z-10 relative">
                    <div className="flex items-center flex-wrap gap-3 mb-6">
                      <span className="px-3 py-1 bg-red-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-red-300 border border-red-400/30">
                        {blogPosts[0].category}
                      </span>
                      <span className="text-sm text-zinc-400 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {blogPosts[0].readingTime}
                      </span>
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors duration-300">
                      {blogPosts[0].title}
                    </h2>

                    <p className="text-lg text-zinc-400 mb-8 line-clamp-3">
                      {blogPosts[0].excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden relative">
                          <Image src={blogPosts[0].author.avatar} alt={blogPosts[0].author.name} fill unoptimized />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{blogPosts[0].author.name}</div>
                          <div className="text-xs text-zinc-500">{blogPosts[0].date}</div>
                        </div>
                      </div>

                      <motion.div
                        className="hidden sm:flex items-center gap-2 text-red-400 font-medium"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <span>Read</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        )}

        {/* Recent Posts Grid */}
        <div ref={articlesRef} className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl font-bold text-white mb-8"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Recent Articles
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id}>
                <article className="group h-full article-card">
                  <motion.div
                    className="h-full rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors duration-300 overflow-hidden flex flex-col"
                    whileHover={{
                      y: -6,
                      boxShadow: "0 16px 40px rgba(239,68,68,0.07)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden bg-zinc-900">
                      <Image 
                        src={post.coverImage} 
                        alt={post.title} 
                        fill 
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                         <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/20">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Meta */}
                      <div className="flex items-center gap-4 mb-4 text-xs text-zinc-500">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <time>{post.date}</time>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{post.readingTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-zinc-400 mb-6 line-clamp-2 text-sm flex-grow">{post.excerpt}</p>

                      {/* Author & Read More */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full overflow-hidden relative">
                             <Image src={post.author.avatar} alt={post.author.name} fill unoptimized />
                           </div>
                           <span className="text-sm font-medium text-zinc-300">{post.author.name}</span>
                        </div>
                        <motion.div
                          className="flex items-center gap-1 text-red-400 font-medium text-sm"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <span>Read</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </article>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}