import SearchableLayout from "@/components/SearchableLayout";
import { ReactNode } from "react";
import styles from "../styles/index.module.css";
import BookItem from "@/components/BookItem";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/library/fetchBooks";
import fetchRandomBooks from "@/library/fetchRandomBooks";
import Head from "next/head";

export const getStaticProps = async () => {
  const [allBooks, randomBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      randomBooks,
    },
    // revalidate: 3, // ISR방식 delay
  };
};

export default function Home({
  allBooks,
  randomBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png"/>
        <meta property="og:title" content="한입북스 홈"/>
        <meta property="og:description" content="한입북스에 등록된 도서들을 살펴보세요!"/>
      </Head>
      <div className={styles.container}>
        <section>
          <h2 className={styles.h2}>지금 추천하는 도서</h2>
          {randomBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h2 className={styles.h2}>전체 도서</h2>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
