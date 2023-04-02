import React from 'react';
import Head from 'next/head';
import { Stack, Typography, Button } from '@mui/material';
import Image from 'next/image'
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';

export default function ErrorPage() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Ops...</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: grey[900],
          gap: 2,
        }}
      >
        <Typography variant="h2" style={{ color: 'white', fontWeight: 'bold' }}>
          Parece que algo deu errado...
        </Typography>
        <Image src="/images/404.png" alt="404 Page image" width={300} height={300} />
        <Button variant='contained' color='secondary' onClick={()=> router.push("/")}>Voltar para o início</Button>
      </Stack>
    </>
  );
}
