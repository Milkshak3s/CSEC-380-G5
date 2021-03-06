# Activity 1

1. What is the URL of your GitHub project?
- https://github.com/Milkshak3s/CSEC-380-G5

2. How did you break up your projects and what are the security ramifications?
- Projects for the first 2 activities-worth of tasks were broken up by a major feature such as implementing testing or writing design documentation. For future work, projects will be broken up by major feature, such as an authentication system, or being able to post on the site. Security-wise, this logically groups a number or related changes together for testing, which should make it clearer what change or set of changes is causing a vulnerability.

3. How did you choose to break down your Epic into various issues (tasks)?
- Epics were broken down into tasks by seperating out individual contributions that could be accomplished in a relatively short amount of time, such as defining a process, or adding a Dockerfile to the
 repo.

4. How long did you assign each sprint to be?
- Each sprint will be 1 week long.

5. Did you deviate from the Agile methodology at all? If yes, what is your reasoning for this?
- Yes, in a couple ways. First, we are collapsing the review, retrospective, and next sprint planning into a single meeting. This is more in align with our team member's schedules, as well as the light amount of work (in comparison to a major project at a company). Second, we will be doing "standup" updates over slack as things are started / finished / blocked, rather than daily, which is easier for students with heavy schedules, and more accurate to the ammount of work. Finally we will not be doing backlog grooming, which is unecessary in a class project with specifically assigned features.

6. How do you ensure that after each issue/milestone that security has been verified? How would you identify such issues in an ideal environment?
- After each issue is closed, features related to the code changed while fixing the issue will be tested manually for vulnerabilities that we know how to test for. At the end of each milestone, the entire application will be manually tested for vulnerabilities, as well as scanned by a web vulnerability scanner such as Nexpose. In an ideal enviornment, we would have vulnerability scanning and automated security testing build into the CI pipeline each time new code is committed, or at least when a new PR is made to the master branch. We would also, in an ideal environment, have individuals with better skills manually testing the application at the end of each milestone.
