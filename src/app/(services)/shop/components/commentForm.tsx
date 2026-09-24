import React, { useState } from "react";

interface CommentFormProps {
    onSubmit: (comment: {
        username: string;
        textCom: string;
        grade: number;
        posted: string;
    }) => void;
    isSubmitting?: boolean;
}

export const CommentForm = ({ onSubmit, isSubmitting = false }: CommentFormProps) => {
    const [comment, setComment] = useState({
        username: "",
        textCom: "",
        grade: 5,
        posted: new Date().toISOString().split("T")[0] ?? ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.username.trim() || !comment.textCom.trim()) return;
        onSubmit({ ...comment, username: comment.username.trim(), textCom: comment.textCom.trim() });
        setComment({
            ...comment,
            posted: new Date().toISOString().split("T")[0] ?? ""
        });
    }

    return(
        <form onSubmit={handleSubmit} className="ui-panel flex w-full max-w-2xl flex-col gap-4 p-6 sm:p-7">
            <input
                type="text"
                value={comment.username}
                onChange={(e) => setComment({ ...comment, username: e.target.value })}
                placeholder="Your name"
                className="ui-field"
                required
            />
            <textarea
                value={comment.textCom}
                onChange={(e) => setComment({ ...comment, textCom: e.target.value })}
                placeholder="Your review"
                className="ui-field h-32 resize-y"
                required
            />
            <div className="flex items-center gap-2">
                <label htmlFor="review-rating" className="text-black">Rating:</label>
                <select
                    id="review-rating"
                    value={comment.grade}
                    onChange={(e) => setComment({ ...comment, grade: Number(e.target.value) })}
                    className="ui-field w-auto"
                >
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option className="text-black" key={num} value={num}>{num}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="review-posted" className="text-black">Posted:</label>
                <input
                    id="review-posted"
                    type="date"
                    value={comment.posted}
                    onChange={(e) => setComment({ ...comment, posted: e.target.value })}
                    className="ui-field w-auto"
                />
            </div>
            <button 
                type="submit"
                disabled={isSubmitting}
                className="ui-button w-full sm:w-fit"
            >
                {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
    </form>
    )
}