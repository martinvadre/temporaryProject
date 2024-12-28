import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className={`invisible transition-transform ease-in-out duration-300 lg:visible absolute mt-[5px] ml-[1.2rem] z-20`}>
      <Button onClick={() => setIsOpen?.()} className={`rounded-[8px] ${!isOpen ? "w-8" : "w-8"} h-8`} variant={"ghost"}>
        <div className="burger-box">
            <div className={`burger h-[16px] ${!isOpen ? "w-[18px]" : "w-[18px]"}`} id="burger">
                <span></span>
                <span></span>
                <span className={`burger-top`}></span>
                <span></span>
                <span className={`burger-btm`}></span>
                <span></span>
            </div>
        </div>

      </Button>
    </div>
  );
}
