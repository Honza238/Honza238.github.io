#!/bin/bash

#Set the source dir
echo Folder with images:
read SOURCE_DIR

#Set the output dir
echo Metadata and webp output folder:
read OUTPUT_DIR

mkdir -p "$OUTPUT_DIR"


for image in "$SOURCE_DIR"/*.jpg; do

    base_name=$(basename "$image" .jpg)
   
    metadata_file="$OUTPUT_DIR/${base_name}_keywords.txt"
    #echo "$SOURCE_DIR/$base_name.jpg" >> $metadata_file

    #Extract keywords using exiftool
    exiftool -s3 -Keywords "$image" > "$metadata_file"
    
    echo "Extracted keywords for $image to $metadata_file"
done