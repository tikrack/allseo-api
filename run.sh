#!/bin/bash

echo "=========================================="
echo "       AllSEO Analysis CLI"
echo "=========================================="
echo

echo "Starting Node.js application..."
echo

node index.js

echo
echo "=========================================="
echo "         Process Finished"
echo "=========================================="
echo

if [ -f "reports.json" ]; then
    echo "Opening reports.json..."

    # Linux
    xdg-open "reports.json"
else
    echo "reports.json was not found."
fi

echo
read -p "Press Enter to exit..."