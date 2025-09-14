import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Text,
  Badge,
  Icon,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { FiClock, FiTruck, FiPackage } from "react-icons/fi";
import { FaBed } from "react-icons/fa";

const EldLogs = ({ logs }) => {
  if (!logs || logs.length === 0) return null

  return (
    <Card bg="white" shadow="lg" borderRadius="xl" border="1px" borderColor="gray.200">
      <CardHeader bg="purple" borderTopRadius="xl" py={4}>
        <HStack spacing={3}>
          <Icon as={FiClock} color="white" boxSize={6} />
          <VStack align="start" spacing={0}>
            <Heading size="lg" color="white" fontWeight="bold">
              ELD Logs
            </Heading>
            <Text fontSize="sm" color="gray.400" fontWeight="medium">
              Logging Records
            </Text>
          </VStack>
        </HStack>
      </CardHeader>

      <CardBody p={0}>
        <Box overflowX="auto">
          <Table variant="simple" size="md">
            <Thead bg="gray.50">
              <Tr>
                <Th color="gray.600" fontWeight="bold" fontSize="sm" py={4} borderColor="gray.200">
                  <HStack spacing={2}>
                    <Icon as={FiClock} boxSize={4} />
                    <Text>Date</Text>
                  </HStack>
                </Th>
                <Th color="gray.600" fontWeight="bold" fontSize="sm" py={4} borderColor="gray.200">
                  <HStack spacing={2}>
                    <Icon as={FiTruck} boxSize={4} color="green.500" />
                    <Text>Driving Hours</Text>
                  </HStack>
                </Th>
                <Th color="gray.600" fontWeight="bold" fontSize="sm" py={4} borderColor="gray.200">
                  <HStack spacing={2}>
                    <Icon as={FaBed} boxSize={4} color="blue.500" />
                    <Text>Rest Hours</Text>
                  </HStack>
                </Th>
                <Th color="gray.600" fontWeight="bold" fontSize="sm" py={4} borderColor="gray.200">
                  <HStack spacing={2}>
                    <Icon as={FiPackage} boxSize={4} color="orange.500" />
                    <Text>Pickup/Drop-off Hours</Text>
                  </HStack>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {logs.map((log, index) => (
                <Tr
                  key={log.date}
                  bg={index % 2 === 0 ? "white" : "gray.50"}
                  _hover={{
                    bg: "blue.50",
                    transform: "translateY(-1px)",
                    transition: "all 0.2s",
                  }}
                >
                  <Td py={4} borderColor="gray.200">
                    <Text fontWeight="semibold" color="gray.700">
                      {log.date}
                    </Text>
                  </Td>
                  <Td py={4} borderColor="gray.200">
                    <Badge colorScheme="green" variant="subtle" px={3} py={1} borderRadius="full" fontWeight="bold">
                      {log.driving_hours}h
                    </Badge>
                  </Td>
                  <Td py={4} borderColor="gray.200">
                    <Badge colorScheme="blue" variant="subtle" px={3} py={1} borderRadius="full" fontWeight="bold">
                      {log.rest_hours}h
                    </Badge>
                  </Td>
                  <Td py={4} borderColor="gray.200">
                    <Badge colorScheme="orange" variant="subtle" px={3} py={1} borderRadius="full" fontWeight="bold">
                      {log.pickup_dropoff_hours}h
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </CardBody>
    </Card>
  )
}

export default EldLogs
