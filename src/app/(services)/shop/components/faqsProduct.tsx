import { ProductCardProps } from "@/types/typeProductCard";


export default function FaqsProduct({faqs}: 
    Pick<ProductCardProps, 'faqs'>
) {
    return(
        <article className="flex flex-col items-center w-full gap-10">
            <h2 className="font-satoshi font-bold text-2xl leading-100 text-black">
                Frequently Asked Questions
            </h2>
            <div className="flex flex-col items-start w-full gap-5">
                {faqs.map((faq) => (
                    <div
                        className="flex flex-col items-start w-full gap-2 p-4 border border-gray-200 rounded-lg"
                        key={faq.id}
                    >
                        <h3 className="font-satoshi font-medium text-lg leading-100 text-black">
                            {faq.question}
                        </h3>
                        <p className="font-satoshi font-normal text-base leading-relaxed text-gray-600">
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </div>  
        </article>
    )
}