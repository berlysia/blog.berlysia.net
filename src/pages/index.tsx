import { Flex, Link, Box, Text, Heading } from "rebass";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faMastodon,
} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import type { InferGetStaticPropsType } from "next";
import { Head } from "../components/head";
import { fetchLinkedArticles } from "../lib/api";
import type { LinkedArticle } from "../lib/api";

export const getStaticProps = async ({ preview = false }) => {
  const entries = await fetchLinkedArticles(preview);

  return {
    props: {
      preview,
      imasArticles: entries.filter((art) =>
        art.categories.find((cat) => cat.name === "IM@S")
      ),
      techArticles: entries.filter((art) =>
        art.categories.find((cat) => cat.name === "Tech")
      ),
    },
  };
};

function Index(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Flex flexDirection="column">
      <Head title="berlysia.net" />
      <Flex
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        p="24px"
        bg="backgrounds.1"
      >
        <Profile />
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        py="24px"
        bg="backgrounds.2"
      >
        <Articles
          imasArticles={props.imasArticles}
          techArticles={props.techArticles}
        />
      </Flex>
    </Flex>
  );
}

const StyledAvatar = styled(Image)`
  border-radius: 9999px;
  display: block;
`;

const LinkMarbles = () => (
  <Flex mt={2}>
    <Link
      mr={1}
      rel="me noopener noreferrer"
      target="_blank"
      href="https://twitter.com/berlysia"
      aria-label="Twitter / berlysia"
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        color="text"
        fontSize="16px"
        width="32px"
        height="32px"
        sx={{
          borderRadius: "9999px",
          border: "1px solid rgba(0,0,0,0.2)",
        }}
      >
        <FontAwesomeIcon icon={faTwitter} />
      </Flex>
    </Link>
    <Link
      mx={1}
      rel="me noopener noreferrer"
      target="_blank"
      href="https://github.com/berlysia"
      aria-label="GitHub / berlysia"
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        color="text"
        fontSize="16px"
        width="32px"
        height="32px"
        sx={{
          borderRadius: "9999px",
          border: "1px solid rgba(0,0,0,0.2)",
        }}
      >
        <FontAwesomeIcon icon={faGithub} />
      </Flex>
    </Link>
    <Link
      mx={1}
      rel="me noopener noreferrer"
      target="_blank"
      href="https://imastodon.net/@berlysia"
      aria-label="Imastodon / berlysia"
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        color="text"
        fontSize="16px"
        width="32px"
        height="32px"
        sx={{
          borderRadius: "9999px",
          border: "1px solid rgba(0,0,0,0.2)",
        }}
      >
        <FontAwesomeIcon icon={faMastodon} />
      </Flex>
    </Link>
  </Flex>
);

const Profile = () => (
  <Flex flexWrap="wrap" justifyContent="center">
    <Box sx={{ flexShrink: 0 }}>
      <StyledAvatar src="/avatar.png" alt="avatar" width={128} height={128} />
    </Box>
    <Flex ml={3} flexDirection="column" justifyContent="center">
      <Heading mb={2}>@berlysia</Heading>
      <Box my={1}>
        <Heading as="h3" fontSize={2} my={1}>
          Web Developer (mainly frontend)
        </Heading>
        <Box as="ul" my={1}>
          <Box as="li">I love Web, browsers, and JavaScript.</Box>
        </Box>
      </Box>
      <Box my={1}>
        <Heading as="h3" fontSize={2} my={1}>
          Idol Producer (a fan of THE IDOLM@STER)
        </Heading>
        <Box as="ul" my={1}>
          <Box as="li">
            PIC of{" "}
            <Text
              bg="#fbffb9"
              px={1}
              sx={{
                display: "inline",
              }}
            >
              Hinako Kita
            </Text>
            ,{" "}
            <Text
              bg="#7f6575"
              px={1}
              color="#fee"
              sx={{
                display: "inline",
              }}
            >
              Sayoko Takayama
            </Text>
          </Box>
        </Box>
      </Box>
      <LinkMarbles />
    </Flex>
  </Flex>
);

const ArticleArea = styled(Box)`
  flex-basis: 300px;
  flex-shrink: 0;
  flex-grow: 1;
  padding: 24px;
`;

const ArticleList = styled(Box).attrs({ as: "ul" })`
  padding: 0;
`;

const ArticleListItem = styled(Box).attrs({ as: "li" })`
  list-style: none;
  line-height: 1.6em;
  margin-top: 4px;
  margin-bottom: 4px;
  border-bottom: 1px solid #eee;
`;

const ArticleLink = styled(Link)`
  border-radius: 4px;
  display: block;
  padding-top: 4px;
  padding-bottom: 4px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Articles = ({
  imasArticles,
  techArticles,
}: {
  imasArticles: LinkedArticle[];
  techArticles: LinkedArticle[];
}) => (
  <Flex justifyContent="center">
    <Box>
      <Flex flexWrap="wrap">
        <ArticleArea>
          <Heading mb={2}>Tech Articles</Heading>
          <ArticleList>
            {techArticles.map(({ url, title }) => (
              <ArticleListItem key={url}>
                <ArticleLink
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {title}
                </ArticleLink>
              </ArticleListItem>
            ))}
          </ArticleList>
        </ArticleArea>
        <ArticleArea>
          <Heading mb={2}>IM@S Articles</Heading>
          <ArticleList>
            {imasArticles.map(({ url, title }) => (
              <ArticleListItem key={url}>
                <ArticleLink
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {title}
                </ArticleLink>
              </ArticleListItem>
            ))}
          </ArticleList>
        </ArticleArea>
      </Flex>
      <Flex justifyContent="center">
        <Box mt="24px">
          <Link
            href="https://berlysia.hatenablog.com/"
            target="_blank"
            rel="noopener noreferrer"
            mx="4px"
            p="4px"
            sx={{
              border: "2px solid",
              borderColor: "primary",
              borderRadius: "4px",
            }}
          >
            Hatena Blog
          </Link>
          <Link
            href="https://qiita.com/berlysia"
            target="_blank"
            rel="noopener noreferrer"
            mx="4px"
            p="4px"
            sx={{
              border: "2px solid",
              borderColor: "primary",
              borderRadius: "4px",
            }}
          >
            Qiita
          </Link>
        </Box>
      </Flex>
    </Box>
  </Flex>
);

export default Index;
