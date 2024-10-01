1. Create a public github repo `your company name`
2. Initialize with a README, MIT license and 'node' gitignore file
3. Make a public BETA repo key for your project
4. Make it repo scoped for 90 days
- admin read:write
- commit read:write
- contents read: write
5. https://yourusername:PAT@github.com/yourusername/reponame
6. Git clone
- Captain do an `git add .` `git commit -m first commit` `git push -u origin main`
7. Make teammates collaborators through github settings
8. each member will need a classic access token and append their own PAT to the url
9. Team members will clone
10. Team members will create their own branches off of main ex: `git checkout -b member1-branch`
11. Team members can build their own prototypes on their branch before merging or commiting to main branch
