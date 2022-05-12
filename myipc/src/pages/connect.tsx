import {
    Text,
    Button,
    Input,
    Stack,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useToast,
    useDisclosure,
    Center,
    Flex,
} from '@chakra-ui/react';
import { useContext, useState } from "react";
import { program } from "aleph-sdk-ts";
import { ItemType } from "aleph-sdk-ts/messages/message";
import { DEFAULT_API_V2 } from "aleph-sdk-ts/global"
import { UserContext } from 'routes/UserContext';
import Card from 'Component/card';


const Connect = (): JSX.Element => {
    const [getSelectedFile, setSelectedFile] = useState<File>(new File([], ""));
    const [getSelectedProgram, setSelectedProgram] = useState<File>(new File([], ""));
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useContext(UserContext);

    const handleSubmitProgram = async () => {
        const confirmation = await program.publish({
            account: user,
            channel: "TEST",
            storageEngine: ItemType.storage,
            inlineRequested: true,
            APIServer: DEFAULT_API_V2,
            file: getSelectedFile,
            entrypoint: "main:app",
        });
        console.log("confirmation: https://aleph.sh/vm/" + confirmation.item_hash);
    }

    return (
        <>
            <Text>{user.address}</Text>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Text fontSize="2xl">Upload program</Text>
                    </ModalHeader>

                    <ModalBody>
                        <Input
                            type="file"
                            border="0px"
                            _focus={{ outline: 'none' }}
                            onChange={(e) => {
                                if (e.target.files !== null)
                                    setSelectedProgram(e.target.files[0])
                            }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Stack direction={['row']}>
                            <Button
                                colorScheme="teal"
                                variant="outline"
                                onClick={onClose}
                            >
                                Close
                            </Button>
                            <Button
                                colorScheme="teal"
                                variant="solid"
                                disabled={!(getSelectedProgram !== undefined)}
                                onClick={async () => await handleSubmitProgram()}
                            >
                                Upload
                            </Button>
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Text fontSize="2xl">Upload file</Text>
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            type="file"
                            border="0px"
                            _focus={{ outline: 'none' }}
                            onChange={(e) => {
                                if (e.target.files !== null)
                                    setSelectedFile(e.target.files[0])
                            }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Stack direction={['row']}>
                            <Button
                                colorScheme="teal"
                                variant="outline"
                                onClick={onClose}
                            >
                                Close
                            </Button>
                            <Button
                                colorScheme="teal"
                                variant="solid"
                                disabled={!(getSelectedFile !== undefined)}
                                onClick={async () => await handleSubmitProgram()}
                            >
                                Upload
                            </Button>
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Flex bg="blackAlpha.200" w='100%' h='980px'>
                <Center w='100%' h='450px' bg='yellow.500'>
                    <Flex display='flex' h='0'>
                        <Card nameButton="Upload Program" actionButton={onOpen} image={"https://www.hcpc-uk.org/globalassets/image-library/icons/icon-register-800x600.gif"} />
                        <Card nameButton="Upload text" actionButton={onOpen} image={"https://www.hcpc-uk.org/globalassets/image-library/icons/icon-register-800x600.gif"} />
                        <Card nameButton="Upload file" actionButton={onOpen} image={"https://www.hcpc-uk.org/globalassets/image-library/icons/icon-register-800x600.gif"} />
                    </Flex>
                </Center>
            </Flex>
        </>
    )
}

export default Connect;