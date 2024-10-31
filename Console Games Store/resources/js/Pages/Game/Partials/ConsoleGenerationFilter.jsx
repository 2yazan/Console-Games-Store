import { debounce } from "lodash";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Checkbox, Flowbite, Label, TextInput } from "flowbite-react";
import FilterLayout from "@/Layouts/FilterLayout";
import ScrollAreaLayout from "@/Layouts/ScrollAreaLayout";
import searchFilterTheme from "@/Pages/Game/Partials/searchBarTheme";

export default function ConsoleGenerationFilter({
  handleCheckbox,
  gameFilter,
  console_generations,
  isMobile,
}) {
  const [searchVal, setSearchVal] = useState("");
  const [filteredGenerations, setFilteredGenerations] = useState(
    console_generations || []
  );

  useEffect(() => {
    handleFilter(searchVal);
  }, [searchVal]);

  const handleFilter = useCallback(
    debounce((search) => {
      if (!search.trim()) {
        setFilteredGenerations(console_generations);
        return;
      }

      const filtered = console_generations.filter((gen) =>
        gen.console_generation.toLowerCase().includes(search.toLowerCase().trim())
      );
      setFilteredGenerations(filtered);
    }, 300),
    [console_generations]
  );

  return (
    <FilterLayout title="Console Generation">
      <div className="flex flex-col">
        <div className="px-4 pt-3 bg-white dark:bg-gray-800">
          <Flowbite theme={{ theme: searchFilterTheme }}>
            <TextInput
              icon={Search}
              placeholder="Search Console Generation..."
              required
              type="text"
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </Flowbite>
        </div>
        <ScrollAreaLayout>
          {filteredGenerations?.length > 0 ? (
            filteredGenerations.map((gen, index) => (
              <div key={index} className="flex items-center gap-2 w-[200px] pt-3">
                <Checkbox
                  id={`console_generation-${index}${isMobile ? "-mobile" : ""}`}
                  value={gen.console_generation}
                  className="cursor-pointer"
                  onChange={(e) => handleCheckbox(e, "console_generation")}
                  defaultChecked={
                    gameFilter.console_generation &&
                    gameFilter.console_generation
                      .split(",")
                      .includes(gen.console_generation)
                  }
                />
                <Label
                  htmlFor={`console_generation-${index}${isMobile ? "-mobile" : ""}`}
                  className="truncate font-medium cursor-pointer"
                >
                  {gen.console_generation}
                </Label>
              </div>
            ))
          ) : (
            <p>No console generations found.</p>
          )}
        </ScrollAreaLayout>
      </div>
    </FilterLayout>
  );
}