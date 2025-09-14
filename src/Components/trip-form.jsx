import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast,
  Box,
  VStack,
  HStack,
  Grid,
  GridItem,
  Text,
  Divider,
  FormErrorMessage,
  Card,
  CardBody,
  Badge,
} from "@chakra-ui/react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import tripService from "../Services/tripService"
import { LuMapPin, LuClock, LuUser, LuTruck } from "react-icons/lu"
import truck from '../assets/truck.jpg'

const TripForm = () => {
  const queryClient = useQueryClient()
  const toast = useToast()

  const createTripMutation = useMutation({
    mutationFn: tripService.create,
    onSuccess: () => {
      toast({
        title: "Trip created successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      queryClient.invalidateQueries({ queryKey: ["trips"] })
    },
    onError: (error) => {
      toast({
        title: "Error creating trip.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      console.error("Error creating trip:", error)
    },
  })

  const TripSchema = Yup.object().shape({
    driver_name: Yup.string().required("Driver name is required"),
    current_location_input: Yup.string().required("Current location is required"),
    pickup_location_input: Yup.string().required("Pickup location is required"),
    dropoff_location_input: Yup.string().required("Drop-off location is required"),
    cycle_hours_used: Yup.string().required("Cycle hours are required"),
    start_date: Yup.date().required("Departure date is required"),
  })

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    createTripMutation.mutate(values)
    setSubmitting(false)
    resetForm()
  }

  return (
    <Stack minH="100vh" direction={{ base: "column", md: "row" }} bg="gray.50">
      <Flex p={8} flex={1} align="center" justify="center">
        <Box w="full" maxW="2xl">
          <VStack spacing={6} mb={8} align="start">
            <HStack spacing={3}>
              <Box p={2} bg="purple" borderRadius="md">
                <LuTruck size={24} color="white" />
              </Box>
              <VStack align="start" spacing={1}>
                <Heading fontSize="2xl" color="gray.800" fontWeight="bold">
                  Create New Delivery Trip
                </Heading>
                <HStack>
                  <Badge colorScheme="purple" variant="subtle">
                    Driver Portal
                  </Badge>
                </HStack>
              </VStack>
            </HStack>
          </VStack>

          <Card shadow="lg" border="1px solid" borderColor="gray.200">
            <CardBody p={8}>
              <Formik
                initialValues={{
                  driver_name: "",
                  current_location_input: "",
                  pickup_location_input: "",
                  dropoff_location_input: "",
                  cycle_hours_used: "",
                  start_date: "",
                }}
                validationSchema={TripSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <VStack spacing={8} align="stretch">
                      <Box>
                        <HStack spacing={2} mb={4}>
                          <LuUser size={20} color="purple" />
                          <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                            Driver Information
                          </Text>
                        </HStack>

                        <FormControl isRequired isInvalid={errors.driver_name && touched.driver_name}>
                          <FormLabel color="gray.600" fontSize="sm" fontWeight="medium">
                            Driver Name
                          </FormLabel>
                          <Field
                            as={Input}
                            name="driver_name"
                            placeholder="Enter driver name"
                            bg="gray.50"
                            border="1px solid"
                            borderColor="gray.300"
                            size="lg"
                            _focus={{
                                  bg: "white",
                                  borderColor: "purple.700",
                                  boxShadow: "0 0 0 1px purple",
                                }}
                          />
                          <FormErrorMessage>{errors.driver_name}</FormErrorMessage>
                        </FormControl>
                      </Box>

                      <Divider />

                      <Box>
                        <HStack spacing={2} mb={4}>
                          <LuMapPin size={20} color="purple" />
                          <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                            Route Information
                          </Text>
                        </HStack>

                        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                          <GridItem>
                            <FormControl
                              isRequired
                              isInvalid={errors.current_location_input && touched.current_location_input}
                            >
                              <FormLabel color="gray.600" fontSize="sm" fontWeight="medium">
                                Current Location
                              </FormLabel>
                              <Field
                                as={Input}
                                name="current_location_input"
                                placeholder="Enter current location"
                                bg="gray.50"
                                border="1px solid"
                                borderColor="gray.300"
                                size="lg"
                               _focus={{
                                  bg: "white",
                                  borderColor: "purple.700",
                                  boxShadow: "0 0 0 1px purple",
                                }}
                              />
                              <FormErrorMessage>{errors.current_location_input}</FormErrorMessage>
                            </FormControl>
                          </GridItem>

                          <GridItem>
                            <FormControl
                              isRequired
                              isInvalid={errors.pickup_location_input && touched.pickup_location_input}
                            >
                              <FormLabel color="gray.600" fontSize="sm" fontWeight="medium">
                                Pickup Location
                              </FormLabel>
                              <Field
                                as={Input}
                                name="pickup_location_input"
                                placeholder="Enter pickup location"
                                bg="gray.50"
                                border="1px solid"
                                borderColor="gray.300"
                                size="lg"
                                _focus={{
                                  bg: "white",
                                  borderColor: "purple.700",
                                  boxShadow: "0 0 0 1px purple",
                                }}
                              />
                              <FormErrorMessage>{errors.pickup_location_input}</FormErrorMessage>
                            </FormControl>
                          </GridItem>
                        </Grid>

                        <Box mt={6}>
                          <FormControl
                            isRequired
                            isInvalid={errors.dropoff_location_input && touched.dropoff_location_input}
                          >
                            <FormLabel color="gray.600" fontSize="sm" fontWeight="medium">
                              Drop-off Location
                            </FormLabel>
                            <Field
                              as={Input}
                              name="dropoff_location_input"
                              placeholder="Enter drop-off location"
                              bg="gray.50"
                              border="1px solid"
                              borderColor="gray.300"
                              size="lg"
                             _focus={{
                                  bg: "white",
                                  borderColor: "purple.700",
                                  boxShadow: "0 0 0 1px purple",
                                }}
                            />
                            <FormErrorMessage>{errors.dropoff_location_input}</FormErrorMessage>
                          </FormControl>
                        </Box>
                      </Box>

                      <Divider />

                      <Box>
                        <HStack spacing={2} mb={4}>
                          <LuClock size={20} color="purple" />
                          <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                            Schedule Details
                          </Text>
                        </HStack>

                        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                          <GridItem>
                            <FormControl isRequired isInvalid={errors.cycle_hours_used && touched.cycle_hours_used}>
                              <FormLabel color="gray.600" fontSize="sm" fontWeight="medium">
                                Cycle Hours Used
                              </FormLabel>
                              <Field
                                as={Input}
                                name="cycle_hours_used"
                                placeholder="Enter cycle hours"
                                bg="gray.50"
                                border="1px solid"
                                borderColor="gray.300"
                                size="lg"
                               _focus={{
                                  bg: "white",
                                  borderColor: "purple.700",
                                  boxShadow: "0 0 0 1px purple",
                                }}
                              />
                              <FormErrorMessage>{errors.cycle_hours_used}</FormErrorMessage>
                            </FormControl>
                          </GridItem>

                          <GridItem>
                            <FormControl isRequired isInvalid={errors.start_date && touched.start_date}>
                              <FormLabel color="gray.600" fontSize="sm" fontWeight="medium">
                                Departure Date
                              </FormLabel>
                              <Field
                                as={Input}
                                type="date"
                                name="start_date"
                                bg="gray.50"
                                border="1px solid"
                                borderColor="gray.300"
                                size="lg"
                                _focus={{
                                  bg: "white",
                                  borderColor: "purple.700",
                                  boxShadow: "0 0 0 1px purple",
                                }}
                              />
                              <FormErrorMessage>{errors.start_date}</FormErrorMessage>
                            </FormControl>
                          </GridItem>
                        </Grid>
                      </Box>

                      <Box pt={4}>
                        <Button
                          type="submit"
                          bgColor="purple"
                          color="white"
                          size={{base:"md", lg:"lg"}}
                          width="full"
                          leftIcon={<LuTruck />}
                          isLoading={createTripMutation.isLoading}
                          loadingText="Creating Trip..."
                          _hover={{
                            transform: "translateY(-1px)",
                            boxShadow: "lg",
                          }}
                        >
                          Create Delivery Trip
                        </Button>
                      </Box>
                    </VStack>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </Stack>
  )
}

export default TripForm
