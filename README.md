# companyManagmentSystem
This is a simple application which helps managing company. You can login, logout, register. 

Logged user can add, delete, edit and read more info about customers, tvs and parts. You can also search and filter by status and date customers, tvs and parts. When you add or edit customer it will send an email to customer with infomations about changes.

<img width="938" alt="cust2" src="https://user-images.githubusercontent.com/60007028/108375377-2cad7b80-7202-11eb-99b6-25282e50c5b0.png">


Not logged user can only view, search and filter tvs and part.


# Getting started

## install node.js
You can download LTS version of the Node.js installer from https://nodejs.org/en/download/. Next you have to run it and go through the standard installation procedure
by selecting the default settings. You will need to agree to the license and make changes on the device.

Now you can test it by typing into command line: node -v and npm -v. You should get something like this: v14.15.4 and 6.14.11

## start project
You need to run some IDE, i used Visual Studio Code. Open new terminal and navigate to your project directory. To start a project, use the npm init command.

<img width="453" alt="npminit" src="https://user-images.githubusercontent.com/60007028/108383798-65515300-720a-11eb-9595-567cefa0914a.png">

If everything went right it should create a package.json file.

## install packages
The next step is to install following packages:
- expess
- nodemailer
- node-localstorage
- mongoose
- jsonwebtoken
- jsdom
- ejs
- dotenv
- bcrypt

You can do it by running one command: npm i --save expess bcrypt dotenv ejs jsdom jsonwebtoken mongoose node-localstorage nodemailer

## create env file
Next step is to create env file. In my case its name is config.env and i created it in main folder. This file should look like this:

<img width="284" alt="config" src="https://user-images.githubusercontent.com/60007028/108386348-dc87e680-720c-11eb-9e08-b911840696f6.png">
