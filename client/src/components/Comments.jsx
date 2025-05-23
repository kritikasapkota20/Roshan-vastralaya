import React, { useState } from 'react';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ name: '', email: '', comment: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Here you would typically send the comment to your backend
        // For now, we'll just add it to the local state
        const comment = {
            id: Date.now(),
            ...newComment,
            date: new Date().toISOString(),
        };

        setComments([...comments, comment]);
        setNewComment({ name: '', email: '', comment: '' });
        setIsSubmitting(false);
    };

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Comments</h2>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={newComment.name}
                            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={newComment.email}
                            onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                            Comment
                        </label>
                        <textarea
                            id="comment"
                            rows={4}
                            value={newComment.comment}
                            onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        {isSubmitting ? 'Posting...' : 'Post Comment'}
                    </button>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">{comment.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {new Date(comment.date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-700">{comment.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments; 