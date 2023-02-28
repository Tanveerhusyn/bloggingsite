import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import defaultOG from "../public/img/opengraph.jpg";
import { postquery, configQuery } from "@lib/groq";
import GetImage from "@utils/getImage";
import PostList from "@components/postlist";

export default function Post(props) {
  const { postdata, siteconfig, preview } = props;

  const router = useRouter();
  //console.log(router.query.category);

  const { data: posts } = usePreviewSubscription(postquery, {
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });
  console.log("POST", posts);
  const ogimage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;
  const imageProps = posts[0]?.mainImage
    ? GetImage(posts[0].mainImage)
    : null;
  const AuthorimageProps = posts[0]?.author?.image
    ? GetImage(posts[0].author.image)
    : null;
  return (
    <>
      {posts && siteConfig && (
        <Layout {...siteConfig}>
          <NextSeo
            title={`${siteConfig?.title}`}
            description={siteConfig?.description || ""}
            canonical={siteConfig?.url}
            openGraph={{
              url: siteConfig?.url,
              title: `${siteConfig?.title}`,
              description: siteConfig?.description || "",
              images: [
                {
                  url: "/img/fav.png",
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: "scribblewire.com"
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          />

          <Container>
            <section className="bg-white dark:bg-gray-900 ">
              <div className="container px-6 py-10 mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                  Trending
                </h1>

                <div className="mt-8 lg:-mx-6 lg:flex lg:items-center shadow p-4">
                  {/* <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"alt=""/> */}
                  <Image
                    src={imageProps.src}
                    loader={imageProps.loader}
                    blurDataURL={imageProps.blurDataURL}
                    alt={posts[0].mainImage.alt || "Thumbnail"}
                    placeholder="blur"
                    objectFit="cover"
                    width={800}
                    height={500}
                    className=" transition-all object-cover w-40 md:w-30 lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
                  />
                  <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                    <p className="text-sm text-blue-500 uppercase">
                      Popular
                    </p>

                    <h2 className="mt-2 text-lg font-semibold tracking-normal text-brand-primary dark:text-white">
                      <Link href={`/post/${posts[0].slug.current}`}>
                        <span className="link-underline link-underline-blue cursor-pointer text-3xl">
                          {posts[0].title}
                        </span>
                      </Link>
                    </h2>
                    <p className="mt-3 text-sm  line-clamp-2 text-gray-500 dark:text-gray-300 md:text-sm">
                      {posts[0].body[0].children[0].text}
                    </p>
                    <Link href={`/post/${posts[0].slug.current}`}>
                      <a
                        href="#"
                        className="inline-block mt-2 text-blue-500 underline hover:text-blue-400">
                        Read more
                      </a>
                    </Link>
                    <div className="flex items-center mt-6">
                      <Image
                        src={AuthorimageProps.src}
                        blurDataURL={AuthorimageProps.blurDataURL}
                        loader={AuthorimageProps.loader}
                        objectFit="cover"
                        width={40}
                        height={40}
                        alt={posts[0]?.author?.name}
                        placeholder="blur"
                        className="rounded-full"
                      />

                      <div className="mx-4">
                        <h1 className="text-sm text-gray-700 dark:text-gray-200">
                          {posts[0]?.author?.name}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Author
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Container>
          <Container>
            <section className="bg-white dark:bg-gray-900">
              <div className="container px-6 py-10 mx-auto">
                <div className="text-center">
                  <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                    Featured
                  </h1>

                  <p className="max-w-lg mx-auto mt-4 text-gray-500">
                  Stay up-to-date with our latest blog posts and industry news
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-3">
                  {posts.map(post => (
                    <PostList
                      key={post._id}
                      post={post}
                      aspect="square"
                    />
                  ))}
                </div>
              </div>
            </section>
          </Container>
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(postquery);
  const config = await getClient(preview).fetch(configQuery);

  // const categories = (await client.fetch(catquery)) || null;

  return {
    props: {
      postdata: post,
      // categories: categories,
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}
