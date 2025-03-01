import { Menu } from 'lucide-react';
import { CircleUser } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Usericon from './usericon';

const dropdownlist = () => {
  return (
   

  <DropdownMenu>
  <DropdownMenuTrigger>
  <button className="flex items-center justify-center rounded-full gap-4 p-2">
  <Usericon />
  <Menu />
  </button>
  
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

    

  )
}

export default dropdownlist
