import { Button, Center, Flex, FormControl, FormLabel, HStack, AlertDialog, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import { accounts } from 'aleph-sdk-ts';
import { ImportAccountFromPrivateKey } from "aleph-sdk-ts/accounts/ethereum";
import Card from "Component/card";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "routes/UserContext";

const Home = (): JSX.Element => {
    const [getMnemonic, setMnemonic] = useState('');
    const [getAccount, setAccount] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [getPrivateKey, setPrivateKey] = useState('');
    const toast = useToast();
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);


    const CreateAccount = async () => {
        try {
            const { mnemonic, account } = accounts.ethereum.NewAccount();
            setMnemonic(mnemonic);
            setUser(account);
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

    const logout = async () => {
        localStorage.clear();
    }

    const Login = (privateKey: string) => {
        try {
            const connect = ImportAccountFromPrivateKey(privateKey);
            setUser(connect);
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
            <Flex bg="blackAlpha.200" w='100%' h='980px'>
                <Center w='100%' h='450px' bg='yellow.500'>
                    <Flex display='flex' h='0'>
                        <Card nameButton="Create account" actionButton={CreateAccount} image={"https://www.hcpc-uk.org/globalassets/image-library/icons/icon-register-800x600.gif"} />
                        <Card nameButton="Login" actionButton={onOpen} image={"https://www.hcpc-uk.org/globalassets/image-library/icons/icon-register-800x600.gif"} />
                    </Flex>
                </Center>
            </Flex>
        </>
    )
}

export default Home;