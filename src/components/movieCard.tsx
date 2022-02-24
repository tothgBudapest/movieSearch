import { Button, Box, Grid, Card, CardContent, Chip, Typography, CardMedia, CardActionArea } from '@mui/material';

interface Genre {
    name: string;
}

interface ComponentProps {
    movie: {
        name: string;
        id: string;
        score: string;
        releaseDate: string;
        genres: Genre[];
        img: {
            url: string;
        };
    };
    callback: Function;
}

const getYear = (dateTime: any) => {
    return new Date(dateTime).getFullYear();
};

export default function MovieCard({ movie, callback }: ComponentProps) {
    return (
        <Card sx={{ minWidth: 185, maxWidth: 185 }}>
            <CardActionArea component={Button} onClick={() => callback(movie.name, movie.id)}>
                <CardMedia component="img" height="278" width="185" image={movie?.img?.url} />
                <CardContent>
                    <Box minHeight="50px" maxHeight="50px">
                        <Typography variant="subtitle2">{movie.name}</Typography>
                    </Box>
                    <Typography variant="body2">{movie?.genres[0]?.name}</Typography>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="body2">{getYear(movie?.releaseDate)}</Typography>
                        </Grid>
                        <Grid item>
                            <Chip label={movie.score} size="small" />
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
