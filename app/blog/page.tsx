"use client";

import Link from "next/link";
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

          <p className="text-lg text-zinc-400">Just Article</p>
        </div>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <div ref={featuredRef} className="max-w-5xl mx-auto mb-16">
            <Link href={`/blog/${blogPosts[0].slug}`}>
              <motion.div
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500/10 via-red-600/10 to-red-700/10 border border-white/10 hover:border-white/20 transition-colors duration-300"
                whileHover={{
                  y: -4,
                  boxShadow: "0 24px 60px rgba(239,68,68,0.12)",
                }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 bg-red-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-red-300 border border-red-400/30">
                      Featured Article
                    </span>
                    <span className="text-sm text-zinc-500">{blogPosts[0].date}</span>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors duration-300">
                    {blogPosts[0].title}
                  </h2>

                  <p className="text-lg text-zinc-400 mb-6 max-w-3xl">
                    {blogPosts[0].excerpt}
                  </p>

                  <motion.div
                    className="flex items-center gap-2 text-red-400 font-medium"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span>Read Article</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/20 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-blob-delayed"></div>
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
                    className="h-full rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors duration-300 p-6"
                    whileHover={{
                      y: -6,
                      boxShadow: "0 16px 40px rgba(239,68,68,0.07)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    {/* Date */}
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <time className="text-sm text-zinc-500">{post.date}</time>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-zinc-400 mb-6 line-clamp-3">{post.excerpt}</p>

                    {/* Read More */}
                    <motion.div
                      className="flex items-center gap-2 text-red-400 font-medium text-sm"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <span>Read More</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
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