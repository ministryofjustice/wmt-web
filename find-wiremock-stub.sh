#!/bin/bash

# Ports of known WireMock containers
ports=(8098 8099 8100 9096)

# Path to search for
target_path="/cases/unallocated/teamCount"

echo "Searching for stub matching '$target_path'..."

for port in "${ports[@]}"; do
  echo "Checking port $port..."

  response=$(curl -s "http://localhost:$port/__admin/mappings")

  if echo "$response" | grep -q "$target_path"; then
    echo "✅ Found stub on port $port"
  else
    echo "❌ Not found on port $port"
  fi
done