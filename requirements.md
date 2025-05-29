\***\*\*\*\*\*\*\***/\*/**\*\***\***\*\***Install playwrights******\*\*******\*\*\*\*******\*\*******/_/_/******\*\*\*\*******\*******\*\*\*\*******
npm init playwright@latest

******\*\*\*\*******\*******\*\*\*\*******Folder Structure**************\*\*\*\***************\*\*\***************\*\*\*\***************

mkdir -p src/test
mkdir -p src/pages
mkdir -p src/utils
mkdir -p src/config
mkdir -p src/api
mkdir -p src/reporting
mkdir -p src/logging
mkdir -p src/data

Broswer Engine found in the given location C:/Users/hp/AppData/Local/ms-playwright

copy all the folders and execute them in interminal

once execution is done verify the folders create under src , copy

********\*\*\*\*********\*\*\*********\*\*\*\*********Install Browser Engine**********\*\*\*\***********\***********\*\*\*\***********

******************\*******************Connect to git******************************\*\*\*******************************

git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Cognitivemind19/nsf002.git
git push -u origin main

****************************\*\*\*****************************git update****************************\*\*\*****************************

(base) PS C:\Interview2024\Playwrites\nsf002> git init
Initialized empty Git repository in C:/Interview2024/Playwrites/nsf002/.git/
(base) PS C:\Interview2024\Playwrites\nsf002> git remote add origin https://github.com/Cognitivemind19/nsf002.git
(base) PS C:\Interview2024\Playwrites\nsf002> git branch -M main
(base) PS C:\Interview2024\Playwrites\nsf002> git status
On branch main

No commits yet

Untracked files:
(use "git add <file>..." to include in what will be committed)
.gitignore
README.md
package-lock.json
package.json
playwright.config.ts
requirements.md
src/

nothing added to commit but untracked files present (use "git add" to track)
(base) PS C:\Interview2024\Playwrites\nsf002> git add .
warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'package-lock.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'package.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'playwright.config.ts', LF will be replaced by CRLF the next time Git touches it
(base) PS C:\Interview2024\Playwrites\nsf002> git status
On branch main

No commits yet

Changes to be committed:
(use "git rm --cached <file>..." to unstage)
new file: .gitignore
new file: README.md
new file: package-lock.json
new file: package.json
new file: playwright.config.ts
new file: requirements.md
new file: src/pages/HomePage.ts
new file: src/pages/LoginPage.ts
new file: src/tests/LoginTest.spec.ts
new file: src/tests/tables.spec.ts

(base) PS C:\Interview2024\Playwrites\nsf002> git commit -m 'Initial commit'
[main (root-commit) 38497ce] Initial commit
10 files changed, 316 insertions(+)
create mode 100644 .gitignore
create mode 100644 README.md
create mode 100644 package-lock.json
create mode 100644 package.json
create mode 100644 playwright.config.ts
create mode 100644 requirements.md
create mode 100644 src/pages/HomePage.ts
create mode 100644 src/pages/LoginPage.ts
create mode 100644 src/tests/LoginTest.spec.ts
create mode 100644 src/tests/tables.spec.ts
(base) PS C:\Interview2024\Playwrites\nsf002> git status
On branch main
nothing to commit, working tree clean

**************************\*\*\***************************SET NODE_ENV******************************\*\*******************************

$env:NODE_ENV="sit"

(base) PS C:\Interview2024\Playwrites\nsf002> echo $env:NODE_ENV
qa
(base) PS C:\Interview2024\Playwrites\nsf002> $env:NODE_ENV="sit"
(base) PS C:\Interview2024\Playwrites\nsf002> echo $env:NODE_ENV
sit

************************\*************************Encryption - Decryption**************************\*\*\*\***************************

CryptoJS


********************************************Logging**********************************************
winstoneJS


***********************************************************Faker ****************************************

faker-