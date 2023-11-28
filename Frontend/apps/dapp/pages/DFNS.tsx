import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Spinner,
  Center,
  extendTheme,
  ChakraProvider,
  Text
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { WebAuthn } from '@dfns/sdk-webauthn'

const linkDFNSSandbox =
  "https://app.dfns.ninja/";

const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          maxWidth: ["50%", "50%", "50%"],
          minWidth: "45%",
          bg: "#ffffff"
        }
      })
    },
    Button: {

    }
  }
});

function DFNS() {
  const [vaultId, setVaultId] = useState("0");
  const [inputEmail, setInputEmail] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHandlingMinting, setIsHandlingMinting] = useState(false);
  const [isNftAddress, setisNftAddress] = useState(false);
  const [nftAddress, setNftAddress] = useState("");
  const [nftIndex, setNftIndex] = useState(0);

  useEffect(() => {
    const fetchVault = async () => {
      console.log(process.env.NX_WALLET_CONNECT_ID)
      

    }

    fetchVault().catch(console.error);
  }, [])

  const onRegisterUser = async () => {
    console.log("register user")
    console.log(inputEmail)
    try {
      const resp1 = await fetch('/api/hello', { method: 'GET'})
      console.log(await resp1.json())
      const resp2 = await fetch('/api/register/init', 
        { method: 'POST', body: JSON.stringify({ email: inputEmail }) })
      const challenge = await resp2.json()
      console.log(challenge)
      const webauthn = new WebAuthn({ rpId: process.env.NEXT_PUBLIC_DFNS_WEBAUTHN_RPID! })
      const attestation = await webauthn.create(challenge)
      const resp3 = await fetch('./api/register/complete', {
        method: 'POST',
        body: JSON.stringify({
          tempAuthToken: challenge.temporaryAuthenticationToken,
          signedChallenge: { firstFactorCredential: attestation },
        }),
      })
      const resultFinal = await resp3.json()
      console.log(resultFinal)
    } catch (e) {
      console.log(e)
    }
  }

  const onLoginUser = async () => {
    console.log("login user")
    console.log(inputEmail)
  }

  const onUpdateInputValue = async (e) => {
    console.log(e.target.value)
    setInputEmail(e.target.value)
  }

  return (
    <div>
      <ChakraProvider theme={theme}>
        <Center>
          <Button border="2px" colorScheme="purple" onClick={onOpen} margin={4}>
            Access DFNS 
          </Button>
        </Center>
        <Center>
          <p />
         
          
        </Center>

        {vaultId && (
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color="white">
                Click this {" "}
                <a
                  href={linkDFNSSandbox}
                  target="_blank"
                  rel="noreferrer"
                >
                  DFNS Sandbox link
                </a>{" "}
                to learn more
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody textAlign={"center"} fontSize={"12px"}>
                <input type="email" name="email" placeholder="email" className="input" onChange={onUpdateInputValue} />
                <Button border="2px" colorScheme="blue" onClick={onRegisterUser} margin={4}>
                  Register User
                </Button>
                <Button border="2px" colorScheme="blue" onClick={onLoginUser} margin={4}>
                  Login User
                </Button>
                <Center>
                  <div>
                    <p />
                    
                  </div>
                </Center>
              </ModalBody>

              <Center>
                <ModalFooter>
                  <Center marginBottom={1}>
                  
                  </Center>
                </ModalFooter>
              </Center>
            </ModalContent>
          </Modal>
        )}
    
      </ChakraProvider>
    </div>
  );
}

export default DFNS;
