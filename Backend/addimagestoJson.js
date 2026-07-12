import fs from "fs";

const CHAIR_IMAGE_COUNT = 9; // chair1.jpg ... chair9.jpg
const BOOKSHELF_IMAGE_COUNT = 10; // bookshelf1.jpg ... bookshelf10.jpg

function addImages(inputPath, outputPath, prefix, imageCount) {
  const raw = fs.readFileSync(inputPath, "utf-8");
  const json = JSON.parse(raw);

  // Support both { "listings": [...] } and a plain top-level array
  const isWrapped = Array.isArray(json.listings);
  const items = isWrapped ? json.listings : json;

  const updatedItems = items.map((item, i) => {
    const imageNumber = (i % imageCount) + 1;
    return {
      ...item,
      imageUrl: `/${prefix}${imageNumber}.jpg`,
    };
  });

  const output = isWrapped ? { ...json, listings: updatedItems } : updatedItems;

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), "utf-8");
  console.log(
    `Wrote ${updatedItems.length} items with imageUrl to ${outputPath}`,
  );
}
addImages(
  "./chairs.json",
  "./chairs.withImages.json",
  "chair",
  CHAIR_IMAGE_COUNT,
);
addImages(
  "./bookshelfcategory.json",
  "./bookshelfcategory.withImages.json",
  "bookshelf",
  BOOKSHELF_IMAGE_COUNT,
);

console.log(
  "Done! Review the new files, then rename/replace your originals if happy.",
);
