#!/bin/bash

# Set the source directory containing the images
read SOURCE_DIR

# Set the output directory for metadata files
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
done
