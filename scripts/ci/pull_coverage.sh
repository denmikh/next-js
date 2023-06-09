#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero exit status.
set -x # Print commands and their arguments as they are executed.

# get the test coverage
artifact pull workflow $COVERAGE_DIRECTORY
