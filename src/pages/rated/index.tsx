import React, { useState } from "react";
import { Container, Header, Menu, Segment, Loader, Message } from "semantic-ui-react";
import { useQuery } from "@tanstack/react-query";
import { fetchRatedMovies, fetchRatedTvShows } from "./query";
import { ColumnDisplay } from "../home/column-display";
import { Navigate } from "react-router-dom";

export enum DisplayType {
    Movies = "Movies",
    TvShows = "TvShows",
}

export const Rated = () => {
    const [activeTabs, setActiveTabs] = useState<DisplayType>(DisplayType.Movies);

    const {
        data: ratedMovies,
        isLoading: isLoadingRatedMovies,
        isError: isErrorRatedMovies,
        error: ratedMoviesError,
    } = useQuery({
        queryKey: ["ratedMovies"],
        queryFn: fetchRatedMovies,
    });

    const {
        data: ratedTvShows,
        isLoading: isLoadingRatedTvShows,
        isError: isErrorRatedTvShows,
        error: ratedTvShowsError,
    } = useQuery({
        queryKey: ["ratedTvShows"],
        queryFn: fetchRatedTvShows,
    });

    if (isLoadingRatedMovies || isLoadingRatedTvShows) {
        return <Loader active inline="centered">Loading...</Loader>;
    }

    if (isErrorRatedMovies || isErrorRatedTvShows) {
        console.error('Rated Movies Error:', ratedMoviesError);
        console.error('Rated TV Shows Error:', ratedTvShowsError);
        return <Message error header="Error" content="An error occurred while fetching data." />;
    }

    if(localStorage.getItem("guest_session_id")===null){
        return <Navigate to="/auth"/>

    }

    return (
        <Container style={{ marginTop: 50 }}>
            <Menu pointing secondary>
                <Menu.Item
                    name="Movies"
                    active={activeTabs === DisplayType.Movies}
                    onClick={() => setActiveTabs(DisplayType.Movies)}
                />
                <Menu.Item
                    name="TV Shows"
                    active={activeTabs === DisplayType.TvShows}
                    onClick={() => setActiveTabs(DisplayType.TvShows)}
                />
            </Menu>

            <Segment>
                {activeTabs === DisplayType.Movies ? (
                    <div>
                        <Header as="h2">Rated Movies</Header>
                        <ColumnDisplay data={ratedMovies?.results || []} displayType={DisplayType.Movies} isRated />
                    </div>
                ) : (
                    <div>
                        <Header as="h2">Rated TV Shows</Header>
                        <ColumnDisplay data={ratedTvShows?.results || []} displayType={DisplayType.TvShows} isRated />
                    </div>
                )}
            </Segment>
        </Container>
    );
};
