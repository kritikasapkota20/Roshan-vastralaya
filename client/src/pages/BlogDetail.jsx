import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import SafeHtml from '../components/safeHtml';
import AuthorBio from '../components/AuthorBio';
import Breadcrumb from '../components/Breadcrumb';
import Comments from '../components/Comments';
import { Helmet } from 'react-helmet-async';

const BlogDetail = () => {
    const { slug } = useParams();
    const post = blogPosts.find(post => post.slug === slug);
    const relatedPosts = blogPosts.filter(p => p.id !== post?.id).slice(0, 3);

    // Calculate reading time
    const calculateReadingTime = (content) => {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    };

    // Copy link function
    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        // You might want to add a toast notification here
    };

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-sm max-w-md">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
                    <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
                    <Link to="/blog" className="text-primary hover:text-accent font-medium inline-flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    const shareUrl = window.location.href;
    const shareTitle = post.title;
    const readingTime = calculateReadingTime(post.content);

    // JSON-LD structured data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.image,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Your Fashion Blog",
            "logo": {
                "@type": "ImageObject",
                "url": "your-logo-url"
            }
        },
        "datePublished": post.date,
        "description": post.excerpt
    };

    return (
        <>
            <Helmet>
                <title>{post.title} | Your Fashion Blog</title>
                <meta name="description" content={post.excerpt} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.image} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Helmet>

            <div className="min-h-screen bg-gray-50">
                {/* Breadcrumb */}
                <div className="container mx-auto px-4 md:px-8 py-4">
                    <Breadcrumb
                        items={[
                            { label: 'Home', path: '/' },
                            { label: 'Blog', path: '/blog' },
                            { label: post.title, path: `/blog/${post.slug}` }
                        ]}
                    />
                </div>

                {/* Hero Section */}
                <div className="relative h-[60vh] min-h-[500px]">
                    <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center">
                        <div className="container mx-auto px-4 md:px-8">
                            <div className="max-w-4xl mx-auto text-white">
                                <div className="flex items-center space-x-4 mb-4">
                                    <span className="inline-block px-4 py-2 bg-primary/90 rounded-full text-sm font-medium">
                                        {post.category}
                                    </span>
                                    <span className="text-sm text-white/80">{readingTime}</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    {post.title}
                                </h1>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-medium">
                                            {post.author.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-medium">{post.author}</p>
                                            <p className="text-sm text-white/80">{post.date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="container mx-auto px-4 md:px-8 py-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="p-8">
                                {/* Social Share */}
                                <div className="flex items-center justify-between mb-8 pb-8 border-b">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-gray-600">Share this article:</span>
                                        <a 
                                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-primary transition-colors"
                                            aria-label="Share on Twitter"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                            </svg>
                                        </a>
                                        <a 
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-primary transition-colors"
                                            aria-label="Share on Facebook"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                            </svg>
                                        </a>
                                        <a 
                                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-primary transition-colors"
                                            aria-label="Share on LinkedIn"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                        </a>
                                        <button
                                            onClick={copyToClipboard}
                                            className="text-gray-600 hover:text-primary transition-colors"
                                            aria-label="Copy link"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <Link to="/blog" className="text-primary hover:text-accent font-medium inline-flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Back to Blog
                                    </Link>
                                </div>

                                {/* Article Content */}
                                <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-primary hover:prose-a:text-accent">
                                    <SafeHtml html={post.content} />
                                </div>

                                {/* Author Bio */}
                                <AuthorBio
                                    author={post.author}
                                    role="Fashion Expert"
                                    bio="Passionate about sustainable fashion and helping others discover their personal style. With years of experience in the fashion industry, I share insights and tips to help you look and feel your best."
                                    socialLinks={{
                                        twitter: "https://twitter.com/author",
                                        linkedin: "https://linkedin.com/in/author",
                                        instagram: "https://instagram.com/author"
                                    }}
                                />

                                {/* Tags */}
                                <div className="mt-8 pt-8 border-t">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {post.category.split(' ').map((tag, index) => (
                                            <Link
                                                key={index}
                                                to={`/blog/tag/${tag.toLowerCase()}`}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
                                            >
                                                {tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <Comments postId={post.id} />

                        {/* Related Posts */}
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold text-gray-800 mb-8">Related Articles</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedPosts.map((relatedPost) => (
                                    <Link 
                                        key={relatedPost.id} 
                                        to={`/blog/${relatedPost.slug}`}
                                        className="group"
                                    >
                                        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                                            <img 
                                                src={relatedPost.image} 
                                                alt={relatedPost.title} 
                                                className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                                                loading="lazy"
                                            />
                                            <div className="p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-sm text-primary font-medium">
                                                        {relatedPost.category}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {relatedPost.date}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
                                                    {relatedPost.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-2">
                                                    {readingTime}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogDetail; 