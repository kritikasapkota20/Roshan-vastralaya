import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import SafeHtml from '../components/safeHtml';
import AuthorBio from '../components/AuthorBio';
import Breadcrumb from '../components/Breadcrumb';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaShare, FaBookmark, FaClock, FaUser, FaCalendarAlt } from 'react-icons/fa';

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
        // Optionally show a toast here
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

            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#f3e8ff]"
            >
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

                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Hero Section */}
                        <div className="relative rounded-2xl overflow-hidden mb-12 shadow-xl">
                            <div className="relative h-[400px] md:h-[600px]">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover md:object-[center_top] object-center absolute inset-0 brightness-[.69]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                                    <div className="flex flex-wrap items-center gap-4 mb-6">
                                        <span className="px-4 py-2 bg-primary/90 rounded-full text-sm font-medium text-white">
                                            {post.category}
                                        </span>
                                        <div className="flex items-center gap-4 text-gray-200 text-sm">
                                            <span className="flex items-center gap-2">
                                                <FaClock className="w-4 h-4" />
                                                {readingTime}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <FaUser className="w-4 h-4" />
                                                {post.author}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <FaCalendarAlt className="w-4 h-4" />
                                                {post.date}
                                            </span>
                                        </div>
                                    </div>
                                    <h1 className="text-3xl  lg:text-4xl font-bold text-white mb-6 leading-tight">
                                        {post.title}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12 w-full">
                            {/* Social Share Bar */}
                            <div className="flex items-center justify-between mb-8 pb-8 border-b">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={copyToClipboard}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                                    >
                                        <FaShare className="w-4 h-4" />
                                        Share
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors">
                                        <FaBookmark className="w-4 h-4" />
                                        Save
                                    </button>
                                </div>
                            </div>

                            {/* Blog Content */}
                            <div className="prose prose-lg w-full max-w-none">
                                <SafeHtml htmlString={post.content} />
                            </div>

                            {/* Tags */}
                            <div className="mt-12 pt-8 border-t w-full">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.category.split(' ').map((tag, index) => (
                                        <Link
                                            key={index}
                                            to={`/blog/tag/${tag.toLowerCase()}`}
                                            className="px-4 py-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 rounded-full text-sm font-medium transition-colors"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Author Bio */}
                            <div className="mt-12 pt-8 border-t w-full">
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
                            </div>
                        </div>

                        {/* Related Posts */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                                {relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost.id}
                                        to={`/blog/${relatedPost.slug}`}
                                        className="group"
                                    >
                                        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                            <div className="relative h-48">
                                                <img
                                                    src={relatedPost.image}
                                                    alt={relatedPost.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-sm text-primary font-medium">
                                                        {relatedPost.category}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {relatedPost.date}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2">
                                                    {relatedPost.title}
                                                </h3>
                                                <p className="text-gray-600 line-clamp-2">
                                                    {relatedPost.excerpt}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.article>
        </>
    );
};

export default BlogDetail;