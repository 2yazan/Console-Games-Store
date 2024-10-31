import { Checkbox, Label } from "flowbite-react";

import FilterLayout from "@/Layouts/FilterLayout";
import ScrollAreaLayout from "@/Layouts/ScrollAreaLayout";

export default function PlatformFilter({ handleCheckbox, gameFilter, isMobile }) {
  return (
    <FilterLayout title="Platform">
      <div className="flex flex-col">
        <ScrollAreaLayout>
          <div className="flex items-center gap-2 w-[200px] pt-3">
            <Checkbox
              id={`Xbox${isMobile ? "-mobile" : ""}`}
              value="Xbox"
              className="cursor-pointer"
              onChange={(e) => handleCheckbox(e, "platform")}
              defaultChecked={
                gameFilter.platform &&
                gameFilter.platform.split(",").includes("Xbox")
              }
            />
            <Label
              htmlFor={`Xbox${isMobile ? "-mobile" : ""}`}
              className="truncate font-medium cursor-pointer"
            >
              Xbox
            </Label>
          </div>
          <div className="flex items-center gap-2 w-[200px]">
            <Checkbox
              id={`PlayStation${isMobile ? "-mobile" : ""}`}
              value="PlayStation"
              className="cursor-pointer"
              onChange={(e) => handleCheckbox(e, "platform")}
              defaultChecked={
                gameFilter.platform &&
                gameFilter.platform.split(",").includes("PlayStation")
              }
            />
            <Label
              htmlFor={`PlayStation${isMobile ? "-mobile" : ""}`}
              className="truncate font-medium cursor-pointer"
            >
              PlayStation
            </Label>
          </div>
        </ScrollAreaLayout>
      </div>
    </FilterLayout>
  );
}
