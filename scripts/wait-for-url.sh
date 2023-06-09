#!/bin/bash
# wait-for-url.sh

set -e

url="$1"
code="$2"
seconds="$3"

echo "URL: $url"
echo "CODE: $code"

function get_url_status()
{
   result=$(curl -s -o /dev/null -w '%{http_code}' "$url")
   echo $result
}

while true
do
    result=$(get_url_status)
    if [ $result == $code ]; then
        echo "$url has responded with $code"
        break;
    else
        echo "Waiting for $url to respond with $code but received $result... sleeping"
        sleep $seconds
    fi
done

