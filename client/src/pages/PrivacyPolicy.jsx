const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center leading-tight">Privacy Policy</h1>
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 mb-8  " style={{ lineHeight: '1.5' }}>
                            Welcome to Roshan Vastralaya. This Privacy Policy explains how we handle your information
                            when you visit our website to browse our product listings.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 " >1. Information We Collect</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">We collect:</p>
                        <ul className="list-disc list-inside text-gray-700 mb-6 ml-4 leading-relaxed">
                            <li>Name, email, and phone (when you contact us)</li>
                            <li>Browsing data (pages visited, time spent)</li>
                            <li>Device and browser information</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 leading-tight">2. How We Use Your Information</h2>
                        <ul className="list-none text-gray-700 mb-6 space-y-2 leading-relaxed">
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✅</span>
                                To provide product information
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✅</span>
                                To send newsletters about new arrivals
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✅</span>
                                To improve our website
                            </li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 leading-tight">3. Information Sharing</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed"style={{ lineHeight: '1.5' }}>
                            We do not sell your information. We may share it with service providers who help us operate our website
                            or when required by law.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 leading-tight">4. Your Rights</h2>
                        <ul className="list-none text-gray-700 mb-6 space-y-2 leading-relaxed">
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✔</span>
                                Access or delete your personal data
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✔</span>
                                Opt-out of newsletters
                            </li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 leading-tight">5. Contact Us</h2>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <ul className="space-y-3 leading-relaxed">
                                <li className="flex items-center">
                                    <span className="text-gray-500 mr-2">📧</span>
                                    <a href="mailto:info@rvfashion.com" className="text-blue-600 hover:text-blue-800">info@roshanvastralaya.com</a>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-gray-500 mr-2">📍</span>
                                    <span>Pidari Chowk,Janakpur </span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-gray-500 mr-2">📞</span>
                                    <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-800">+1 (234) 567-890</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy; 