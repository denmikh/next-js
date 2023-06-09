branch=`git symbolic-ref HEAD`
if [ "$branch" = "refs/heads/main" ]; then
    echo "Direct commits to the main branch are not allowed."
    exit 1
fi
