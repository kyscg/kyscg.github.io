#!/bin/bash

# Get the name for the file
read -p "Enter the name for the file (will be part of the filename): " name

# Get the current date in<ctrl98>-MM-DD format
current_date=$(date +%Y-%m-%d)

# Get the current date and time in<ctrl3348>-MM-DD HH:MM:SS +OFFSET format
timestamp=$(date +"%Y-%m-%d %H:%M:%S %z")

# Create the filename
filename="${current_date}-${name}.md"

# Define the frontmatter content
frontmatter="---
permalink: $(date +%Y)/$(date +%m)/$(date +%d)/${name}
title:
subtitle:
date: ${timestamp}
layout: default
keywords:
categories:
published: true
---"

# Create the file and add the frontmatter
echo "$frontmatter" > "$filename"

# Append the utterances script to the file
echo "$utterances_script" >> "$filename"

echo "Markdown file '$filename' created"
echo "Frontmatter:"
echo "$frontmatter"
