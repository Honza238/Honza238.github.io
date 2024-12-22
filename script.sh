#!/bin/bash

#Set the source dir
echo Folder with images:
read SOURCE_DIR

#Set the output dir
echo Metadata output folder:
read OUTPUT_DIR

mkdir -p "$OUTPUT_DIR"


for image in "$SOURCE_DIR"/*.jpg; do

    base_name=$(basename "$image" .jpg)

    
    metadata_file="$OUTPUT_DIR/${base_name}.txt"
    #echo "$SOURCE_DIR/$base_name.jpg" >> $metadata_file

    #Extract metadata using exiftool
    exiftool -s3 -ExposureTime -FNumber -ISO -FocalLength -Model -FocalLengthIn35mmFormat -LensModel "$image" > "$metadata_file"
    

    echo "Extracted metadata for $image to $metadata_file"

    ./ffmpeg -i $SOURCE_DIR/$base_name.jpg -vf "scale='if(gt(iw,ih),2000,-1):if(gt(ih,iw),2000,-1)'" -c:v libwebp -compression_level 6 $OUTPUT_DIR/${base_name}.webp

    echo converted to webp

done
