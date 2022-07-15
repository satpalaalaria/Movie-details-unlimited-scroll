import styles from '../../styles/About.module.css'
import Link from "next/link"
import Head from 'next/head'
import noImage from '../../public/no_image.png'
import Button from '@material-ui/core/Button';
import Image from 'next/image'


function About({ posts }) {
    return (
        <div>
            <Head>
                <title>{posts.title}</title>
                <meta name="title" content={posts.title} />
                <meta name="description" content={posts.overview} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://movie-app-nextjs-dusky.vercel.app/" />
                <meta property="og:title" content={posts.title} />
                <meta property="og:description" content={posts.overview} />
                <meta property="og:image" content={`https://www.themoviedb.org/t/p/w220_and_h330_face${posts.poster_path}`} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://movie-app-nextjs-dusky.vercel.app/" />
                <meta property="twitter:title" content={posts.title} />
                <meta property="twitter:description" content={posts.overview} />
                <meta property="twitter:image" content={`https://www.themoviedb.org/t/p/w220_and_h330_face${posts.poster_path}`} />
                <link rel=" shortcut icon" href={`https://www.themoviedb.org/t/p/w220_and_h330_face${posts.poster_path}`} />
            </Head>
            {posts ? (
                <>
                    <Link href='/'>
                        <Button variant="contained" color="default" className={styles.buttonStyle}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: '30px' }} className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                            </svg>
                            <span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>Back</span>
                        </Button>
                    </Link>
                    <div className={styles.movie_card} id={styles.bright}>
                        <div className={styles.info_section}>
                            <div className={styles.movie_header}>
                                <Image
                                    src={posts.poster_path !== null ? `https://www.themoviedb.org/t/p/w220_and_h330_face${posts.poster_path}` : noImage}
                                    alt={posts.title}
                                    className={styles.locandina}
                                    width={80}
                                    height={80}
                                />
                                <h1>{posts?.title}</h1>
                                <h4>{posts?.release_date}, {posts.original_language}</h4>

                            </div>
                            <div className={styles.movie_desc}>
                                <p className={styles.text}>
                                    {posts.overview}
                                </p>
                                <span className={styles.minutes}>{posts.runtime} min</span>
                                <p className={styles.type}>Action, Crime, Fantasy</p>
                            </div>
                        </div>
                        <div className={`${styles.blur_back} ${styles.bright_back}`} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w220_and_h330_face${posts?.backdrop_path})` }} ></div>
                    </div>
                </>
            ) : (
                <div className={styles.lodebal}>
                    <h1>Something Wrong</h1>
                </div>
            )}
        </div>
    )
}

export default About;


export async function getServerSideProps(context) {
    const { params } = context
    const response = await fetch(`https://api.themoviedb.org/3/movie/${params.aboutid}?api_key=ef2fc7966b7886b23c82a2279f82783c&language=en-US`)
    const data = await response.json()
    return {
        props: {
            posts: data,
        }
    }
}
