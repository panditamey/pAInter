import {
  ChakraProvider,
  Heading,
  Container,
  // Text,
  Input,
  Button,
  Wrap,
  Stack, 
  Image,
  // Link,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState();
  const [loading, updateLoading] = useState();

  const generate = async (prompt) => {
    updateLoading(true);
    const result = await axios.get(`http://e4db-35-226-42-251.ngrok.io/?prompt=${prompt}`);
    updateImage(result.data);
    updateLoading(false);
  };

  return (
    <ChakraProvider>
      <Container>
        <Heading>Stable Diffusion</Heading>


        <Wrap marginBottom={"10px"}>
          <Input
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"768px"}
          ></Input>
          <Button onClick={(e) => generate(prompt)} colorScheme={"yellow"}>
            Generate
          </Button>
        </Wrap>

        {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : image ? (
          <Image src={`data:image/png;base64,${image}`} boxShadow="lg" />
        ) : null}
      </Container>
    </ChakraProvider>
  );
};

export default App;