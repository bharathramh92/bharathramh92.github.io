# script to remove all the commit history
# thanks to http://stackoverflow.com/a/13102849/4459261
git checkout --orphan `git log --format="%H" -n 1`
git add -A  # Add all files and commit them
git commit -m "Removed git history"
git branch -D master  # Deletes the master branch
git branch -m master  # Rename the current branch to master
echo "To upload the updated source code, run: git push -f origin master"  # Force push master branch to github
