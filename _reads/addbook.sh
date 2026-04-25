#!/bin/bash

# Define the markdown file name
markdown_file="2026books.md"

sed -i '$d' "$markdown_file"

# Function to prompt for input and read the value
ask() {
  read -p "$1: " response
  echo "$response"
}

# Get the details from the user
number=$(ask "Enter the review number")
book_title=$(ask "Enter the book title")
book_link=$(ask "Enter the book link")
author=$(ask "Enter the author")
rating=$(ask "Enter your rating (out of 5)")

# opening a temporary file for the review, inspired by git commit
temp_file=$(mktemp)
nvim "$temp_file"
review=$(cat "$temp_file")
rm "$temp_file"

# Create the markdown entry
markdown_entry="#### $number. [$book_title]($book_link) by $author <span style=\"float: right;\">\`($rating/5)\`</span>"

# Append the entry to the markdown file
echo "$markdown_entry" >> "$markdown_file"
echo "" >> "$markdown_file"
echo "$review" >> "$markdown_file"
echo "" >> "$markdown_file"
echo "---" >> "$markdown_file"

echo "Review for '$book_title' has been appended to '$markdown_file'."

exit 0
