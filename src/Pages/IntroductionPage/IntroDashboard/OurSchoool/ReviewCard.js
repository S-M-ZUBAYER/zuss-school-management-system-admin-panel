import React from 'react';

function ReviewCard({ review }) {
    return (
        <div className="bg-white border-2 border-gray-200 rounded-lg shadow-lg px-6 py-4">
            <p className="text-gray-600 mb-2">{review.comment}</p>
            <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 0a12 12 0 1012 12A12 12 0 0012 0zM7.67 17.76a2.87 2.87 0 112.87-2.87 2.87 2.87 0 01-2.87 2.87zm5.11-5.53l-2.83 1.63a.94.94 0 01-.91 0L9.22 12l-.54.31-2.29 1.32a.94.94 0 01-.91 0 1 1 0 01-.47-.86v-2.64a.
94.94 0 01.47-.86l2.83-1.63a1 1 0 011 0l2.83 1.63a.94.94 0 01.47.86v2.64a.94.94 0 01-.47.86zM17.46 17.76a2.87 2.87 0 112.87-2.87 2.87 2.87 0 01-2.87 2.87z" />
                    </svg>
                </div>
                <div className="ml-4">
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-gray-500">{review.occupation}</p>
                </div>
            </div>
        </div>
    );
}

export default ReviewCard;