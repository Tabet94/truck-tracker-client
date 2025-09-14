import { Table, Thead, Tbody, Tr, Th, Td, useToast, Spinner, Center, Button } from "@chakra-ui/react";
import tripService from "../Services/tripService";
import { useQuery } from "@tanstack/react-query";
import NavigateTrip from "./navigate-trip";

const AllTrips = () => {
  const toast = useToast();

  const { data: tripsData, isLoading, isError } = useQuery({
    queryKey: ["trips"],
    queryFn: async () => {
      const response = await tripService.getAll();
      return response; 
    },
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
      <Center h="100px">
        <Spinner size="lg" />
      </Center>
    );
  }

  if (isError) {
    return <div>Error loading trips.</div>;
  }

  return (
    <Table size="sm" variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          <Th>Current Location</Th>
          <Th>Pickup Location</Th>
          <Th>Drop-off Location</Th>
          <Th>Cycle Hours Used</Th>
          <Th>Departure Date</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      
      <Tbody>
        {tripsData.map((trip) => (
          <Tr key={trip.id}>
            <Td>{trip.current_location?.name}</Td>
            <Td>{trip.pickup_location?.name}</Td>
            <Td>{trip.dropoff_location?.name}</Td>
            <Td>{trip.cycle_hours_used}</Td>
            <Td>{trip.start_date}</Td>
            <Td>
              <NavigateTrip tripId={trip.id}>View Trip</NavigateTrip>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default AllTrips;
