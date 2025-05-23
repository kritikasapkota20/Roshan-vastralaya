import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Terms and Conditions</h1>
            <div className="bg-white rounded-lg shadow-lg p-8">
                <p className="text-gray-600 mb-6">
                    Welcome to our fashion store. These Terms & Conditions govern your use of our website and services.
                </p>

                <div className="space-y-6">
                    <section className="border-b pb-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Ordering & Products</h2>
                        <ul className="list-none space-y-2">
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">🔹</span>
                                <span className="text-gray-600">All clothing items are subject to availability and may vary in size and color.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">🔹</span>
                                <span className="text-gray-600">Product images are for illustration purposes and actual colors may vary.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">🔹</span>
                                <span className="text-gray-600">We reserve the right to modify prices and product availability without notice.</span>
                            </li>
                        </ul>
                    </section>

                    <section className="border-b pb-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Shipping & Returns</h2>
                        <ul className="list-none space-y-2">
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">🔹</span>
                                <span className="text-gray-600">Free shipping on orders over $50.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">🔹</span>
                                <span className="text-gray-600">Returns accepted within 14 days of delivery.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">🔹</span>
                                <span className="text-gray-600">Items must be unworn, unwashed, and with original tags attached.</span>
                            </li>
                        </ul>
                    </section>

                    <section className="border-b pb-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Size Guide & Fitting</h2>
                        <ul className="list-none space-y-2">
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">🔹</span>
                                <span className="text-gray-600">Please refer to our size guide before ordering.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">🔹</span>
                                <span className="text-gray-600">We recommend measuring yourself for the best fit.</span>
                            </li>
                        </ul>
                    </section>

                    <section className="border-b pb-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Privacy & Security</h2>
                        <ul className="list-none space-y-2">
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">🔹</span>
                                <span className="text-gray-600">We protect your personal information and payment details.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">🔹</span>
                                <span className="text-gray-600">We never share your information with third parties without consent.</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Contact Us</h2>
                        <div className="space-y-2">
                            <p className="flex items-center text-gray-600">
                                <span className="text-blue-600 mr-2">📧</span>
                                <span>Email: support@fashionstore.com</span>
                            </p>
                            <p className="flex items-center text-gray-600">
                                <span className="text-blue-600 mr-2">📞</span>
                                <span>Customer Service: 1-800-FASHION</span>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions; 