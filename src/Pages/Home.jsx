import {
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Container,
  VStack,
  HStack,
  Badge,
  Divider,
} from "@chakra-ui/react"
import TripForm from "../Components/trip-form"
import { LuLogs, LuUser, LuTruck } from "react-icons/lu"

const Home = () => {
  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Header Section */}
        <Box bg="blue.50" p={6} borderRadius="lg" borderLeft="4px solid" borderLeftColor="blue.500">
          <HStack spacing={3} mb={2}>
            <LuTruck size={24} color="#3182CE" />
            <Heading size="lg" color="blue.700">
              Driver Dashboard
            </Heading>
            <Badge colorScheme="blue" variant="subtle">
              Professional
            </Badge>
          </HStack>
          <Text color="gray.700" fontSize="md">
            Manage your routes, track deliveries, and maintain compliance records
          </Text>
        </Box>

        <Divider />

        {/* Main Content Tabs */}
        <Tabs
          variant="enclosed"
          colorScheme="blue"
          bg="white"
          borderRadius="lg"
          boxShadow="sm"
          border="1px solid"
          borderColor="gray.200"
        >
          <TabList bg="gray.50" borderTopRadius="lg" borderBottom="1px solid" borderBottomColor="gray.200">
            <Tab
              fontWeight="semibold"
              _selected={{
                bg: "blue.500",
                color: "white",
                borderColor: "blue.500",
              }}
            >
              <HStack spacing={2}>
                <LuUser size={18} />
                <Text>New Route</Text>
              </HStack>
            </Tab>
            <Tab
              fontWeight="semibold"
              _selected={{
                bg: "blue.500",
                color: "white",
                borderColor: "blue.500",
              }}
            >
              <HStack spacing={2}>
                <LuLogs size={18} />
                <Text>Driver Logs</Text>
              </HStack>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={6}>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Heading size="md" color="gray.700" mb={2}>
                    Route Planning
                  </Heading>
                  <Text color="gray.600" fontSize="sm" mb={4}>
                    Create a new delivery route and schedule your trip
                  </Text>
                </Box>
                <TripForm />
              </VStack>
            </TabPanel>
            <TabPanel p={6}>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Heading size="md" color="gray.700" mb={2}>
                    Hours of Service Logs
                  </Heading>
                  <Text color="gray.600" fontSize="sm" mb={4}>
                    View and manage your driving hours and compliance records
                  </Text>
                </Box>
                <Box p={4} bg="gray.50" borderRadius="md" textAlign="center" color="gray.600">
                  Access your driving logs and compliance history
                </Box>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  )
}

export default Home
