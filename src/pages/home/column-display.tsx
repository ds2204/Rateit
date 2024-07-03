import { useState } from "react";
import { Card, Form, Grid, Label, Rating } from "semantic-ui-react";
import { DisplayType } from ".";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { rateMovie, rateTvShow } from "./mutation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DisplayData {
    id: number;
    overview: string;
    release_date: string;
    poster_path: string;
    title?: string;
    name?: string;
    vote_average: number;
    rating?: number;
}

interface Props {
    data: DisplayData[];
    displayType: DisplayType;
    isRated?: boolean;
}

export const ColumnDisplay = (props: Props) => {
    const { data, displayType, isRated } = props;
    const [ratings, setRatings] = useState<{ [key: number]: number }>({});

    const onSuccess = () => {
        toast.success("Successfully rated!");
    };

    const onError = () => {
        toast.error("Something went wrong!");
    };

    const rateMovieMutation = useMutation({
        mutationKey: ["rateMovie"],
        mutationFn: (variables: { id: number; rating: number }) =>
            rateMovie(variables.id, variables.rating),
        onSuccess,
        onError,
    });

    const rateTvShowMutation = useMutation({
        mutationKey: ["rateTvShow"],
        mutationFn: (variables: { id: number; rating: number }) =>
            rateTvShow(variables.id, variables.rating),
        onSuccess,
        onError,
    });

    const handleRate = (id: number, rating: number) => {
        setRatings((prevRatings) => ({ ...prevRatings, [id]: rating }));
        if (displayType === DisplayType.Movies) {
            rateMovieMutation.mutate({ id, rating });
        } else {
            rateTvShowMutation.mutate({ id, rating });
        }
    };

    return (
        <Grid columns={3} stackable centered verticalAlign="top" padded="vertically">
            {data.map((displayData: DisplayData) => (
                <Grid.Column key={displayData.id}>
                    <Card.Group>
                        <Link
                            to={`/${
                                displayType === DisplayType.Movies ? "movie" : "tvshow"
                            }/${displayData.id}`}
                        >
                            <Card
                                
                                fluid
                                image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                                header={
                                    displayType === DisplayType.Movies
                                        ? displayData.title
                                        : displayData.name
                                }
                                meta={`Release Date: ${displayData.release_date} | Rating: ${displayData.vote_average}`}
                                description={displayData.overview.slice(0, 350) + "..."}
                                style={{
                                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                                    marginBottom: "20px",
                                    backgroundColor: "#f9f9f9",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                }}
                            />
                            {isRated && <Label color="green">Your Rating: {displayData.rating}</Label>}
                        </Link>
                        {!isRated && (
                            <Form style={{ marginTop: 10 }}>
                                <Form.Group inline>
                                    <Form.Field>
                                        <Rating
                                            icon="star"
                                            rating={ratings[displayData.id] || 0}
                                            maxRating={10}
                                            onRate={(e, { rating }) =>
                                                handleRate(displayData.id, rating as number)
                                            }
                                        />
                                    </Form.Field>
                                </Form.Group>
                            </Form>
                        )}
                        {isRated && (
                            <Rating
                                icon="star"
                                defaultRating={displayData.rating || 0}
                                maxRating={10}
                                disabled
                            />
                        )}
                    </Card.Group>
                </Grid.Column>
            ))}
        </Grid>
    );
};
