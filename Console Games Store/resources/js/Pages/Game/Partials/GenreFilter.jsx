import { debounce } from "lodash";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Checkbox, Flowbite, Label, TextInput } from "flowbite-react";

import FilterLayout from "@/Layouts/FilterLayout";
import ScrollAreaLayout from "@/Layouts/ScrollAreaLayout";
import searchFilterTheme from "@/Pages/Game/Partials/searchBarTheme";

export default function GenreFilter({
  handleCheckbox,
  gameFilter,
  genres,
  isMobile,
}) {
  const [genreList, setGenreList] = useState(genres);
  const [searchVal, setSearchVal] = useState("");

  const handleFilter = (search) => {
    if (search === "") {
      setGenreList(genres);
      return;
    }

    const filterBySearch = genreList.filter((item) => {
      if (item.name.toLowerCase().includes(search.toLowerCase())) {
        return item;
      }
    });

    setGenreList(filterBySearch);
  };

  const filterList = useCallback(
    debounce((search) => handleFilter(search), 500),
    []
  );

  useEffect(() => {
    filterList(searchVal);
  }, [searchVal]);

  return (
    <FilterLayout title="Genre">
      <div className="flex flex-col">
        <div className="px-4 pt-3 bg-white dark:bg-gray-800">
          <Flowbite theme={{ theme: searchFilterTheme }}>
            <TextInput
              icon={Search}
              placeholder="Search genre..."
              required
              type="text"
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </Flowbite>
        </div>
        <ScrollAreaLayout>
          {genreList.map((genre, index) => (
            <div key={index} className="flex items-center gap-2 w-[200px]">
              <Checkbox
                id={`genre-` + index + `${isMobile ? "-mobile" : ""}`}
                value={genre.name}
                className="cursor-pointer"
                onChange={(e) => handleCheckbox(e, "genre")}
                defaultChecked={
                  gameFilter.genre &&
                  gameFilter.genre.split(",").includes(genre.name)
                }
              />
              <Label
                htmlFor={`genre-` + index + `${isMobile ? "-mobile" : ""}`}
                className="truncate font-medium cursor-pointer"
              >
                {genre.name}
              </Label>
            </div>
          ))}
        </ScrollAreaLayout>
      </div>
    </FilterLayout>
  );
}
