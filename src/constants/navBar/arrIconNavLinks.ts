
import { NavLinkProps } from "@/types/typesProject";
import { RiAccountCircleLine } from "react-icons/ri";
import { SlBasket } from "react-icons/sl";

export const arrIconNavlinks: NavLinkProps[] = [
    {
        icon: SlBasket,
        link: "cart",
        title: "Shopping cart",
    },
    {
        icon: RiAccountCircleLine,
        link: "account",
        title: "Account"
    }
];
