import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategoriesSection = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const mockCategories = [
                    {
                        id: 1,
                        name: "Women's Collection",
                        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                        itemCount: 120,
                        description: "Discover our latest women's fashion collection"
                    },
                    {
                        id: 2,
                        name: "Men's Collection",
                        image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                        itemCount: 85,
                        description: "Explore our premium men's wear selection"
                    },
                    {
                        id: 3,
                        name: "Accessories",
                        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                        itemCount: 45,
                        description: "Complete your look with our accessories"
                    },
                    {
                        id: 4,
                        name: "New Arrivals",
                        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                        itemCount: 30,
                        description: "Be the first to explore our newest additions"
                    }
                ];
                setCategories(mockCategories);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Explore Our Collections</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Discover our carefully curated collections designed to elevate your style and express your unique personality.</p>
                </div>

                <div className="space-y-12">
                    {categories.map((category, index) => (
                        <div
                            key={category.id}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}
                        >
                            <div className="w-full lg:w-1/2">
                                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-[400px] object-cover transform hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 px-4">
                                <div className="max-w-lg">
                                    <h3 className="text-3xl font-bold mb-4">{category.name}</h3>
                                    <p className="text-gray-600 mb-6">{category.description}</p>
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className="text-sm font-medium text-gray-500">{category.itemCount} items</span>
                                        <span className="w-12 h-px bg-gray-300"></span>
                                        <span className="text-sm font-medium text-gray-500">New Season</span>
                                    </div>
                                    <Link
                                        to={`/category/${category.id}`}
                                        className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300"
                                    >
                                        Explore Collection
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection; 