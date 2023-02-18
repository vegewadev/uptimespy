import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
  } from '@chakra-ui/react';
  
  export default function LoginCard(props) {
    return (
      <Flex
        align={'center'}
        justify={'center'}>
        <Stack spacing={8} mx={'auto'} mt={130} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to <a href="https://uptimespy.vercel.app">UPTIME<span style={{ color: "#9f7aea" }} >SPY</span></a></Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg="#24212b"
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Username</FormLabel>
                <Input type="username" onChange={props.usernameHandler}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={props.passwordHandler}/>
              </FormControl>
              <Stack spacing={10}>
                
                { props.isSubmitting ? <Button
                  bg={'purple.400'}
                  
                  color={'white'}
                  disabled={true}
                  isLoading={true}
                  _hover={{
                    bg: 'purple.400',
                    cursor: 'default'
                  }}>
                </Button> : <Button
                  bg={'purple.400'}
                  color={'white'}
                  _hover={{
                    bg: 'purple.500',
                  }}
                  onClick={props.submitHandler}
                  >
                  Login
                </Button> }
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
  