import React, { useState } from 'react';

const CommentSection = ({currentUser}) => {
    const [comments, setComments] = useState([
        { id: 1, name: 'John Doe', text: 'This is an amazing feature! Great work!' },
        { id: 2, name: 'Jane Smith', text: 'I love the way the data is displayed. Very user-friendly!' },
        { id: 3, name: 'Alex Johnson', text: 'Could we also add more filter options? That would be awesome.' },
        { id: 4, name: 'Emily Brown', text: 'Excellent visualization! The colors are perfect.' },
    ]);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([
                ...comments,
                { id: comments.length + 1, name: currentUser, text: newComment.trim() },
            ]);
            setNewComment('');
        }
    };

    return (
        <div className="comment-section">
            <h2 style={{ fontSize: '2rem' }}>Comments</h2>
            {comments.map(comment => (
                <div className="comment" key={comment.id}>
                    <p>
                        <strong>{comment.name}:</strong> {comment.text}
                    </p>
                </div>
            ))}
            <div className="add-comment">
                <input
                    type="text"
                    placeholder="Type your comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{
                        width: '80%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginRight: '10px',
                        color: 'black'
                    }}
                />
                <button
                    onClick={handleAddComment}
                    style={{
                        background: '#502891',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 15px',
                        cursor: 'pointer',
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default CommentSection;
