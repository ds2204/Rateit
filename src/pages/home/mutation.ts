export const rateMovie = async (movieId:number,rating:number) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${localStorage.getItem(
             "guest_session_id"
        )}&api_key=cce2bc28fa3b27b3bc52f98e71a995fe`,
        {
            method:"POST",
            headers: {
                accept:"application/json",
                "Content-Type": "application/json;charset=utf-8",
        },
        body:`{"value":${rating}}`,
    }
    );
    return res.json();
};

export const rateTvShow = async (tvShowId: number,rating:number) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/tv/${tvShowId}/rating?guest_session_id=${localStorage.getItem(
             "guest_session_id"
        )}&api_key=cce2bc28fa3b27b3bc52f98e71a995fe`,
        {
            method:"POST",
            headers: {
                accept:"application/json",
                "Content-Type": "application/json;charset=utf-8",
        },
        body:`{"value":${rating}}`,
    }
    );
    return res.json();
};


