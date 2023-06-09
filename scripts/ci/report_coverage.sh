#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero exit status.
set -x # Print commands and their arguments as they are executed.

## Zip up coverage directory for easier downloading in semaphore

zip -r coverage-$SEMAPHORE_GIT_SHA $COVERAGE_DIRECTORY

### Upload coverage files to semaphore

artifact push job coverage-$SEMAPHORE_GIT_SHA.zip
artifact push job "$COVERAGE_DIRECTORY/$COVERAGE_TOTAL_FILE"

# Upload coverage HTML files to S3
bin/ci/upload_to_s3

### Determine if we meet minimum coverage threshold

COVERAGE_TOTAL=`awk '{printf "%.2f", $1}' < "$COVERAGE_DIRECTORY/$COVERAGE_TOTAL_FILE"`
MET_COVERAGE=`awk -vcov="$COVERAGE_TOTAL" -vmin="$COVERAGE_MINIMUM" 'BEGIN { print (cov >= min) ? "YES" : "NO" }'`

echo "MET_COVERAGE: $MET_COVERAGE ($COVERAGE_TOTAL / $COVERAGE_MINIMUM)"

# report the coverage stats to prometheus file
bin/ci/update_prometheus --js $COVERAGE_TOTAL

[[ "$MET_COVERAGE" == "YES" ]]
