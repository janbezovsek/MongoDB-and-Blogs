import {} from 'react'
import { Container, Text ,Box,Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/Login'
import Register from '../components/Register'
import './SignUp.css'


const SignUp = ({ onShowHome }) => {
return (
<>
<div className="home" onClick={onShowHome}>
    <button>
      Home
    </button>
</div>
<Container maxW="5xl" centerContent > 
  <Box
    display="flex"
    justifyContent="center"
    p={5}
    m="50px 0 20px 0"
    w="80%"
    backgroundColor={"rgb(255, 255, 255)"}
    borderRadius="lg"
    borderWidth="1px"
  >
<Text fontSize="4xl" fontFamily="Work sans"  color="black"> Sign Up </Text>
  </Box>
    <Box backgroundColor={"rgb(255, 255, 255)"} w="80%" p={5} borderRadius="lg" borderWidth="1px">
      <Tabs variant='soft-rounded' colorScheme='green'>
        <TabList mb="1em">
          <Tab width="50%">Login</Tab>
          <Tab width="50%">Register</Tab>
        </TabList>
      <TabPanels>
        <TabPanel>
          <Login />
        </TabPanel>
        <TabPanel>
          <Register/>
        </TabPanel>
      </TabPanels>
      </Tabs>
    </Box>
</Container>
</>
)
}

export default SignUp