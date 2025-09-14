import tripService from "../Services/tripService"
import { useQuery } from "@tanstack/react-query"
import { useParams, Link as RouterLink } from "react-router-dom"
import {
  useToast,
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
  Icon,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react"
import { FiTruck, FiMapPin, FiClock, FiArrowLeft } from "react-icons/fi"
import { FaRoute } from "react-icons/fa";

import MapTrip from "./trip-map"
import EldLogs from "./eld-logs"

const TripById = () => {
  const { tripId } = useParams()
  const toast = useToast()


  const {
    data: trip,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => tripService.getById(tripId),
    onError: (error) => {
      toast({
        title: "Unable to Load Trip",
        description: "There was an error loading your trip details. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      })
      console.error("Error during fetching a trip:", error)
    },
  })

  if (isLoading) {
    return (
      <Box minH="100vh" >
        <Container maxW="7xl" py={8}>
          <Card  shadow="lg" borderRadius="xl">
            <CardBody>
              <Flex direction="column" align="center" justify="center" py={20}>
                <Spinner size="xl" color="purple" thickness="4px" speed="0.65s" />
                <Text mt={4} fontSize="lg" color="black" fontWeight="medium">
                  Loading trip details...
                </Text>
              </Flex>
            </CardBody>
          </Card>
        </Container>
      </Box>
    )
  }

  if (isError) {
    return (
      <Box minH="100vh" >
        <Container maxW="7xl" py={8}>
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            borderRadius="xl"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Trip Not Found
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              We couldn't load the trip details. Please check the trip ID and try again.
            </AlertDescription>
            <Button as={RouterLink} to="/" mt={4} colorScheme="blue" leftIcon={<Icon as={FiArrowLeft} />}>
              Back to Trips
            </Button>
          </Alert>
        </Container>
      </Box>
    )
  }

  return (
    <Box minH="100vh">
      <Container maxW="7xl" py={6}>
        {/* Header Section */}
        <Card bgColor={"purple"} shadow="lg" borderRadius="xl" mb={6}>
          <CardHeader pb={4}>
            <Flex align="center" justify="space-between" wrap="wrap" gap={4}>
              <HStack spacing={4}>
                <Button
                  as={RouterLink}
                  to="/"
                  variant="ghost"
                  leftIcon={<Icon as={FiArrowLeft} />}
                  color="white"
                  _hover={{
                    transform: "translateY(-1px)",
                    boxShadow: "lg",
                }}
                >
                  Back to Trips
                </Button>
                <Divider orientation="vertical" h="6" />
                <HStack>
                  <Icon as={FiTruck} color="white" boxSize={10} />
                  <VStack align="start" spacing={0}>
                    <Heading size="lg" color="white">
                      Trip #{tripId}
                    </Heading>
                  </VStack>
                </HStack>
              </HStack>
            </Flex>
          </CardHeader>
        </Card>

        {/* Trip Information Cards */}
        {trip && (
          <VStack spacing={6} align="stretch">
            {/* Trip Overview Card */}
            <Card bgColor="blue.800" shadow="lg" borderRadius="xl">
              <CardHeader>
                <HStack>
                  <Icon as={FiMapPin} color="white" boxSize={5} />
                  <Heading size="md" color="white">
                    Trip Overview
                  </Heading>
                </HStack>
              </CardHeader>
              <CardBody pt={0}>
                <HStack spacing={8} wrap="wrap">
                  {trip.current_location?.name && (
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" color="gray.400" fontWeight="medium">
                        Current Position
                      </Text>
                      <Text fontSize="lg" fontWeight="bold" color="white">
                        {trip.current_location?.name}
                      </Text>
                    </VStack>
                  )}
                  {trip.pickup_location?.name && (
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" color="gray.400" fontWeight="medium">
                        Pickup Location
                      </Text>
                      <Text fontSize="lg" fontWeight="bold" color="white">
                        {trip.pickup_location?.name}
                      </Text>
                    </VStack>
                  )}
                  {trip.dropoff_location?.name && (
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" color="gray.400" fontWeight="medium">
                        Drop-off Location
                      </Text>
                      <Text fontSize="lg" fontWeight="bold" color="white">
                        {trip.dropoff_location?.name}
                      </Text>
                    </VStack>
                  )}
                  {trip.start_date && (
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" color="gray.400" fontWeight="medium">
                        Start Date
                      </Text>
                      <HStack>
                        <Icon as={FiClock} color="white"/>
                        <Text fontSize="lg" fontWeight="bold" color="white">
                          {new Date(trip.start_date).toLocaleString()}
                        </Text>
                      </HStack>
                    </VStack>
                  )}
                </HStack>
              </CardBody>
            </Card>

            {/* Map Section */}
            <Card  shadow="lg" borderRadius="xl">
              <CardHeader>
                <HStack>
                  <Icon as={FaRoute} color="purple" boxSize={5} />
                  <Heading size="md" color="blue.800">
                    Route Map
                  </Heading>
                </HStack>
              </CardHeader>
              <CardBody pt={0}>
                <Box borderRadius="lg" overflow="hidden" >
                  <MapTrip trip={trip} />
                </Box>
              </CardBody>
            </Card>

            {/* ELD Logs Section */}
            <Card shadow="lg" borderRadius="xl">
              <CardHeader>
                
              </CardHeader>
              <CardBody pt={0}>
                <Box borderRadius="lg" overflow="hidden">
                  <EldLogs logs={trip.logs} />
                </Box>
              </CardBody>
            </Card>
          </VStack>
        )}
      </Container>
    </Box>
  )
}

export default TripById
