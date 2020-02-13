import { Flex, Image, Link, Box, Text, Heading } from "rebass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faMastodon,
} from "@fortawesome/free-brands-svg-icons";

function Root() {
  return (
    <Flex flexDirection="column">
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="backgrounds.1"
      >
        <Flex>
          <Image
            src="/avatar.png"
            variant="avatar"
            width="128px"
            height="128px"
          />
          <Flex ml={4} flexDirection="column" justifyContent="center">
            <Heading mb={2}>@berlysia</Heading>
            <Box as="ul" my={1}>
              <Text as="li" my={1}>
                Web Engineer (mainly frontend)
              </Text>
              <Box as="ul">
                <Text as="li" my={1}>
                  -&gt; I&apos;m especially familiar with React, RxJS, and
                  ESLint.
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
      </Flex>
      <Box>
        <Text>content</Text>
      </Box>
    </Flex>
  );
}

export default Root;
