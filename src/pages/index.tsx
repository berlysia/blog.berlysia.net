import { Flex, Image, Link, Box, Text, Heading } from "rebass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faMastodon,
} from "@fortawesome/free-brands-svg-icons";
import { Head } from "../components/head";

function Root() {
  return (
    <Flex flexDirection="column">
      <Head title="berlysia.net" />
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100vh"
        p="24px"
        bg="backgrounds.1"
      >
        <Profile />
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100vh"
        p="24px"
        bg="backgrounds.2"
      >
        <Articles />
      </Flex>
    </Flex>
  );
}

const Profile = () => (
  <Flex flexWrap="wrap" justifyContent="center">
    <Box sx={{ flexShrink: 0 }}>
      <Image
        src="/avatar-128.png"
        srcSet="/avatar-256.png 2x, /avatar-384.png 1.5x, /avatar-128.png 1x"
        variant="avatar"
        width="128px"
        height="auto"
      />
    </Box>
    <Flex ml={3} flexDirection="column" justifyContent="center">
      <Heading mb={2}>@berlysia</Heading>
      <Box as="ul" my={1}>
        <Text as="li" my={1}>
          Web Engineer (mainly frontend)
        </Text>
        <Box as="ul">
          <Text as="li" my={1}>
            -&gt; I&apos;m especially familiar with React, RxJS, and ESLint.
          </Text>
        </Box>
      </Box>
      <Box as="ul" my={1}>
        <Text as="li" my={1}>
          Idol Producer (a fan of THE IDOLM@STER)
        </Text>
        <Box as="ul">
          <Text as="li" my={1}>
            -&gt; PIC of{" "}
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
          </Text>
        </Box>
      </Box>
      <Box my={1}>
        <Text my={1}>I love Web, browsers, and JavaScript.</Text>
      </Box>
      <Flex mt={2}>
        <Link
          mr={1}
          rel="me"
          target="_blank"
          href="https://twitter.com/berlysia"
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
          rel="me"
          target="_blank"
          href="https://github.com/berlysia"
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
          rel="me"
          target="_blank"
          href="https://imastodon.net/@berlysia"
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
    </Flex>
  </Flex>
);

const Articles = () => (
  <Flex justifyContent="center">
    <Box>
      <Heading mb={2}>Articles</Heading>
      <Box as="ul">
        <Box as="li">
          <Link
            href="https://qiita.com/berlysia/items/402009bb27d3793117eb"
            target="_blank"
            rel="noopener noreferrer"
          >
            先取りRxJS v7 - Qiita
          </Link>
        </Box>
        <Box as="li">
          <Link
            href="https://blog.nnn.dev/entry/2019/12/03/022824"
            target="_blank"
            rel="noopener noreferrer"
          >
            ESLintを活用した漸進的リファクタリングのすすめ -
            ドワンゴ教育サービス開発者ブログ
          </Link>
        </Box>
        <Box as="li">
          <Link
            href="https://qiita.com/berlysia/items/dad98488c4bdde938ef3"
            target="_blank"
            rel="noopener noreferrer"
          >
            RxJS v6 の進化した TestScheduler を使う - Qiita
          </Link>
        </Box>
        <Box as="li">
          <Link
            href="https://qiita.com/berlysia/items/f77fb6ed703589770be8"
            target="_blank"
            rel="noopener noreferrer"
          >
            イベントを聞くPromiseのメモリリークとその対策 - Qiita
          </Link>
        </Box>
        <Box as="li">
          <Link
            href="https://qiita.com/berlysia/items/ce14f023f10100e35d35"
            target="_blank"
            rel="noopener noreferrer"
          >
            Async Functions - Qiita
          </Link>
        </Box>
        <Box as="li">
          <Link
            href="https://qiita.com/berlysia/items/3aeb1f0ab2494de9e24e"
            target="_blank"
            rel="noopener noreferrer"
          >
            Promiseを返す関数の直列実行におけるreduceの利用と注意点 - Qiita
          </Link>
        </Box>
      </Box>
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
