import { useEffect, useState } from "react";
import { GenreResponseProps } from "../App";
import { api } from "../services/api";
import { Button } from "./Button";

interface SideBarProps {
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
}

const SideBar = ({ handleClickButton, selectedGenreId }: SideBarProps) => {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre: any) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
};

export default SideBar;
