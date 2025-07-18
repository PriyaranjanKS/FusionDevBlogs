---
layout: post
title: Creating a Project Document Querying Copilot with SharePoint and Manual Authentication
description: We will see the steps needed to create a Project Assistant Copilot with SharePoint.
date: 2024-07-19 15:01:35 +0300
image: '/images/FrontImage/03.png'
tags: [copilot]
---

## Table of Contents
{: .no_toc}

* TOC
{: toc}

## Introduction 

Having instant access to project information is crucial for effective project management and decision-making. Think of having a copilot that can fetch detailed project estimates, milestones, and other key details stored in documents on SharePoint, and provide contextual answers to user queries. This blog will guide you through the process of creating such a copilot using Microsoft Copilot Studio, leveraging documents stored in SharePoint and utilizing manual authentication for secure access. For ease of access, we will also be embedding the Copilot within a SharePoint page so that the employees can access it seamlessly. 
![1](\images\03_CopilotUsingSharePointDocuments\0_0.png)

## Why Use SharePoint with Copilot ?
SharePoint is a powerful platform for storing and managing documents, making it an ideal choice for hosting project-related information. By integrating SharePoint with Microsoft Copilot Studio, we can create a bot that can access and interpret these documents to provide precise answers to user queries. This integration ensures that users have quick, reliable access to up-to-date project information directly through the copilot. Moreover, any updates to the document can be made directly in SharePoint and the updated contents will be used for grounding and providing contextual answers back to the Copilot resulting in lesser maintenance going forward.

## Demo

Watch the demo video below to see how the Copilot assistant helps with project related queries in real-time scenarios.

<iframe width="560" height="315" src="https://www.youtube.com/embed/67IPt4hLBXU?vq=hd1080" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Prerequisites

Before diving into the implementation, ensure you have the following prerequisites:

1. **Microsoft 365 Account**: Access to SharePoint and Microsoft Copilot Studio.
2. **Azure Subscription**: To create App Registrations and manage authentication.
3. **SharePoint Site**: A site where you can upload and manage project documents.
4. **Copilot Studio Access**: Permissions to create and manage copilot instances.

## Technologies Involved

### SharePoint
- **Purpose**: Store and manage project documents.
- **Usage**: Central repository for all project-related files, enabling easy access and updates.

### Microsoft Copilot Studio
- **Purpose**: Create and manage copilots.
- **Usage**: Develop a custom copilot to fetch and interpret project documents from SharePoint.

### Azure App Registration
- **Purpose**: Enable manual authentication.
- **Usage**: Securely authenticate users to access SharePoint documents.

## Step-by-Step to Create the Copilot

### Step 1: Preparing Your Project Documents

#### 1.1. Collect and Organize Documents:
1. Gather all relevant project documents, such as estimates, timelines, milestones, and other key details.
2. Ensure that the document is well-structured, with clear sections and headings to facilitate easier parsing by the copilot.

In our case, we have a software development project document which contains the estimates and key timelines for the project.
![1](\images\03_CopilotUsingSharePointDocuments\1.jpg)

#### 1.2. Upload Documents to SharePoint:
1. **Create** a dedicated document library in SharePoint for your project files.
2. **Upload** the collected documents to this library.
![2](\images\03_CopilotUsingSharePointDocuments\2.jpg)

### Step 2: Create the Custom Copilot
#### 2.1. Create a New Copilot
Head over to [Copilot Studio](https://copilotstudio.microsoft.com/) and click on **Create**.
![3](\images\03_CopilotUsingSharePointDocuments\3.png)

This will provide us the option to create a copilot based on an existing template or create a blank copilot from scratch. Let's select **New copilot**.
![4](\images\03_CopilotUsingSharePointDocuments\4.png)

#### 2.2. Define Copilot Functionality
This will take us to the page where we can:
1. Describe the copilot functionality and provide any specific instructions to the copilot.
2. Once done, click on **Create** to provision the copilot.
![5](\images\03_CopilotUsingSharePointDocuments\5.png)

### Step 3: Enable Generative Selection of Topics 
#### 3.1. Edit Copilot Settings
The copilot is now created. We can then make the needed configuration changes:
1. Click on **Edit**, edit the copilot details like name, icon, and description.
2. Click on **Settings** to enable the Generative selection of topics so that without relying on triggers, the topics will be auto-selected based on user conversation resulting in a much smoother user experience.
![7](\images\03_CopilotUsingSharePointDocuments\7.png)

#### 3.2. Enable Generative AI
To enable the automatic detection of topics from user interaction:
1. Click on **Generative AI**.
2. Select **Generative (preview)**.
3. Click on **Save** to update the settings.
4. Click on the **Close** icon to go back to the home page of this custom copilot.
![8](\images\03_CopilotUsingSharePointDocuments\8.png)

### Step 4: Create Topics
#### 4.1. Add Topics
Now let’s go ahead and create the topics that will automatically redirect the conversation flow to appropriate topics based on the question user posts. Click on **Topics** from the navigation menu.
![9](\images\03_CopilotUsingSharePointDocuments\9.png)

#### 4.2. Use Copilot to Create Topics
To add the topic, we can either go with the option to create a blank topic or use Copilot to create the topic with an initial set of prepopulated conversation nodes based on the topic description that we provide.
1. Click on **Add a Topic** and
2. Select **Create from description with Copilot**.
![10](\images\03_CopilotUsingSharePointDocuments\10.png)

#### 4.3. Define Topic Description
When the user asks questions regarding the project, we will need a topic that will take the user query and ground the Project information document to provide the contextual answer back to the user. 

To do this, provide the below topic description details in the pop-up that opened when we clicked the Add topic button previously. Then, Click on **Create**, which will provision the topic skeleton based on the provided description.
![11](\images\03_CopilotUsingSharePointDocuments\11.png)

#### 4.4. Configure Generative Answers Node
Thus, we can see that based on the topic description, Copilot has created the trigger and initial questions to be asked to the user.
![12](\images\03_CopilotUsingSharePointDocuments\12.png)

Once we have asked the question and the user inputs the query for which he/she is seeking a response, it is saved to the `UserQuestion` variable. Now let’s add the Generative Answers node by:
1. Selecting the **+ Sign**.
2. Click on **Advanced** and
3. Select **Generative Answers**.
![13](\images\03_CopilotUsingSharePointDocuments\13.png)

#### 4.5. Configure Generative Answers Input
We can now configure the Generative answers node by:
1. Selecting the **right arrow**, which will open the pop-up to select the input to be passed to this action.
2. Select the **Question variable** which contains the user inputted query on the Project.
![14](\images\03_CopilotUsingSharePointDocuments\14.png)

#### 4.6. Configure Data Source
Now let's configure the data source for the Generative answers node:
- Click on **Edit**.
- Select **Add Knowledge**.
![15](\images\03_CopilotUsingSharePointDocuments\15.png)

In the **Add available knowledge sources** pop-up, select **SharePoint and OneDrive**.
![16](\images\03_CopilotUsingSharePointDocuments\16.png)

#### 4.7. Add SharePoint Document Library
Copy the Document Library URL of the SharePoint Site where the project documents are hosted and add it to the **SharePoint or OneDrive link**. Click on **Add**.
![17](\images\03_CopilotUsingSharePointDocuments\17.png)

We can add more SharePoint document repository URLs, if needed, and click on **Add**.
![18](\images\03_CopilotUsingSharePointDocuments\18.png)

#### 4.8. Ground Questions to Selected Documents
To ensure that the questions are grounded only with the configured SharePoint document, we can:
1. Once again, click on **Edit data sources**.
2. Toggle **Search only selected sources**.
3. Check the SharePoint URL.
4. Click on **Save**.
![19](\images\03_CopilotUsingSharePointDocuments\19.png)

#### 4.9. Save Topic
Thus, we have created the topic. However, on Saving, we can see that it throws an authentication error.
![20](\images\03_CopilotUsingSharePointDocuments\20.png)

### Step 5: Configure Manual Authentication
#### 5.1. Create App Registration
This is because for accessing SharePoint documents, we need to configure Manual Authentication whereby we can use Microsoft Entra ID, or any other OAuth2-compatible identity provider to authenticate the user to access SharePoint with the predefined access scopes.

As the first step in configuring manual authentication, let's create the App registration first.

Head over to [Azure Portal](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade) which will open up the Microsoft Entra ID page from which we will select **App registrations** -> **New registration**.
![21](\images\03_CopilotUsingSharePointDocuments\21.png)

This will open up the page where we can:
1. Name the app registration.
2. Specify who can access the app registration ie: whether it is users in the current tenant or external tenant. For this demo, We will mention it as **Accounts in this organizational directory only**.
![22](\images\03_CopilotUsingSharePointDocuments\22.png)

#### 5.2. Update Redirect URI
Next, we need to update the **Redirect URI** in the same page. For this, we will head back to Copilot that we were building to fetch the needed information. Click on **Settings** of the copilot.
![23](\images\03_CopilotUsingSharePointDocuments\23.png)

From the settings page, select **Security** and click on **Authentication**.
![24](\images\03_CopilotUsingSharePointDocuments\24.png)

In the Authentication page:
1. Select **Authenticate manually** and
2. Copy the **Redirect URL** as we will need this in the App Registration process.
![25](\images\03_CopilotUsingSharePointDocuments\25.png)

Head back to the App Registration page, and paste the Redirect URL in the Redirect URI section. Also, select the platform as **Web**. Click on **Register**.
![26](\images\03_CopilotUsingSharePointDocuments\26.png)

#### 5.3. Add API Permissions
The app registration process has created the app object, but we need to do a few more things to ensure that this app can be used to authenticate the user to SharePoint. We can see that below, in the permissions section, **User.Read** is automatically added. But we need to add 2 more permissions as part of this demo.
For this:
1. Select **API Permissions**.
2. Click on **Add a Permission** and
3. Select **Microsoft Graph**.
![27](\images\03_CopilotUsingSharePointDocuments\27.png)

We will first add the permission to access the SharePoint Site. For this:
1. Select **Delegated permissions**.
2. Search for **Sites.Read**.
3. Check the permission **Sites.Read.All**.
![28](\images\03_CopilotUsingSharePointDocuments\28.png)

#### 5.4. Add File Permissions
Next, let's add the permission for accessing the files within SharePoint:
1. Select **Delegated permissions**.
2. Search for **Files.Read**.
3. Check the permission **Files.Read**.
4. Click on **Add Permissions**.
![28_5](\images\03_CopilotUsingSharePointDocuments\27_1.png)

#### 5.5. Grant Admin Consent
The added permissions need to be consented for use with the application. For this:
1. Click on **Grant admin consent for** and
2. Select **Yes**.
![29](\images\03_CopilotUsingSharePointDocuments\29.png)

#### 5.6. Add Client Secret
As part of enabling authentication for the app, let's add the client secret which we will be copying and using in the copilot.
![30](\images\03_CopilotUsingSharePointDocuments\30.png)

Now let's copy the created client secret and head over to the copilot authentication settings.
![31](\images\03_CopilotUsingSharePointDocuments\31.png)

#### 5.7. Configure Copilot Authentication
Paste the Client Secret in the Authentication window of the copilot.
![32](\images\03_CopilotUsingSharePointDocuments\32.png)

You can see above that we also need the client ID of the Azure App that we recently created. Let's go back to the Azure App’s Overview page and copy the Client ID.
![33](\images\03_CopilotUsingSharePointDocuments\33.png)

We will now finally head back to the Copilot studio and paste the Client ID as well in the Authentication page and Click on **Save**.
![34](\images\03_CopilotUsingSharePointDocuments\34.png)

Thus, we have completed the configuration of manual authentication. We can now publish the custom copilot. We will also see that the authentication errors which existed previously in the Generative Answers node have been resolved as we have successfully configured the manual authentication using Azure app registration.
![35](\images\03_CopilotUsingSharePointDocuments\35.png)

### Step 6: Host the Copilot in SharePoint
#### 6.1. Create SharePoint Page
Before we can host the copilot in SharePoint, let's head over to the SharePoint site and create a page where we will add the copilot. Click on **Page**.
![38](\images\03_CopilotUsingSharePointDocuments\38.png)

We can provide a name for the page and click on **Site Information**.
![39](\images\03_CopilotUsingSharePointDocuments\39.png)

Click on **View all site settings**.
![40](\images\03_CopilotUsingSharePointDocuments\40.png)

Select **HTML field security**.
![41](\images\03_CopilotUsingSharePointDocuments\41.png)

Add **copilotstudio.microsoft.com** to the HTML Field security so that iframes from this domain can be embedded in the SharePoint page.
![42](\images\03_CopilotUsingSharePointDocuments\42.png)

#### 6.2. Embed Copilot
Now let's go back to the page and add the **Embed** web part to the page.
![43](\images\03_CopilotUsingSharePointDocuments\43.png)

It gives us the option to add an iframe embed code into the page.
![44](\images\03_CopilotUsingSharePointDocuments\44.png)

We will get the iframe embed code of the copilot from **Channels -> Custom Website -> Copy**.
![45](\images\03_CopilotUsingSharePointDocuments\45.png)

Let's paste the copied code to the embed section within the SharePoint Page. Click on **Publish** to make the page available to everyone.
![46](\images\03_CopilotUsingSharePointDocuments\46.png)

Thus, the copilot is now available for use within the SharePoint page.

### Step 7: Test the Copilot
#### 7.1. Verify Document Processing
Before we proceed with the testing, ensure that the documents have been processed by going to the knowledge tab of the copilot.
![36](\images\03_CopilotUsingSharePointDocuments\36.png)

#### 7.2. Authenticate and Test
Now let’s test the bot by initiating a conversation with the copilot. As the first step, click on **Login** to perform the authentication.
![49](\images\03_CopilotUsingSharePointDocuments\49.png)

Authenticate with the user account.
![50](\images\03_CopilotUsingSharePointDocuments\50.png)

This will generate a bot framework token. Copy the validation code which we will paste into the copilot to complete the authentication handshake.
![51](\images\03_CopilotUsingSharePointDocuments\51.png)

After pasting the validation code, we can continue the conversation with the copilot and ask project-related questions.
![52](\images\03_CopilotUsingSharePointDocuments\52.png)

It will pick the information from the document hosted in SharePoint and provide us with contextual answers.

## Conclusion
Integrating SharePoint with Microsoft Copilot Studio to create a project management copilot can significantly enhance how project information is accessed and utilized. This setup allows for secure, real-time access to project documents, ensuring that stakeholders have the most up-to-date information at their fingertips. By following the steps outlined in this blog, you can create a powerful tool that streamlines project management and decision-making processes. Happy building!
