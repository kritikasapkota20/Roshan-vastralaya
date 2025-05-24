import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

const BlogSection = () => {
    return (
        <section className="py-8 bg-sec-gray">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block mb-4 relative">
                        Our Blog
                        <span className="block h-1 w-16 bg-primary mt-2 mx-auto rounded"></span>
                    </h1>
                    {/* <h2 className="text-4xl font-bold mt-2 mb-4 text-sec-dark-gray">Style Stories & Inspiration</h2> */}
                    <p className="text-sec-dark-gray/70 max-w-2xl mx-auto">Discover the latest trends, style tips, and fashion insights from our expert team.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm text-primary font-medium">{post.category}</span>
                                    <span className="text-sm text-sec-dark-gray/60">{post.date}</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-sec-dark-gray">{post.title}</h3>
                                <p className="text-sec-dark-gray/70 mb-4">{post.excerpt}</p>
                                <Link to={`/blog/${post.slug}`} className="text-primary hover:text-primaryHover font-medium inline-flex items-center">
                                    Read More
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection; 