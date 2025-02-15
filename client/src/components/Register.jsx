import { useState } from 'react'
import axios from 'axios'
import { Button } from '@chakra-ui/button'
import {VStack} from "@chakra-ui/layout"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { useToast } from '@chakra-ui/react'


const Register = () => {

  //state for user name
  const [name, setName] = useState()

  //state for user email
  const [email, setEmail] = useState()

  //state for confirmed password
  const [confirmPassword, setConfirmPassword] = useState()

  //state for password
  const [password, setPassword] = useState()


  const [show, setShow] = useState(false)


  const [loading, setLoading] = useState(false)

  //for form functionality when typed in data is correct or false
  const toast = useToast()



  //showing or hiding passwords or email
  const handleClick = () => {
      setShow(!show)
  }


  //function for registering (connecting to backend)
  const submitHandler = async () => {

    setLoading(true)

    if(!name || !email || !password || !confirmPassword) {
        toast({
            title: 'Please fill all of the fields.',
            description: "Warning",
            status: 'warning',
            duration: 6000,
            isClosable: true,
            position: 'bottom',
        })
        setLoading(false)
        return
    }

    if(password !== confirmPassword) {
        toast({
            title: 'Passwords do not match.',
            description: "Passwords do not match",
            status: 'warning',
            duration: 6000,
            isClosable: true,
            position: 'bottom',
        })
        return
    }

    
    //sending our data to designated API
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }


        const { data } = await axios.post(
            "http://localhost:5000/api/v1/auth/signup", 
            { name, email, password, confirmPassword },
            config
        )

        toast({
            title: 'Registration successful.',
            description: "You are now registered",
            status: 'success',
            duration: 6000,
            isClosable: true,
            position: 'bottom',
        })
        
        localStorage.setItem("userInfo", JSON.stringify(data))
        setLoading(false)
        
          // redirect user to the home page
          window.location.href = "/";

    } catch (error) {
        
        toast({
            title: 'Error occured.',
            description: error.response.data.message,
            status: 'error',
            duration: 6000,
            isClosable: true,
            position: 'bottom',
        })
        setLoading(false)
        console.log(error)
    }


}





  return (
<>
  
<VStack spacing="5px">
        <FormControl id="first-name" isRequired>
            <FormLabel>
                Name
            </FormLabel>
            <Input placeholder="Enter your name" onChange={(e)=>setName(e.target.value)}></Input>
        </FormControl>

        <FormControl id="email" isRequired>
            <FormLabel>
                Email
            </FormLabel>
            <Input placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}></Input>
        </FormControl>

        <FormControl id="password" isRequired>
            <FormLabel>
                Password
            </FormLabel>
            <InputGroup>
            <Input type={show ? "text" : "password"} placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}></Input>
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    { show ? "Hide" : "Show" }
                </Button>
            </InputRightElement>
            </InputGroup>  
        </FormControl>

        <FormControl id="password" isRequired>
            <FormLabel>
                Confirm Password
            </FormLabel>
            <InputGroup>
            <Input type={show ? "text" : "password"} placeholder="Enter your password" onChange={(e)=>setConfirmPassword(e.target.value)}></Input>
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    { show ? "Hide" : "Show" }
                </Button>
            </InputRightElement>
            </InputGroup>  
        </FormControl>


        <Button
        colorScheme='blue'
        width="100%"
        style={{marginTop: 15}}
        onClick={submitHandler}
        isLoading={loading}
        >
            Sign Up
        </Button>
    </VStack>
  


</>
  )
}

export default Register