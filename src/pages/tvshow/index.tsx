/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { Grid, Header, Loader, Segment, Image, List, Label, Accordion, Card } from "semantic-ui-react";
import { useQuery } from "@tanstack/react-query";
import { fetchTvShowDetails } from "./query";


export const TvShow= () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <div>Invalid Tv Show ID</div>;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, isLoading } = useQuery({
        queryKey: ["tvShow"],
        queryFn: () => fetchTvShowDetails(id),
    });

    if (isLoading) {
        return <Loader active />;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seasonPanels=data.seasons.map((season:any)=>({
        key:season.id,
        title:`Season ${season.season_number}`,
        content:{
            content:(<Card 
                         style={{height:"70px"}}
                         meta={season.air_date}
                         description={`${season.episode_count} episodes`}
                         />
                        ),
        },

    }));

    return (
        <div style={{ marginTop: 50 }}>
            <Segment>
                <Header as="h2">
                    {data.name}
                    <Header.Subheader>{data.tagline}</Header.Subheader>
                </Header>
                <Grid columns={2} divided textAlign="left" style={{ marginTop: 20 }}>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                                <Image src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} size="medium" centered />
                            </div>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <List>
                            <List.Item>
                                <List.Header>Created By: </List.Header> 
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-explicit-any
                                {data.created_by.map((creator:any)=>creator.name).join(", ")}
                            </List.Item>
                            <List.Item>
                                <List.Header>Episodes runtime: </List.Header> 
                                {data.episode_run_time.join(", ")}
                            </List.Item>
                            <List.Item>
                                    <List.Header>Genres:</List.Header>{" "}
                                    <List horizontal>
                                        {data.genres.map((genre: any) => (
                                            <Label key={genre.id}>{genre.name}</Label>
                                        ))}
                                    </List>
                            </List.Item>
                            <List.Item>
                                <List.Header>First Air Date: </List.Header> 
                                {data.first_air_date}
                            </List.Item>
                            <List.Item>
    <List.Header>Networks: </List.Header> 
    {data.networks.map((network:any)=>(
        <Image 
            key={network.id} 
            src={`https://image.tmdb.org/t/p/original/${network.logo_path}`}
            size="tiny" 
            style={{marginRight:10}}
        />
    ))}
</List.Item>
                           <List.Item>
                                <List.Header>Number of Episodes: </List.Header> 
                                {data.number_of_episodes}
                            </List.Item>
                            <List.Item>
                                <List.Header>Number of Seasons: </List.Header> 
                                {data.number_of_seasons}
                            </List.Item>
                            <List.Item>
                                <List.Header>Seasons: </List.Header> 
                                <List.Description style={{height:"200px",overflowY:"scroll"}}>
                                    <Accordion defaultActiveIndex={0} panels={seasonPanels} styled />
                                </List.Description>
                            </List.Item>



                            </List>
                        </Grid.Column>
                        
                                    
                                 
                        
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    );
};
