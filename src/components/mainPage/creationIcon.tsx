import { IconType } from "react-icons"

export function CreateIcon ({
    icon, 
    className = ""
}: {
    icon: IconType,
    className?: string
}): JSX.Element {
    const Icon = icon;

    return(
        <Icon className={`${className} `} />
    )
}