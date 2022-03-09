export { filterSearch };

const filterSearch = (results: any, selectedGenre: any) => {
  let tempArr: any = [];
  results.forEach((movie: any) => {
    if (
      movie.media_type === 'movie' &&
      movie.backdrop_path &&
      movie.poster_path
    ) {
      tempArr.push(movie);
    } else if (movie.media_type === 'person') {
      movie.known_for.forEach((m: any) => {
        if (m.backdrop_path && m.poster_path && m.media_type !== 'tv') {
          tempArr.push(m);
        }
      });
    }
  });

  if (selectedGenre) {
    tempArr = tempArr.filter((m: any) => m.genre_ids.includes(selectedGenre));
  }
  return tempArr;
};
