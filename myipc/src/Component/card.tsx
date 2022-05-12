import { Box, Button, Center, Flex, HStack, Image, VStack } from "@chakra-ui/react";

const Card = (props: any): any => {
    return (
        <>
            <Box w='300px' h="300px" borderWidth='3px' bg="white" margin={4} >
                <Center h="80px">
                    <VStack>
                        <Image src={props.image}/>
                        <Box w='100%' height={30}>
                            <Button bg="blue.800" textColor={"white"} onClick={props.actionButton} w="100%">
                                {props.nameButton}
                            </Button>
                        </Box>
                    </VStack>
                </Center>
            </Box>
        </>
    )
}

export default Card;