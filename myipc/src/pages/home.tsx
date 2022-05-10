import { Button, Center, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import { accounts } from 'aleph-sdk-ts';
import { ImportAccountFromPrivateKey } from "aleph-sdk-ts/accounts/ethereum";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = (): JSX.Element => {
    const [getMnemonic, setMnemonic] = useState('');
    const [getAccount, setAccount] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [getPrivateKey, setPrivateKey] = useState('');
    const toast = useToast();
    const navigate = useNavigate();


    const CreateAccount = async () => {
        try {
            const { mnemonic, account } = accounts.ethereum.NewAccount();
            setMnemonic(mnemonic);
            setAccount(account.address);
            navigate("/connect");
            toast({
                title: 'Account Create.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        } catch (e) {
            toast({
                title: 'Account Create Fail.',
                description: "We can't create account for the moment",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }

    const Login = (privateKey: string) => {
        try {
            const connect = ImportAccountFromPrivateKey(privateKey);
            navigate("/connect");
            toast({
                title: 'Account Connect.',
                description: "We are connect on your account.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
        catch (e) {
            toast({
                title: 'Account Connect Fail.',
                description: "This private key do not exist",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Private Key</FormLabel>
                            <Input onChange={(e) => setPrivateKey(e.target.value)} placeholder='Private Key' />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => Login(getPrivateKey)} colorScheme='blue' mr={3}>
                            Connect
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Center>
                <HStack >
                    <Button onClick={CreateAccount}>
                        Create account
                    </Button>
                    <Button onClick={onOpen}>
                        Login
                    </Button>
                </HStack>
            </Center>
        </>
    )
}

export default Home;