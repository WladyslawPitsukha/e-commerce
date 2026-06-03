export function CreationPrice({mainPrice, option, procent}: {
    mainPrice: number;
    option: boolean;
    procent: number;
}) {
    return(
        <div className="flex justify-between gap-[10px]">
            {option === true ? (
                <h4 className={`font-satoshi text-xl font-bold leading-[27px] text-left text-black`}>
                    ${Math.round(mainPrice - ((mainPrice * procent) / 100))}
                </h4>
            ) : null}
            <h4 className={`${option === true ? "text-[rgba(0,0,0,0.4)] line-through font-satoshi text-xl font-bold leading-[27px] text-left" : "font-satoshi text-xl font-bold leading-[27px] text-left text-black"}`}>
                ${mainPrice}
            </h4>
            {option === true ? (
                <div className={`bg-[rgba(255,51,51,0.1)] px-[13.5px] py-[6px] rounded-full`}>
                    <h5 className={`font-satoshi text-xs font-medium leading-[16.2px] text-center text-[rgba(255,51,51,1)]`}>
                        -{procent}%
                    </h5>
                </div>
            ) : null}
        </div>
    )
}