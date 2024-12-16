import { ReactNode, useState, useEffect } from "react";
import SearchableLayout from "@/components/SearchableLayout";
import BookItem from "@/components/BookItem";
import fetchBooks from "@/library/fetchBooks";
import { BookData } from "@/types";
import { useRouter } from "next/router";
import Head from "next/head";

export default function SearchPage() {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스 - 검색 결과" />
        <meta
          property="og:description"
          content={`${q}에 대한 검색결과`}
        />
      </Head>
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </>
  );
}

SearchPage.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
