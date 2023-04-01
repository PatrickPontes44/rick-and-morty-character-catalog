import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect } from 'react';
import useAxios from '../hooks/useAxios';

export default function Home() {
  const [data, isLoading, error, fetchData] = useAxios();
  
  useEffect(() => {
    fetchData('https://jsonplaceholder.typicode.com/todos/1');
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Catálogo - Rick & Morty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error.message}</p>
          ) : (
            <p>{JSON.stringify(data)}</p>
          )}
        </div>
      </main>
    </div>
  )
}
