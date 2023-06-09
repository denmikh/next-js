#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero exit status.

# Require jest config to have json-summary
echo "Checking for json-summary in jest.config.js…"
grep -q 'json-summary' jest.config.js

# Calculate coverage
echo "Calculating coverage totals…"
STATEMENT_COV=`jq .total.statements.pct "${COVERAGE_DIRECTORY}/${COVERAGE_SUMMARY_JSON_FILE}"`
BRANCH_COV=`jq .total.branches.pct "${COVERAGE_DIRECTORY}/${COVERAGE_SUMMARY_JSON_FILE}"`
FUNCTION_COV=`jq .total.functions.pct "${COVERAGE_DIRECTORY}/${COVERAGE_SUMMARY_JSON_FILE}"`
LINE_COV=`jq .total.lines.pct "${COVERAGE_DIRECTORY}/${COVERAGE_SUMMARY_JSON_FILE}"`
TOTAL_COVERAGE=`echo $STATEMENT_COV $BRANCH_COV $FUNCTION_COV $LINE_COV | awk '{sum=0; for(i=1; i<=NF; i++) sum += $i; print sum / (i-1)}'`

# Write to file
echo "Total Coverage: ${TOTAL_COVERAGE}"
echo "${TOTAL_COVERAGE}" > "${COVERAGE_DIRECTORY}/${COVERAGE_TOTAL_FILE}"
