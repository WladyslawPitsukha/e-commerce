"use client"

import CommentBlock from "@/components/mainPage/commentBlock"
import { ComSectProps } from "@/types/typesProject"
import { PopoverSetBut } from "./popoverSetBut"
import { CreateIcon } from "@/components/mainPage/creationIcon"
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react"
import { CommentForm } from "./commentForm"

export default function ReviewsProduct({array, productId}: {
    array: ComSectProps[];
    productId: number;
}) {
    const [comments, setComments] = useState<ComSectProps[]>(array);
    const [showForm, setShowForm] = useState(false);
    const [viewMode, setViewMode] = useState<"latest" | "random">("latest");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const storageKey = `shop-reviews-${productId}`;

    useEffect(() => {
        const stored = window.localStorage.getItem(storageKey);
        if (!stored) return;
        try {
            setComments((current) => [...(JSON.parse(stored) as ComSectProps[]), ...current]);
        } catch {
            window.localStorage.removeItem(storageKey);
        }
    }, [storageKey]);

    const handleCommentSubmit = (commnetData: {
        username: string;
        textCom: string;
        grade: number;
        posted: string;
    }) => {
        if (comments.some((comment) => comment.text.username === commnetData.username && comment.text.textCom === commnetData.textCom)) return;
        setIsSubmitting(true);
        const newComment: ComSectProps = {
            id: comments.length + 1,
            grade: commnetData.grade,
            text: {
                username: commnetData.username,
                textCom: commnetData.textCom
            },
            posted: new Date(commnetData.posted)
        }

        setComments([newComment, ...comments]);
        window.localStorage.setItem(storageKey, JSON.stringify([newComment]));
        setShowForm(false);
        setIsSubmitting(false);
    }
    
    const RenderArray = ({arr}: {
        arr: ComSectProps[]
    }) => {
        const renderArray = 
            viewMode === "latest" 
            ? [...arr].sort(() => Math.random() - 0.5)
            : [...arr].reverse();

        return(
            <>
                {renderArray.map((obj) => (
                    <CommentBlock
                        key={obj.id}
                        {...obj}
                    />
                ))}
            </>
        )
    }

    return(
        <article className="flex flex-col items-center justify-items w-full gap-8">
            <div className="flex justify-between w-full items-center">
                <div className="flex items-end gap-2">
                    <h2 className="font-satoshi font-bold text-2xl leading-100 text-black">
                        All Reviews
                    </h2> 
                    <h4 className="font-satoshi font-normal text-base leading-trim-cap text-black/60">
                        ({comments.length})
                    </h4>
                </div>
                <div className="flex items-center gap-[10px]">
                    <PopoverSetBut />
                    <div
                        className="flex justify-evenly items-center rounded-[62px] bg-light-gray px-5 py-3 gap-[21px] cursor-pointer"
                        onClick={() => setViewMode((prev) => prev === "random" ? "latest" : "random")}
                    >
                        <h3 className="font-satoshi font-medium text-base leading-100 tracking-0 text-black">
                            Latest
                        </h3>
                        <CreateIcon icon={IoIosArrowDown} className="w-4 h-4 text-black" />
                    </div>
                    <button 
                        onClick={() => setShowForm(!showForm)}
                        className="flex justify-center rounded-[62px] items-center px-7 py-3 bg-black"
                    >
                        <h3 className="font-satoshi font-medium text-base leading-100 tracking-0 text-white">
                            Write a Review
                        </h3>
                    </button>
                </div>
            </div>
            {showForm && (
                <CommentForm onSubmit={handleCommentSubmit} isSubmitting={isSubmitting} />
            )}
            <div className="grid grid-cols-2 items-center gap-5 w-full">
                <RenderArray arr={comments} />
            </div>
        </article>
    )
}