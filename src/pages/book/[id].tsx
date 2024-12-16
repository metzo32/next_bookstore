//catch all segment (파일명 앞에 ... 붙이면 모든 id 중첩에 대응함)
//optional catch all segment ([...id]파일명을 대괄호로 한번 더 감싸면 뒤에 경로가 없어도 페이지 표시 가능)

import styles from "./[id].module.css";
import { GetStaticPropsContext } from "next";
import type { InferGetStaticPropsType } from "next";
import fetchOneBook from "@/library/fetchOneBook";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id; // [id].tsx파일은 무조건 url파라미터가 있어야만 접근 가능하므로, 타입 단언해도 무방
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true, // 404페이지
    };
  }

  return {
    props: {
      book,
    },
  };
};

export default function BookPage({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입북스</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스 홈" />
          <meta
            property="og:description"
            content="한입북스에 등록된 도서들을 살펴보세요!"
          />
        </Head>
        <div>로딩 중입니다.</div>
      </>
    );
  }

  if (!book) {
    return "문제가 발생했습니다. 다시 시도하세요.";
  }

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <>
      <Head>
        <title>{`${title}의 상세 페이지`}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={`${title}의 상세 페이지`} />
        <meta
          property="og:description"
          content={`${book.title}의 도서 정보를 확인하세요!`}
        />
      </Head>
      <div className={styles.container}>
        <div
          className={styles.cover_img_container}
          style={{ backgroundImage: `url("${coverImgUrl}")` }}
        >
          <img src={coverImgUrl} alt={title} />
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.subTitle}>{subTitle}</div>
        <div className={styles.author}>
          {author} | {publisher}
        </div>
        <div className={styles.description}>{description}</div>
      </div>
    </>
  );
}
