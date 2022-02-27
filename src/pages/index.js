import Head from "next/head";
import Wordle3D from "../components/wordle3d";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Wordle3D</title>
        <meta name='description' content='3D version of Wordle' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main style={{ width: "100vw", height: "100vh" }}>
        <Wordle3D />
      </main>
    </div>
  );
}
