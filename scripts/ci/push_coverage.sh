#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero exit status.
set -x # Print commands and their arguments as they are executed.

# If there is a coverage directory,
if [ -d $COVERAGE_DIRECTORY ]
 then
  # push this coverage directory to semaphore as a job artifcact, expiring in 3 days
  artifact push job --force $COVERAGE_DIRECTORY
  # push the shared job up as a workflow artifact, expiring in 2 weeks
  artifact push workflow --force $COVERAGE_DIRECTORY
fi
