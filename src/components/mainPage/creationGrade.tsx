import { FaStar } from "react-icons/fa6"

export function CreationGrade({grade, className}: {
    grade: number,
    className: string
}) {
    return(
        <div className="flex items-center justify-center gap-2">
            <div className="flex gap-[7px]">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        className={`w-[22px] h-[22px] ${
                            star <= Math.floor(grade)
                            ? 'text-yellow-400'
                            : star === Math.round(grade)
                            ? null
                            : 'text-gray-300'
                        }`}
                        style={
                            star === Math.round(grade)
                            ? {
                                background: `linear-gradient(90deg, #FACC15 ${
                                    (grade % 1) * 100
                                }%, #D1D5DB ${(grade % 1) * 100}%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }
                            : undefined
                        }
                    />
                ))}
            </div>
            <h5 className={`text-${className} font-satoshi text-sm font-bold leading-[22px] tracking-[0%]  m-0`}>
                {grade}
            </h5>
        </div>
    )
}