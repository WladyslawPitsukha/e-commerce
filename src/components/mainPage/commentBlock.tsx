import { ComSectProps } from "@/types/typeComSect";
import { FaCircleCheck } from "react-icons/fa6";
import { CreationGrade } from "./creationGrade";

export default function CommentBlock({
    id,
    grade,
    text: {
        username,
        textCom,
    },
    posted
}: ComSectProps) {
    const Icon = FaCircleCheck;
    const date = posted
    
    const typeOfMonth = (month: number): string => {
        switch (month) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
            default:
                throw new Error("Invalid month number. Please provide a number between 1 and 12.");
        }
    }

    const monthName = typeOfMonth(date?.getMonth() ?? 0);
    const dateOfPosted = `${monthName} ${date?.getDay()}, ${date?.getFullYear()}`
    const timeDif = (pastDate: Date): number => {
        const today = new Date();

        today.setHours(0, 0, 0, 0);
        pastDate.setHours(0, 0, 0, 0);

        const msInOneDay = 1000 * 60 * 60 * 24;
        const diffInMs = today.getTime() - pastDate.getTime()

        return Math.floor(diffInMs / msInOneDay);
    }
    
    return(
        <article 
            className="flex flex-col items-start h-60 min-w-[400px] w-full rounded-[20px] border border-gray-500 gap-[15px] px-8 py-7"
            key={id}
        >
            <CreationGrade grade={grade} className="yellow-800" />
            <div className="flex flex-col items-start gap-3 w-auto">
                <div className="flex items-center gap-1 h-auto">
                    <h3 className="font-satoshi text-xl font-bold leading-[22px] tracking-[0%] text-black">
                        {username}
                    </h3>
                    <Icon className="w-5 h-5 text-green-800" />
                </div>
                <p className="font-satoshi text-base font-normal leading-[22px] tracking-[0%] text-black w-[336px]">
                    {textCom}
                </p>
            </div>
            {date ? (
                <div className="flex justify-between w-full">
                    <h5 className="font-satoshi text-base font-normal leading-[22px] tracking-[0%] text-black/30">
                        posted {timeDif(date)} days ago
                    </h5>
                    <h4 className="font-satoshi font-medium text-base leading-[22px] tracking-[0%] text-black">
                        {date ? `Posted on ${dateOfPosted}` : 'Date not available'}
                    </h4>
                </div>) : (
                    undefined
                )}
        </article>
    )
}