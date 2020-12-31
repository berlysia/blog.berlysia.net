import { Flex, Link, Box, Text, Heading } from "rebass";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faMastodon,
} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import { Head } from "../components/head";

function Root() {
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
        <Articles />
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

const TECH_ARTICLES = [
  {
    url: "https://blog.nnn.dev/entry/2020/12/11/021008",
    name:
      "TypeScript Compiler APIを使って型を中心に実装を自動生成する - ドワンゴ教育サービス開発者ブログ",
  },
  {
    url: "https://qiita.com/berlysia/items/402009bb27d3793117eb",
    name: "先取りRxJS v7 - Qiita",
  },
  {
    url: "https://blog.nnn.dev/entry/2019/12/03/022824",
    name:
      "ESLintを活用した漸進的リファクタリングのすすめ - ドワンゴ教育サービス開発者ブログ",
  },
  {
    url: "https://qiita.com/berlysia/items/dad98488c4bdde938ef3",
    name: "RxJS v6 の進化した TestScheduler を使う - Qiita",
  },
  {
    url: "https://qiita.com/berlysia/items/f77fb6ed703589770be8",
    name: "イベントを聞くPromiseのメモリリークとその対策 - Qiita",
  },
  {
    url: "https://qiita.com/berlysia/items/ce14f023f10100e35d35",
    name: "Async Functions - Qiita",
  },
  {
    url: "https://qiita.com/berlysia/items/3aeb1f0ab2494de9e24e",
    name: "Promiseを返す関数の直列実行におけるreduceの利用と注意点 - Qiita",
  },
];

const IMAS_ARTICLES = [
  {
    url: "https://berlysia.hatenablog.com/entry/2020/12/22/110000",
    name: "今が知りどき！ 今日から始める喜多日菜子2020 - Glacial Radiance",
  },
  {
    url: "https://berlysia.hatenablog.com/entry/2020/12/09/110000",
    name:
      "ドリームアウェイを繋ぐ強い想いと、佐久間まゆが喜多日菜子にもたらしたもの - Glacial Radiance",
  },
  {
    url: "https://berlysia.hatenablog.com/entry/2020/08/30/125106",
    name:
      "ある喜多日菜子Pが見た『世界滅亡 or KISS』ファーストインプレッション - Glacial Radiance",
  },
  {
    url: "https://berlysia.hatenablog.com/entry/2019/12/05/173000",
    name: "［トゥルー・ドリーム］喜多日菜子を振り返る - Glacial Radiance",
  },
];

const Articles = () => (
  <Flex justifyContent="center">
    <Box>
      <Flex flexWrap="wrap">
        <ArticleArea>
          <Heading mb={2}>Tech Articles</Heading>
          <ArticleList>
            {TECH_ARTICLES.map(({ url, name }) => (
              <ArticleListItem key={url}>
                <ArticleLink
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {name}
                </ArticleLink>
              </ArticleListItem>
            ))}
          </ArticleList>
        </ArticleArea>
        <ArticleArea>
          <Heading mb={2}>IM@S Articles</Heading>
          <ArticleList>
            {IMAS_ARTICLES.map(({ url, name }) => (
              <ArticleListItem key={url}>
                <ArticleLink
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {name}
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

export default Root;
