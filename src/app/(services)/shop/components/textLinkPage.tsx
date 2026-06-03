//TODO: add Popover of Hover 
//TODO: add params & type for func
//TODO: add finish the components
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { LinksPageFilterProps } from "@/types/typeLinksFilt";
import Link from "next/link";

export default function TextLinkPage({
    id,
    name,
    link
} : LinksPageFilterProps) {
    return(
        <div 
            className="flex justify-between items-center h-auto w-full"
            key={id}
        >
            <Link
                href={link}
                className='cursor-pointer'
            >
                <h5 className="font-satoshi font-normal text-base leading-100 tracking-0 text-black/60">
                    {name}
                </h5>
            </Link>
            <NavigateNextIcon 
                className='w-4 h-4 text-black/60'
            />
        </div>
    )
}