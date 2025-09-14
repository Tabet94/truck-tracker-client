import tripService from "../Services/tripService";
import { useQuery } from "@tanstack/react-query"
import { useParams, Link as RouterLink } from "react-router-dom"
import { useToast, Center, Spinner } from "@chakra-ui/react";
import MapTrip from "./trip-map";




const TripById = () => {
    const { tripId } = useParams()
    const toast = useToast()

    const { data: trip, isLoading, isError,} = useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => tripService.getById(tripId),
    onError: (error) => {
      toast({
        title: "Cant load your trip",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      console.error("Error during fetching a trip:", error)
    },
  })
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
    return(
<div>{trip && <MapTrip trip={trip} />}</div>
    )
};

export default TripById