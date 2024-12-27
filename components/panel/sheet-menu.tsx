import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/panel/menu";
import { Sheet, SheetHeader, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="ghost" size="icon">
            <div className="burger-box">
                <div className={`burger h-[16px] w-[16px]`} id="burger">
                    <span></span>
                    <span></span>
                    <span className={`burger-top`}></span>
                    <span></span>
                    <span className={`burger-btm`}></span>
                    <span></span>
                </div>
            </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href="/" className="flex items-center gap-2">
              <SheetTitle className="font-bold text-xl font-inter">OUR NAME</SheetTitle>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
