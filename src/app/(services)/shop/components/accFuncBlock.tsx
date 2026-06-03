import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactNode } from "react";

export interface AccFuncBlockProps {
    nameSection: string;
    reactComponent: ReactNode;
}

export default function AccFuncBlock({
    nameSection,
    reactComponent,
}: AccFuncBlockProps) {
    return(
        <div className="w-full">
            <Accordion className=" bg-[#F0EEED]">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography
                        component="h2"
                        className="font-satoshi font-bold text-xl leading-100 tracking-0 align-middle text-black"
                    >
                        {nameSection}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails
                    
                >
                    {reactComponent}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}