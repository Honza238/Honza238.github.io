#!/bin/bash

# Set the source directory containing the images
echo Folder with images:
read SOURCE_DIR

# Set the output directory for metadata files
echo Metadata output folder:
read OUTPUT_DIR

# Ensure the output directory exists
mkdir -p "$OUTPUT_DIR"

# Loop through all image files in the source directory
for image in "$SOURCE_DIR"/*.jpg; do
    # Get the base name of the image without extension
    base_name=$(basename "$image" .jpg)

    # Define the output metadata file
    metadata_file="$OUTPUT_DIR/${base_name}_metadata.txt"

    # Extract metadata using ExifTool
    exiftool -s3 -ExposureTime -FNumber -ISO -FocalLength -LensModel -Model -FocalLengthIn35mmFormat "$image" > "$metadata_file"
    echo "$SOURCE_DIR/$base_name.jpg" >> $metadata_file

    # Notify the user
    echo "Extracted metadata for $image to $metadata_file"

    ./ffmpeg -i $SOURCE_DIR/$base_name.jpg -vf "scale='if(gt(iw,ih),2000,-1):if(gt(ih,iw),2000,-1)'" -c:v libwebp -compression_level 6 $OUTPUT_DIR/${base_name}.webp

    echo converted to webp

done
