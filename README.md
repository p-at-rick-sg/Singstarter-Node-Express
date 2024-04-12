# ga3-grp10-BE

GA Project 3 Group 10

Members: Benjamin Foo, Kristian Nielsen, Patrick Kittle

# SingStarter 

A Singapore-based crowd funding app where users can pledge their money to help fund your next big idea.
We have built a localised model of Kickstarter for Singapore. Our high level functionality is:


## Technologies Used
- React
- Tailwind
- Material UI
- express
- MongoDB w/ mongoose

## Getting Started
Before you begin, ensure you have met the following requirements:

- Node.js (which includes npm)
- MongoDB installed locally or access to a MongoDB database

### Installation

To install the project, follow these steps:

1. Clone the repository:

```bash
#Frontend
>git clone https://github.com/p-at-rick-sg/ga3-grp10-FE
#Backend
>git clone https://github.com/p-at-rick-sg/ga3-grp10-BE

#Change working directory to project directory
>cd your-project-directory
>npm i 

# Start both Front and Backend
>npm start
```

### User Interactions
- Home page showcasing the live projects in cards.
- Signup for an account
- Signin to your account
- Manage your account/upgrade to a contributor
- Project details page - images and text about the project.
- Ask questions about the project to the owner
- Full purchase workflow - allow users to make payment to the project and take paynment into Stripe

### Contributor Interactions
- Signup for an account
- Manage account 
- Member home page listing all the projects 
- Add projects page
- Manage project page - add images, update text, answer questions


### Admin Interactions
- View all active users
- Delete users
- Shows graphs for signups and activity
- View project funding details/revenue


## Screenshots
Landing Page
![image](https://github.com/p-at-rick-sg/ga3-grp10-FE/assets/44813216/1f63ea94-25c6-40d5-9391-1696f83c2710)

Discover/Search Page
![image](https://github.com/p-at-rick-sg/ga3-grp10-BE/assets/44813216/c22a78a0-1195-489a-bf3c-9eb808a1dbd6)

Signup Page
![image](https://github.com/p-at-rick-sg/ga3-grp10-BE/assets/44813216/5e0b9570-a6c3-4896-9c5c-99f18bc0f049)

Signin Page
![image](https://github.com/p-at-rick-sg/ga3-grp10-FE/assets/44813216/0a300296-193e-4136-b0d9-c7b26cce6548)

Project Page
![image](https://github.com/p-at-rick-sg/ga3-grp10-BE/assets/44813216/20c094b4-1048-4979-b515-6c8b75b4e25d)

Profile Manager Page
![image](https://github.com/p-at-rick-sg/ga3-grp10-BE/assets/44813216/a2a8fc7f-422d-4c8f-afb0-0b586065d76d)

Checkout Page
![image](https://github.com/p-at-rick-sg/ga3-grp10-BE/assets/44813216/45d7f8bb-3a77-413a-a296-18f6f25e82a4)
![image](https://github.com/p-at-rick-sg/ga3-grp10-BE/assets/44813216/875b4914-4b67-448c-a080-276503f566d8)

Payment Page
![image](https://github.com/p-at-rick-sg/ga3-grp10-BE/assets/44813216/f6f44a2f-c37b-47eb-ae89-de828febfad4)

Contributor Member Page
![image](https://github.com/p-at-rick-sg/ga3-grp10-BE/assets/44813216/d3bb1062-6923-41ae-8541-207b9f6afd48)

Add Project Page
![image](https://github.com/p-at-rick-sg/ga3-grp10-BE/assets/44813216/f4bc79bc-bcee-4f28-bc3d-9c303bfbf410)

Admin Dashboard
![image](https://github.com/p-at-rick-sg/ga3-grp10-BE/assets/44813216/91c352dc-da7b-4383-82c8-d214a10538b3)

Page Not Found
![image](https://github.com/p-at-rick-sg/ga3-grp10-BE/assets/44813216/f4112e93-247e-4aaf-aec0-b2abe52b3807)



## Icebox Items
Icebox items go here

## References
- [API Dictionary](https://docs.google.com/spreadsheets/d/1wfkbw6tjOfWev1ZcPoxbaVDZ3InfBr3GgQTUlA75zVo/edit#gid=833770197)   
- [Material UI](https://mui.com/material-ui/getting-started/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Stripe](https://docs.stripe.com/)
- [date-fns](https://date-fns.org/v3.6.0/docs/format)
- [recharts](https://recharts.org/en-US/)

## .env variables
```
_Frontend .env:_
TE_SERVER=http://localhost:7001
VITE_FE_PORT=5173
#GCP Storage Info
VITE_GCP_ASSETS_URI=https://storage.googleapis.com/ga-project-3-assets/
#Stripe Publishable Key
VITE_STRIPE_PUB_KEY=

_Backend .env:_
PORT=7001
FE_PORT=5173
MONGO_URI=mongodb+srv://user:password@cluster0.for7dn9.mongodb.net/development
ACCESS_SECRET=
REFRESH_SECRET=
STRIPE_TEST=
PROJECT_ID=winter-jet-212808
BUCKET_NAME=ga-project-3-assets
GOOGLE_APPLICATION_CREDENTIALS=winter-jet-212808-fc4a3206d0d7.json
IMAGE_BASE_URI=https://storage.googleapis.com/ga-project-3-assets/

_Google_JSON_Creds_file_name
winter-jet-212808-fc4a3206d0d7.json stored in root of backend
```


