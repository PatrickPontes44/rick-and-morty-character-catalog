// Next
import Head from 'next/head';

// Hooks
import { useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import { useRouter } from 'next/router';
import useFavorites from '../../hooks/useFavorites';

// Material UI
import {
  Container,
  Stack, 
  Typography, 
  Paper,
  IconButton,
  Dialog,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

// Componentes
import Loading from '../../components/Loading/Loading';

const STATUS = {
  "Alive": "Vivo",
  "Dead": "Morto",
  "unknown": "Desconhecido",
}

const GENDER = {
  "Female": "Feminino",
  "Male": "Masculino",
  "Genderless": "Sem gênero",
  "unknown": "Desconhecido",
}

export default function Personagem() {
    const router = useRouter()
    const [data, isLoading, error, fetchData] = useAxios();
    const [verifyFavorite, addFavorite, removeFavorite] = useFavorites();

    useEffect(() => {
        if(router.query.id){
            fetchData(`https://rickandmortyapi.com/api/character/${router.query.id}`);
        }
    }, [router.query]);

    const handleBack = ()=> router.push("/")

    if(error){
        router.push("/error");
    }

    return (
        <Stack
        sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: grey[900],
        margin: 0,
        py: 8,
        }}>
            <Head>
                <title>Catálogo - Rick & Morty</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <Paper sx={{
                    py: 8,
                    px: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4
                }}>
                    {
                        data && (
                            <Card>
                                <CardMedia
                                    sx={{ aspectRatio: '1/1' }}
                                    image={data.image}
                                    title={data.name}
                                />
                                <CardContent>
                                    <Stack direction="row" alignItems="center" mb={2}>
                                        <Typography gutterBottom variant="h4" mb={0} component="div">
                                            {data.id} - {data.name}
                                        </Typography>
                                        {
                                            verifyFavorite(data.id) ?
                                            <IconButton onClick={()=> removeFavorite(data.id)}>
                                                <Star sx={{ fontSize: '35px' }} color='warning' />
                                            </IconButton>
                                            :
                                            <IconButton onClick={()=> addFavorite(data.id)}>
                                                <StarBorder sx={{ fontSize: '35px' }} />
                                            </IconButton>
                                        }
                                    </Stack>
                                    <Stack direction="row" spacing={4}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            {`Espécie: ${data.species}`}
                                        </Typography>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            {`Gênero: ${GENDER[data.gender]}`}
                                        </Typography>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            {`Status: ${STATUS[data.status]}`}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Typography variant="h6" color="text.secondary">
                                            {`Localização Atual: ${data.location.name}`}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                                <CardActions>
                                    <Button color='secondary' variant='outlined' onClick={handleBack}>
                                        Voltar para o início
                                    </Button>
                                </CardActions>
                            </Card>
                        )
                    }
                </Paper>
            </Container>
            <Dialog open={isLoading || false}
            PaperProps={{
            style: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
            },
            }}>
            <Loading />
            </Dialog>
        </Stack>
    )
}
