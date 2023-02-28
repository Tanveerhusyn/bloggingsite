import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import client, {
  getClient,
  usePreviewSubscription,
  PortableText
} from "@lib/sanity";
import ErrorPage from "next/error";
import GetImage from "@utils/getImage";
import { parseISO, format } from "date-fns";
import { NextSeo } from "next-seo";

import { singlequery, configQuery, pathquery } from "@lib/groq";
import CategoryLabel from "@components/blog/category";
import AuthorCard from "@components/blog/authorCard";

export default function Post(props) {
  const { postdata, siteconfig, preview } = props;

  const router = useRouter();
  const { slug } = router.query;

  const { data: post } = usePreviewSubscription(singlequery, {
    params: { slug: slug },
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  const imageProps = post?.mainImage
    ? GetImage(post?.mainImage)
    : null;
  const AuthorimageProps = post?.author?.image
    ? GetImage(post.author.image)
    : null;

  return (
    <>
      {post && siteConfig && (
        <Layout {...siteConfig}>
          <NextSeo
            title={`${post.title} - ${siteConfig.title}`}
            description={post.excerpt || ""}
            canonical={`${siteConfig?.url}/post/${post.slug.current}`}
            openGraph={{
              url: `${siteConfig?.url}/post/${post.slug.current}`,
              title: `${post.title} - ${siteConfig.title}`,
              description: post.excerpt || "",
              images: [
                {
                  url: GetImage(post?.mainImage).src || "",
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: siteConfig.title
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          />
          {/*
          <div className="relative bg-white/20">
            <div className="absolute w-full h-full -z-10">
              {post?.mainImage && (
                <Image
                  {...GetImage(post.mainImage)}
                  alt={post.mainImage?.alt || "Thumbnail"}
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
            <Container className="py-48">
              <h1 className="relative max-w-3xl mx-auto mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl after:absolute after:w-full after:h-full after:bg-white after:inset-0 after:-z-10 after:blur-2xl after:scale-150">
                {post.title}
              </h1>
            </Container>
          </div> */}

          <Container className="!pt-0">
            <div className="max-w-screen-md mx-auto ">
              <div className="text-center">
                <CategoryLabel categories={post.categories} />
              </div>

              <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
                {post.title}
              </h1>

              <div className="flex justify-center mt-3 space-x-3 text-gray-500 ">
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0 w-10 h-10">
                    {AuthorimageProps && (
                      <Image
                        src={AuthorimageProps.src}
                        blurDataURL={AuthorimageProps.blurDataURL}
                        loader={AuthorimageProps.loader}
                        objectFit="cover"
                        alt={post?.author?.name}
                        placeholder="blur"
                        layout="fill"
                        className="rounded-full"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-400">
                      {post.author.name}
                    </p>
                    <div className="flex items-center space-x-2 text-sm">
                      <time
                        className="text-gray-500 dark:text-gray-400"
                        dateTime={
                          post?.publishedAt || post._createdAt
                        }>
                        {format(
                          parseISO(
                            post?.publishedAt || post._createdAt
                          ),
                          "MMMM dd, yyyy"
                        )}
                      </time>
                      <span>
                        · {post.estReadingTime || "5"} min read
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          <div className="relative z-0 max-w-screen-lg mx-auto overflow-hidden lg:rounded-lg aspect-video">
            {imageProps && (
              <Image
                src={imageProps.src}
                loader={imageProps.loader}
                blurDataURL={imageProps.blurDataURL}
                alt={post.mainImage?.alt || "Thumbnail"}
                layout="fill"
                loading="eager"
                objectFit="cover"
              />
            )}
          </div>

          {/* {post?.mainImage && <MainImage image={post.mainImage} />} */}
          <Container>
            <article className="max-w-screen-md mx-auto ">
              <div className="mx-auto my-3 prose prose-base dark:prose-invert prose-a:text-blue-500">
                {post.body && <PortableText value={post.body} />}
              </div>
              <div className="flex justify-center mt-7 mb-7">
                <Link href="/">
                  <a className="px-5 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 ">
                    ← View all posts
                  </a>
                </Link>
              </div>
              {post.author && <AuthorCard author={post.author} />}
            </article>
          </Container>
{/* 
          <Container>
          <section className="bg-white dark:bg-gray-900">
    <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">Related Blogs</h1>

        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            <div className="lg:flex">
                <Image width={100} height={80} loader={()=>0} unOptimized={true} className="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="img"/>

                <div className="flex flex-col justify-between py-6 lg:mx-6">
                    <a href="#" className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                        How to use sticky note for problem solving
                    </a>
                    
                    <span className="text-sm text-gray-500 dark:text-gray-300">On: 20 October 2019</span>
                </div>
            </div>

            <div className="lg:flex">
                <Image width={100} height={80} loader={()=>0} unOptimized={true} className="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="img"/>

                <div className="flex flex-col justify-between py-6 lg:mx-6">
                    <a href="#" className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                        How to use sticky note for problem solving
                    </a>

                    <span className="text-sm text-gray-500 dark:text-gray-300">On: 20 October 2019</span>
                </div>
            </div>

            <div className="lg:flex">
                <Image width={100} height={100} loader={()=>0} unOptimized={true} className="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1544654803-b69140b285a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="img"/>

                <div className="flex flex-col justify-between py-6 lg:mx-6">
                    <a href="#" className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                        Morning routine to boost your mood
                    </a>

                    <span className="text-sm text-gray-500 dark:text-gray-300">On: 25 November 2020</span>
                </div>
            </div>

            <div className="lg:flex">
                <Image width={100} height={80} loader={()=>0} unOptimized={true} className="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1530099486328-e021101a494a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1547&q=80" alt="img"/>

                <div className="flex flex-col justify-between py-6 lg:mx-6">
                    <a href="#" className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                        All the features you want to know
                    </a>

                    <span className="text-sm text-gray-500 dark:text-gray-300">On: 30 September 2020</span>
                </div>
            </div>

            <div className="lg:flex">
                <Image width={100} height={80} loader={()=>0} unOptimized={true} className="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1484&q=80" alt="img"/>

                <div className="flex flex-col justify-between py-6 lg:mx-6">
                    <a href="#" className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                        Minimal workspace for your inspirations
                    </a>

                    <span className="text-sm text-gray-500 dark:text-gray-300">On: 13 October 2019</span>
                </div>
            </div>

            <div className="lg:flex">
                <Image width={100} height={80} loader={()=>0} unOptimized={true} className="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="img"/>

                <div className="flex flex-col justify-between py-6 lg:mx-6">
                    <a href="#" className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                        What do you want to know about Blockchane
                    </a>
                    
                    <span className="text-sm text-gray-500 dark:text-gray-300">On: 20 October 2019</span>
                </div>
            </div>
        </div>
    </div>
</section>
          </Container> */}
        </Layout>
      )}
    </>
  );
}

const MainImage = ({ image }) => {
  return (
    <div className="mt-12 mb-12 ">
      <Image {...GetImage(image)} alt={image.alt || "Thumbnail"} />
      <figcaption className="text-center ">
        {image.caption && (
          <span className="text-sm italic text-gray-600 dark:text-gray-400">
            {image.caption}
          </span>
        )}
      </figcaption>
    </div>
  );
};

export async function getStaticProps({ params, preview = false }) {
  //console.log(params);
  const post = await getClient(preview).fetch(singlequery, {
    slug: params.slug
  });

  const config = await getClient(preview).fetch(configQuery);

  return {
    props: {
      postdata: { ...post },
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const allPosts = await client.fetch(pathquery);
  return {
    paths:
      allPosts?.map(page => ({
        params: {
          slug: page.slug
        }
      })) || [],
    fallback: true
  };
}
