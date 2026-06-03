import { ProductCardProps } from "@/types/typeProductCard";
import { IoCheckmark } from "react-icons/io5";
import { DivBlock } from "./headerProduct";

export const DivSmallBlock = ({title, value}: {
    title: string;
    value: string | number;
}) => {
    return(
        <div className="flex flex-col items-start gap-2">
            <h4 className="font-satoshi font-normal text-base leading-100 text-black/60">
                {title}: 
            </h4>
            <p className="font-satoshi font-medium text-base leading-100 text-black">
                {value}mm
            </p>
        </div>
    )
}

export default function DetailsProduct({details, images}:
    Pick<ProductCardProps, 'details'> &
    Pick<ProductCardProps, 'images'>
) {
    const {width, height, sizes, colors } = details

    return(
        <article className="flex flex-col justify-between items-center w-full">
            <h2 className="font-satoshi font-bold text-2xl leading-100 text-black">
                Product Details
            </h2>
            <div className="flex justify-between items-start w-full mt-10">
                <div className="flex flex-col justify-between items-start w-full gap-14">
                    <DivBlock 
                        title="Product Dimensions:"
                        className="flex flex-col items-start gap-4"
                        classNameTitle="font-satoshi font-bold text-xl leading-100 text-black"
                        component={
                            <div className="flex items-center gap-6">
                                <DivSmallBlock 
                                    title="Width"
                                    value={width}
                                />
                                <DivSmallBlock 
                                    title="Height"
                                    value={height}
                                />
                            </div>
                        }
                    />
                    <DivBlock 
                        title="Available Sizes:"
                        className="flex flex-col items-start gap-4"
                        classNameTitle="font-satoshi font-bold text-xl leading-100 text-black"
                        component={
                            <div className="grid grid-cols-4 gap-3 self-start justify-self-start">
                                {sizes.map((size) => (
                                    <div className="flex items-center justify-center flex-col gap-2">
                                        <div 
                                            key={size.id}
                                            className={`flex items-center justify-center px-3 py-3 rounded-[62px] bg-[#F0F0F0] text-black/60`}
                                        >
                                            <p className="font-satoshi font-normal text-base leading-100">
                                                {size.n_size}
                                            </p>
                                        </div>
                                        <h4 className="font-satoshi font-normal text-base leading-100 text-black/60">
                                            {size.title}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                        }
                    />
                    <DivBlock 
                        title="Available Colors:"
                        className="flex flex-col items-start gap-4"
                        classNameTitle="font-satoshi font-bold text-xl leading-100 text-black"
                        component={
                            <div className="flex items-center gap-5">
                                {colors.map((color) => (
                                    <div className="flex items-center justify-center flex-col gap-2">
                                        <div 
                                            key={color.id}
                                            className={`flex justify-center items-center w-[37px] h-[37px] rounded-full cursor-pointer`}
                                            style={{background: color.option}}
                                        >
                                            {color.status && (
                                                <IoCheckmark className="w-4 h-4 text-white" />
                                            )}
                                        </div>
                                        <h4 className="font-satoshi font-normal text-base leading-100 text-black/60">
                                            {color.title}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                        }
                    />
                </div>
                <div className="grid grid-cols-2 gap-10 w-full">
                    {images.map((image) => (
                        <div 
                            key={image.id}
                            className="flex items-center justify-center w-[200px] h-[170px] bg-gray-200 rounded-lg overflow-hidden"
                        >
                            <img 
                                src={image.url} 
                                alt={`Product image ${image.id}`} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}