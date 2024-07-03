export const fetchMovieDetails=async(movieId:string)=>{
    const res=await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        {
            headers:{
                Authorization:
                 "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2UyYmMyOGZhM2IyN2IzYmM1MmY5OGU3MWE5OTVmZSIsIm5iZiI6MTcxOTk4MDIyMi4wMDIwMDIsInN1YiI6IjY2NmYyODg1NzhjY2UwMThjOTkzMGM0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dyPwPZskmLO6_ng1e8YbwtXTTXBeX-dX7x5tSgoRxFo"
            },
        }

    );
    return res.json();
}
