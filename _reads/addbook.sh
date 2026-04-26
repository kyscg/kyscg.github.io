#!/bin/bash

# Define the markdown file name
markdown_file="2026books.md"

# Remove the closing script tag so we can append before it
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

# Opening a temporary file for the review, inspired by git commit
temp_file=$(mktemp)
nvim "$temp_file"
review=$(cat "$temp_file")
rm "$temp_file"

# Build the heading line
heading="#### $number. [$book_title]($book_link) by $author <span style=\"float: right;\">\`($rating/5)\`</span>"

# Append the full book section
cat >> "$markdown_file" << EOF

<div class="book-section" markdown="1"
  data-title="$book_title"
  data-author="$author"
  data-rating="$rating/5"
  data-link="$book_link">

$heading

$review

</div>

EOF

# Re-add the closing script tag
echo '<script src="/assets/js/books-grid.js"></script>' >> "$markdown_file"

echo "Review for '$book_title' has been appended to '$markdown_file'."

# Download the cover for the new book immediately
if command -v python3 &> /dev/null && [ -f "download-covers.py" ]; then
  echo "Fetching cover for '$book_title'..."
  python3 download-covers.py "$markdown_file"
else
  echo "Note: run 'python3 download-covers.py $markdown_file' to fetch the cover."
fi

exit 0
