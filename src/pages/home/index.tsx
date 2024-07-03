import { useState } from "react";
import { Button, Container, Grid } from "semantic-ui-react";
import { ColumnDisplay } from "./column-display";

import { fetchMovies,fetchTvShows } from "./query";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

export enum DisplayType {
    Movies = "movies",
    TvShows = "tvshows",
}

export const Home = () => {
    const [displayType, setDisplayType] = useState<DisplayType>(DisplayType.Movies);

    const {data:movieData,isLoading:isLoadingMovies}=useQuery({queryKey:["movies"],queryFn:fetchMovies})
    const {data:tvShowData,isLoading:isLoadingTvShows}=useQuery({queryKey:["tvshows"],queryFn:fetchTvShows})

    if(localStorage.getItem("guest_session_id")===null){
        return <Navigate to="/auth"/>

    }


    return (
        <Container style={{ marginTop: 50 }}>
            <Grid centered columns={2} stackable>
                <Grid.Row>
                    <Grid.Column textAlign="center">
                        <Button.Group size="large">
                            <Button
                                className={displayType === DisplayType.Movies ? "blue":undefined}
                                onClick={() => setDisplayType(DisplayType.Movies)}
                            >
                                Movies
                            </Button>
                            <Button
                                className={displayType === DisplayType.TvShows ? "blue":undefined}
                                onClick={() => setDisplayType(DisplayType.TvShows)}
                            >
                                TV Shows
                            </Button>
                        </Button.Group>
                        </Grid.Column>
                </Grid.Row>
                        {isLoadingMovies ||isLoadingTvShows?(
                        <div>Loading...</div>
    ):(
                        <div style={{marginTop:20}}>
                            {displayType===DisplayType.Movies ? (
                                <ColumnDisplay data={movieData.results} displayType={DisplayType.Movies}/>
                            ):( 
                                <ColumnDisplay data={tvShowData.results} displayType={DisplayType.TvShows}/>
                            )}

                        </div>
    )}
                    
            </Grid>
        </Container>
    );
};
