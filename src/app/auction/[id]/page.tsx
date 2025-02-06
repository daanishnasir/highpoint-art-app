"use client";

import { Box } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { type ArtImage } from "~/types";
import { ArtworkDetail } from "~/app/_components";
import Link from "next/link";

export default function ArtDetailsPage() {
  const params = useParams();
  const [art, setArt] = useState<ArtImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const response = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${params.id}`,
        );
        const data = await response.json();
        setArt(data);
      } catch (error) {
        console.error("Error fetching art:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      void fetchArt();
    }
  }, [params.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!art) {
    return <div>Art not found</div>;
  }

  return (
    <Box maxW="container.xl" mx="auto">
      <Box
        position="sticky"
        top={0}
        bg="white"
        p={4}
        borderBottom="1px"
        borderColor="gray.200"
        zIndex={10}
      >
        <Box
          maxW="container.xl"
          mx="auto"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            display="flex"
            alignItems="center"
            fontSize="lg"
            color="gray.600"
          >
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>{art.department}</span>
          </Box>

          <Box display="flex" gap={4}>
            <Box
              as="button"
              bg="gray.100"
              py={2}
              px={6}
              borderRadius="full"
              _hover={{ bg: "gray.200" }}
              fontWeight="bold"
            >
              Inquire
            </Box>
          </Box>
        </Box>
      </Box>

      <ArtworkDetail artwork={art} />
    </Box>
  );
}
