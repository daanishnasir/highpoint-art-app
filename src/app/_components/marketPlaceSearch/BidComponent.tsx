"use client";

import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

interface BidComponentProps {
  currentBid: number;
  endTime: string;
}

const BidComponent = ({ currentBid, endTime }: BidComponentProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDateTime = new Date(endTime).getTime();
      const now = new Date().getTime();
      const difference = endDateTime - now;

      if (difference <= 0) {
        setTimeLeft("Ended");
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      );
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial calculation

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <Box
      display="flex"
      backgroundColor="#C41E3A"
      color="white"
      borderBottomRadius="8px"
      overflow="hidden"
    >
      <Box
        flex="0 0 auto"
        borderRight="1px solid rgba(255, 255, 255, 0.2)"
        p={3}
      >
        <Box as="span" fontSize="lg">
          ⚡
        </Box>
      </Box>
      <Box
        flex="1"
        borderRight="1px solid rgba(255, 255, 255, 0.2)"
        p={3}
        textAlign="center"
      >
        <Text fontWeight="bold">Bid ${currentBid.toLocaleString()}</Text>
      </Box>
      <Box flex="0 0 auto" p={3} minWidth="120px" textAlign="center">
        <Text>{timeLeft}</Text>
      </Box>
    </Box>
  );
};

export default BidComponent;
