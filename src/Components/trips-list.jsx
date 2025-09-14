import {
  Box,
  Grid,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Icon,
  Button,
  useToast,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiTruck, FiMapPin, FiCalendar } from "react-icons/fi";
import tripService from "../Services/tripService";
import { useQuery } from "@tanstack/react-query";
import NavigateTrip from "./navigate-trip";

const AllTrips = () => {
  const toast = useToast();


  const {
    data: tripsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: tripService.getAll,
    onError: (error) => {
      toast({
        title: "Error fetching trips",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  if (isLoading) {
    return (
      <Box p={8}>
        <VStack spacing={6}>
          <Heading size="lg" color="purple">
            Loading Trips
          </Heading>
          <Spinner size="xl" color="purple.700" thickness="4px" />
          <Text color='gray.600'>Fetching your trip data...</Text>
        </VStack>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={8} textAlign="center">
        <VStack spacing={4}>
          <Icon as={FiTruck} boxSize={12} color="purple.700" />
          <Heading size="md" color="red.500">
            Error Loading Trips
          </Heading>
          <Text color="gray.600">
            Unable to fetch trip data. Please try again later.
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box p={6} maxW="1400px" mx="auto">
      

      {tripsData?.length > 0 ? (
        <Grid
          templateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
          gap={6}
        >
          {tripsData.map((trip) => (
            <Card
              key={trip.id}
              bg="white"
             
              
              shadow="md"
              _hover={{ shadow: "lg", transform: "translateY(-2px)" }}
              transition="all 0.2s"
              minW="280px"
            >
              <CardHeader pb={2}>
                <HStack>
                  <Icon as={FiTruck} color="blue.500" />
                  <Heading size="sm" color="blue.700">
                    Trip #{trip.id}
                  </Heading>
                  <HStack color="gray.600" fontSize="sm" ml="auto">
                    <Icon as={FiCalendar} />
                    <Text>
                      {new Date(trip.start_date).toLocaleDateString()}
                    </Text>
                  </HStack>
                </HStack>
              </CardHeader>

              <CardBody pt={0}>
                <VStack spacing={4} align="stretch">
                  <HStack>
                    <Icon as={FiMapPin} color="green.500" />
                    <VStack align="start" spacing={0} flex={1}>
                      <Text
                        fontSize="xs"
                        color="gray.600"
                        fontWeight="medium"
                      >
                        CURRENT LOCATION
                      </Text>
                      <Text fontSize="sm" fontWeight="semibold">
                        {trip.current_location?.name || "Not specified"}
                      </Text>
                    </VStack>
                  </HStack>

                  <Divider />

                  <HStack>
                    <Icon as={FiMapPin} color="blue.500" />
                    <VStack align="start" spacing={0} flex={1}>
                      <Text
                        fontSize="xs"
                        color="gray.600"
                        fontWeight="medium"
                      >
                        PICKUP LOCATION
                      </Text>
                      <Text fontSize="sm" fontWeight="semibold">
                        {trip.pickup_location?.name || "Not specified"}
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack>
                    <Icon as={FiMapPin} color="red.500" />
                    <VStack align="start" spacing={0} flex={1}>
                      <Text
                        fontSize="xs"
                        color="gray.600"
                        fontWeight="medium"
                      >
                        DROP-OFF LOCATION
                      </Text>
                      <Text fontSize="sm" fontWeight="semibold">
                        {trip.dropoff_location?.name || "Not specified"}
                      </Text>
                    </VStack>
                  </HStack>

                  <Divider />

                  <NavigateTrip tripId={trip.id}>
                    <Button
                        variant="link"
                        color="blue.700"
                        fontWeight="semibold"
                        _hover={{
                        textDecoration: "underline",
                        color: "blue.900",
                        }}
                    >
                        View Trip Details
                    </Button>
                    </NavigateTrip>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </Grid>
      ) : (
        <Card bg="white" border="1px"  p={8}>
          <VStack spacing={4}>
            <Icon as={FiTruck} boxSize={16} color="gray.400" />
            <Heading size="md" color="gray.500">
              No Trips Found
            </Heading>
            <Text color="gray.600" textAlign="center">
              You haven't created any trips yet. Start by adding your first
              trip.
            </Text>
          </VStack>
        </Card>
      )}
    </Box>
  );
};

export default AllTrips;
