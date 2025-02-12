/* eslint-disable @next/next/no-img-element */
import { useLocalStorage } from "usehooks-ts";
import { type ArtImage } from "~/types";

interface ArtworkDetailProps {
  artwork: ArtImage;
}

export const ArtworkDetail = ({ artwork }: ArtworkDetailProps) => {
  const [isDarkMode] = useLocalStorage<boolean>("darkMode", false, {
    initializeWithValue: false,
  });

  return (
    <div
      className={`mx-auto max-w-7xl px-4 py-8 ${isDarkMode ? "bg-black text-white" : ""}`}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h1
            className={`mb-2 font-serif text-4xl ${isDarkMode ? "text-white" : ""}`}
          >
            {artwork.title}
          </h1>
          <div className="mb-4">
            <p className={`text-lg ${isDarkMode ? "text-white" : ""}`}>
              {artwork.culture}
            </p>
            <p className={`text-gray-600 ${isDarkMode ? "text-gray-400" : ""}`}>
              {artwork.objectDate}
            </p>
          </div>
          {artwork.primaryImage && (
            <div className="relative aspect-[3/4]">
              <img
                src={artwork.primaryImage}
                alt={artwork.title}
                className="h-full w-full object-contain"
              />
            </div>
          )}
          {artwork.GalleryNumber && (
            <p className={`mt-4 text-sm ${isDarkMode ? "text-white" : ""}`}>
              On view at The Met Fifth Avenue in Gallery {artwork.GalleryNumber}
            </p>
          )}
          {artwork.medium && (
            <p
              className={`mt-4 max-w-prose text-gray-700 ${isDarkMode ? "text-gray-300" : ""}`}
            >
              {artwork.medium}
            </p>
          )}
        </div>

        <div className="mt-8 md:mt-24">
          <h2
            className={`mb-6 font-serif text-2xl ${isDarkMode ? "text-white" : ""}`}
          >
            Artwork Details
          </h2>
          <div className="space-y-4">
            <DetailRow
              label="Title"
              value={artwork.title}
              isDarkMode={isDarkMode}
            />
            <DetailRow
              label="Date"
              value={artwork.objectDate}
              isDarkMode={isDarkMode}
            />
            <DetailRow
              label="Geography"
              value={`${artwork.city ? `${artwork.city}, ` : ""}${artwork.country ?? ""}`}
              isDarkMode={isDarkMode}
            />
            <DetailRow
              label="Culture"
              value={artwork.culture}
              isDarkMode={isDarkMode}
            />
            <DetailRow
              label="Medium"
              value={artwork.medium}
              isDarkMode={isDarkMode}
            />
            <DetailRow
              label="Dimensions"
              value={artwork.dimensions}
              isDarkMode={isDarkMode}
            />
            <DetailRow
              label="Classification"
              value={artwork.classification}
              isDarkMode={isDarkMode}
            />
            <DetailRow
              label="Credit Line"
              value={artwork.creditLine}
              isDarkMode={isDarkMode}
            />
            <DetailRow
              label="Object Number"
              value={artwork.accessionNumber}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({
  label,
  value,
  isDarkMode,
}: {
  label: string;
  value?: string;
  isDarkMode: boolean;
}) => {
  if (!value) return null;

  return (
    <div className="border-t border-gray-200 py-3">
      <div
        className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
      >
        {label}
      </div>
      <div
        className={`mt-1 text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}
      >
        {value}
      </div>
    </div>
  );
};
