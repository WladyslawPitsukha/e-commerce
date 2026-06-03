import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { CreateIcon } from '@/components/mainPage/creationIcon';

import { MdTune } from "react-icons/md";

export function PopoverSetBut() {
    return (
        <PopupState variant="popover" popupId="review-popup">
            {(popupState) => (
                <div>
                    <Button 
                        {...bindTrigger(popupState)}
                        className="min-w-[40px] h-[40px] p-2 flex justify-center items-center bg-[#f0f0f0] rounded-full hover:bg-[#e0e0e0]"
                        sx={{
                            minWidth: '40px',
                            padding: '8px',
                            borderRadius: '50%'
                        }}
                    >
                        <CreateIcon icon={MdTune} className='w-6 h-6 text-black' />
                    </Button>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        PaperProps={{
                            className: 'p-4 rounded-lg shadow-lg'
                        }}
                    >
                        <ol className="p-2 min-w-[200px]">
                            <li className='text-black'>
                                hello
                            </li>
                            <li>
                                hello
                            </li>
                        </ol>
                    </Popover>
                </div>
            )}
        </PopupState>
    );
}