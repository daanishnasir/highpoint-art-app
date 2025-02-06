/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Box,
  Input,
  Tabs,
  SelectValueText,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectRoot,
  Text,
} from "@chakra-ui/react";
import { SearchOutlined, CaretDownOutlined } from "@ant-design/icons";
import { createListCollection } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { type ArtImage } from "~/types";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogRoot,
} from "~/components/ui/dialog";

const tabData = [
  { value: "title", label: "Search by Title", isFirst: true },
  { value: "id", label: "Search by ID", isLast: true },
];

const ArtCard = ({
  image,
  index,
  onClick,
  isDarkMode,
}: {
  image: ArtImage;
  index: number;
  onClick: () => void;
  isDarkMode: boolean;
}) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -5,
        transition: { duration: 0.2 },
      }}
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        cursor: "pointer",
        height: "480px",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={onClick}
    >
      <img
        src={image.primaryImageSmall}
        alt={image.title}
        style={{
          width: "100%",
          height: "380px",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          padding: "12px 16px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              marginBottom: "4px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "black",
            }}
          >
            {image.title || "Artwork"}
          </h3>
          <p
            style={{
              color: "black",
              fontSize: "0.9rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            Department: {image?.department || "Unknown"}
          </p>
          <p style={{ color: "black" }}>
            Date: {image.objectDate || "Unknown"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const SidePanel = ({
  image,
  isOpen,
  onClose,
  index,
  isDarkMode,
}: {
  image: ArtImage | null;
  isOpen: boolean;
  onClose: () => void;
  index: number;
  isDarkMode: boolean;
}) => {
  const router = useRouter();
  const [detailedArt, setDetailedArt] = useState<ArtImage | null>(null);

  useEffect(() => {
    const fetchDetailedArt = async () => {
      if (image?.objectID) {
        try {
          const response = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${image.objectID}`,
          );
          const data = await response.json();
          setDetailedArt(data);
        } catch (error) {
          console.error("Error fetching art details:", error);
        }
      }
    };

    if (isOpen && image) {
      void fetchDetailedArt();
    }
  }, [isOpen, image]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0.4 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "black",
          zIndex: 999,
          display: isOpen ? "block" : "none",
        }}
        onClick={onClose}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 20 }}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "400px",
          height: "100vh",
          backgroundColor: "white",
          boxShadow: "-4px 0 10px rgba(0,0,0,0.1)",
          zIndex: 1000,
          padding: "2rem",
          overflowY: "auto",
        }}
      >
        {detailedArt && (
          <>
            <Box display="flex" justifyContent="flex-end" mb={4}>
              <Box
                as="button"
                onClick={onClose}
                p={2}
                _hover={{ bg: "gray.100" }}
                borderRadius="md"
                color="black"
                fontSize="24px"
              >
                ✕
              </Box>
            </Box>
            <img
              src={detailedArt.primaryImage}
              alt={detailedArt.title}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <Box mt={4}>
              <Text fontSize="2xl" fontWeight="bold" color="black">
                {detailedArt.title || "Artwork"}
              </Text>

              <Box mt={4}>
                {detailedArt.artistDisplayName && (
                  <Text mt={2} color="black">
                    Artist: {detailedArt.artistDisplayName}
                  </Text>
                )}
                {detailedArt.department && (
                  <Text mt={2} color="black">
                    Department: {detailedArt.department}
                  </Text>
                )}
                {detailedArt.period && (
                  <Text mt={2} color="black">
                    Period: {detailedArt.period}
                  </Text>
                )}
                {detailedArt.culture && (
                  <Text mt={2} color="black">
                    Culture: {detailedArt.culture}
                  </Text>
                )}
                {detailedArt.medium && (
                  <Text mt={2} color="black">
                    Medium: {detailedArt.medium}
                  </Text>
                )}
                {detailedArt.dimensions && (
                  <Text mt={2} color="black">
                    Dimensions: {detailedArt.dimensions}
                  </Text>
                )}
              </Box>

              <Box
                as="button"
                mt={6}
                w="full"
                bg="transparent"
                color="#0088CC"
                py={3}
                px={4}
                borderRadius="full"
                border="2px solid #0088CC"
                _hover={{ bg: "rgba(0, 136, 204, 0.1)" }}
                fontWeight="bold"
                onClick={() => {
                  router.push(`/auction/${detailedArt?.objectID}`);
                }}
              >
                View Full Details
              </Box>

              {detailedArt.creditLine && (
                <Box mt={6}>
                  <Text fontSize="xl" fontWeight="bold" color="black">
                    Credit
                  </Text>
                  <Text mt={1} color="black">
                    {detailedArt.creditLine}
                  </Text>
                </Box>
              )}

              {detailedArt.department && (
                <Box mt={4}>
                  <Text fontSize="xl" fontWeight="bold" color="black">
                    Department
                  </Text>
                  <Text mt={1} color="black">
                    {detailedArt.department}
                  </Text>
                </Box>
              )}
            </Box>
          </>
        )}
      </motion.div>
    </>
  );
};

const SearchArt = () => {
  const [isDarkMode] = useLocalStorage<boolean>("darkMode", false, {
    initializeWithValue: false,
  });
  const [tab, setTab] = useState<string | null>("title");
  const [sortValue, setSortValue] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedArt, setSelectedArt] = useState<ArtImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [images, setImages] = useState<ArtImage[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);

  const getTabStyles = (tabValue: string) => ({
    padding: "10px 20px",
    border: "1px solid #ccc",
    backgroundColor: tab === tabValue ? "#000" : "#fff",
    color: tab === tabValue ? "#fff" : "#333",
    borderRadius:
      tabValue === "title"
        ? "4px 0 0 4px"
        : tabValue === "id"
          ? "0 4px 4px 0"
          : undefined,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchMetObjectsByTitle = async (title: string) => {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?title=true&q=${encodeURIComponent(
        title,
      )}`,
    );
    const data = await response.json();
    const objectIDs = data.objectIDs || [];

    const objects = await Promise.all(
      // TODO check if we can fetch multiple otherwise just keep this
      objectIDs.slice(0, 10).map(async (id: number) => {
        const objectResponse = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
        );
        return objectResponse.json();
      }),
    );

    const artworks = objects.map((obj, index) => ({
      ...obj,
      originalIndex: index,
    }));

    const uniqueDepartments = Array.from(
      new Set(artworks.map((obj) => obj.department).filter(Boolean)),
    ).sort();

    setDepartments(uniqueDepartments);
    setImages(artworks);
  };

  const fetchMetObjectById = async (objectId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`,
      );
      const data = await response.json();
      if (data.objectID) {
        setImages([data]);
        setDepartments(data.department ? [data.department] : []);
      } else {
        setImages([]);
        setDepartments([]);
      }
    } catch (error) {
      console.error("Error fetching art by ID:", error);
      setImages([]);
      setDepartments([]);
    }
    setIsLoading(false);
  };

  const handleCardClick = (image: ArtImage, index: number) => {
    setSelectedArt(image);
    setSelectedIndex(index);
    setIsPanelOpen(true);
  };

  const sortOptions = createListCollection({
    items: [
      { label: "All Departments", value: "all" },
      ...departments.map((dept) => ({
        label: dept,
        value: dept.toLowerCase().replace(/\s+/g, "-"),
      })),
    ],
  });

  const getSortedImages = () => {
    if (!sortValue.length || sortValue[0] === "all") return images;

    return [...images].filter(
      (img) =>
        img.department.toLowerCase().replace(/\s+/g, "-") === sortValue[0],
    );
  };

  return (
    <Box p={4} maxW="container.xl" mx="auto">
      <Box
        position="relative"
        w="full"
        mb={4}
        bg={isDarkMode ? "#333" : "#f4f6f8"}
        border="1px solid"
        borderColor="gray.200"
        borderRadius="full"
        display="flex"
        alignItems="center"
        px={6}
        py={4}
      >
        <SearchOutlined
          style={{
            color: isDarkMode ? "white" : "black",
            fontSize: "32px",
            paddingLeft: "2rem",
          }}
        />
        <Input
          type="text"
          placeholder={
            tab === "title"
              ? "Search artwork title and hit enter, ex: glass, vase, jug"
              : "Enter artwork Object ID and hit enter, ex: 245376"
          }
          border="none"
          _placeholder={{ color: isDarkMode ? "gray.500" : "gray.500" }}
          _focus={{
            boxShadow: "none",
            outline: "none",
            border: "none",
          }}
          fontSize="xl"
          pl={3}
          w="full"
          h="40px"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              if (tab === "title") {
                await fetchMetObjectsByTitle(searchValue);
              } else {
                await fetchMetObjectById(searchValue);
              }
            }
          }}
        />
      </Box>

      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ base: "stretch", md: "center" }}
        gap={4}
        mb={4}
      >
        <Tabs.Root
          defaultValue="title"
          value={tab}
          onValueChange={(e) => {
            setTab(e.value);
            setSearchValue(""); //Note: clear search input if tab changes
          }}
        >
          <Tabs.List width={{ base: "100%", md: "auto" }} display="flex">
            {tabData.map((tab) => (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                style={getTabStyles(tab.value)}
                F
                flex={{ base: 1, md: "none" }}
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>

        <Box display="flex" alignItems="center" gap={4}>
          {images.length > 0 && (
            <DialogRoot>
              <DialogTrigger asChild>
                <Box
                  as="button"
                  bg="linear-gradient(135deg, #FFD700, #FFC700)"
                  color="black"
                  py={2}
                  px={4}
                  borderRadius="md"
                  border="2px solid #FFD700"
                  boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
                  _hover={{
                    bg: "linear-gradient(135deg, #FFC700, #FFB700)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                    transform: "scale(1.05)",
                  }}
                  fontWeight="bold"
                  fontSize="lg"
                >
                  What Tech?
                </Box>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle fontSize="2xl" fontWeight="bold">
                    What tech was used to make this?
                  </DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <p className="mb-4">
                    Whats up Phillip, Tim, built this app using:
                  </p>
                  <ul className="list-disc space-y-2 pl-6">
                    <li>Next.js Routing</li>
                    <li>React and Typescript because I'm a big fan</li>
                    <li>Tailwind CSS for styling</li>
                    <li>Framer Motion for the cool animations</li>
                    <li>
                      Chakra UI for components like Buttons, Tabs, Dropdowns,
                      etc.
                    </li>
                    <li>
                      It's mobile responsive as well (for the most part), try it
                      out!
                    </li>
                  </ul>
                </DialogBody>
                <DialogFooter display="flex" justifyContent="flex-end" gap={2}>
                  <DialogActionTrigger asChild>
                    <Box
                      as="button"
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="md"
                      px={4}
                      py={2}
                      _hover={{ bg: "gray.100" }}
                    >
                      Close
                    </Box>
                  </DialogActionTrigger>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
          )}

          <Box position="relative" width={{ base: "100%", md: "400px" }}>
            <SelectRoot
              collection={sortOptions}
              width="100%"
              value={sortValue}
              onValueChange={(e) => setSortValue(e.value)}
            >
              <SelectTrigger
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={3}
                px={4}
                py={2}
              >
                <Box display="flex" alignItems="center" gap={2} width="100%">
                  <Box
                    as="span"
                    color={isDarkMode ? "blue.400" : "gray.600"}
                    whiteSpace="nowrap"
                  >
                    Sort by Department:
                  </Box>
                  <Box flex="1" minWidth="0">
                    <SelectValueText
                      placeholder="All Departments"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "visible",
                        textOverflow: "clip",
                      }}
                    />
                  </Box>
                </Box>
                <CaretDownOutlined
                  style={{ fontSize: "12px", color: "#666" }}
                />
              </SelectTrigger>
              <SelectContent
                position="absolute"
                zIndex={1000}
                bg="white"
                boxShadow="lg"
                borderRadius="md"
                mt={1}
                top="100%"
                right={0}
                minWidth="400px"
                py={2}
              >
                {sortOptions.items.map((option) => (
                  <SelectItem
                    item={option}
                    key={option.value}
                    px={4}
                    py={2}
                    color={isDarkMode ? "white" : "black"}
                    _hover={{ bg: "gray.100" }}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Box>
        </Box>
      </Box>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "2rem",
          padding: "2rem 0",
        }}
      >
        {getSortedImages().map((image: ArtImage, index: number) => (
          <div key={image.objectID}>
            <ArtCard
              image={image}
              index={index}
              onClick={() => handleCardClick(image, index)}
              isDarkMode={isDarkMode}
            />
          </div>
        ))}
      </div>

      <SidePanel
        image={selectedArt}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        index={selectedIndex}
        isDarkMode={isDarkMode}
      />
    </Box>
  );
};

export default SearchArt;
