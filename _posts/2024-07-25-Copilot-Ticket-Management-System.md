---
layout: post
title: Generative AI powered Issue Resolution Copilot leveraging SharePoint and Dataverse
description: We will see the steps needed to create a Microsfot Teams integrated Ticketing system using Copilot, SharePoint and Dataverse.
date: 2024-07-28 15:01:35 +0300
image: '/images/FrontImage/07.png'
tags: [copilot]
---
 
## Table of Contents
{: .no_toc}

* TOC
{: toc}

## Introduction

Providing an efficient and user-friendly way for employees to report issues and seek solutions is vital for maintaining productivity and satisfaction. With Microsoft Copilot, you can build an interactive ticketing system that not only allows users to describe their issues but also suggests possible solutions from a SharePoint knowledge base. If the suggested solutions don’t resolve the issue, the user can create a ticket, which is then stored in Dataverse for further action by the technician.

This blog will guide you through creating a comprehensive ticketing solution using Microsoft Copilot, leveraging SharePoint for knowledge management, and Dataverse for ticket storage.

## Process Flow

In this ticketing system, the process flow is designed to be intuitive and user-friendly. Here's an overview of the entire process:

1. **Issue Reporting:** Users describe their issues to the Copilot integrated in Microsoft Teams.
2. **Knowledge Base Lookup:** Copilot suggests possible solutions from a SharePoint knowledge base using Generative AI.
3. **Ticket Creation:** If the suggested solutions do not resolve the issue, users can create a ticket.
4. **Dataverse Storage:** The created tickets are stored in Dataverse for technicians to access and resolve.
5. **Single Sign-On (SSO):** Ensures seamless user authentication and authorization in Microsoft Teams.

![Create](\images\07_CopilotTickets\0_0.png)

## Demo

Watch the demo video below to see how the Issue Resolution copilot works. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/TgqhVUhfPgc?vq=hd1080" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Step 1: Creating the Copilot in Copilot Studio
Head over to [Copilot Studio](https://copilotstudio.microsoft.com/) and click on **Create**

![Create](\images\07_CopilotTickets\1_1.png)

This will provide us the option to create a copilot based on an existing template or create a blank copilot from scratch. Let's select **New copilot**

![New Copilot](\images\07_CopilotTickets\1_2.png)

This will take us to the page where we can:
1. Describe the copilot functionality and provide any specific instructions to the copilot.
2. Once done, click on **Create** to provision the copilot.

![Provision Copilot](\images\07_CopilotTickets\1.png)

## Step 2: Enable Generative Selection of Topics
The copilot is now created. We can then make the needed configuration changes.

1. Click on **Edit**, edit the copilot details like name, icon, and description. 
2. Click on **Settings** to enable the Generative selection of topics so that without relying on triggers, the topics will be auto-selected based on user conversation resulting in a much smoother user experience.

![Settings](\images\07_CopilotTickets\2.png)

To enable the automatic detection of topics from user interaction:

1. Click on **Generative AI**
2. Select **Generative (preview)**
3. Click on **Save** to update the settings
4. Click on the **Close icon** to go back to the home page of this custom copilot

![Generative AI](\images\07_CopilotTickets\3.png)

## Step 3: Create Topics
Now let’s go ahead and create the topics that will automatically redirect the conversation flow to appropriate topics based on the questions users post.

To add the topic, we can either go with the option to create a blank topic or use Copilot to create the topic with an initial set of prepopulated conversation nodes based on the topic description that we provide.

1. Click on **Topics** from the navigation menu.
2. Click on **Add a Topic** and 
3. Select **Create from description with Copilot**.

![Add Topic](\images\07_CopilotTickets\4.png)

Let’s provide the below topic description details in the pop-up that opened when we clicked the Add topic button previously. Then, click on **Create**, which will provision the topic skeleton based on the provided description.

![Provide Topic Details](\images\07_CopilotTickets\5.png)

Copilot studio has created the trigger based on the description of the topic that we gave. As we have enabled Generative selection of topics, whenever the user starts a conversation, the topics are generatively auto-selected based on the user activity text and the conversation flows to the respective topic.

Based on the topic description, Copilot studio has also auto-created question nodes that will accept the issue response from the user and store it in the variable **Issue** which we will use down the line for issue resolution.

![Issue Response](\images\07_CopilotTickets\6.png)

## Step 4: Configure Generative Answers Node
As the next step, before creating a ticket, we will try to resolve the issue by fetching a solution from the knowledge base document in SharePoint.

For this, we will add the generative answers node:

1. Click on **Advanced**
2. Select **Generative Answers**

![Generative Answers](\images\07_CopilotTickets\7.png)

We will configure the action by first selecting the input and for this, we will pass the **Issue** variable which holds the response from the user for the issue he is facing.

![Configure Action](\images\07_CopilotTickets\8.png)

Next, we will configure the data source from which the generative answers will be fetched. For this: 

1. Select **Edit** 
2. Click on **Add knowledge**

![Add Knowledge](\images\07_CopilotTickets\9.png)

Select **SharePoint and OneDrive**

![SharePoint and OneDrive](\images\07_CopilotTickets\10.png)

Add the SharePoint document library URL that hosts the document and click on **Add**

![Add URL](\images\07_CopilotTickets\11.png)

Thus, we have added the SharePoint knowledge base, however, we will be getting an authentication error in the generative answer node as for accessing SharePoint sources, we need to enable Manual authentication.

![Authentication Error](\images\07_CopilotTickets\12.png)

### Enable Manual Authentication
To resolve this issue, we will enable Manual authentication from Settings.

![Enable Manual Authentication](\images\07_CopilotTickets\13.png)

Let's configure the security settings by:

1. Select **Security** 
2. Click on **Authentication**
3. This will open up the Authentication pane where we can select the **Authenticate manually** option. 
4. Copy the Redirect URL as we will need it in Azure Portal while registering the application.

![Authentication Pane](\images\07_CopilotTickets\15.png)

Now, let's head over to Azure Portal’s Entra ID and select **App registrations -> New registration**

![New Registration](\images\07_CopilotTickets\16.png)

This will open up the page where we can: 
1. Name the app registration 
2. Specify who can access the app registration, i.e., whether it is users in the current tenant or external tenant. For this demo, we will mention it as **Accounts in this organizational directory only**
3. Mention the platform as **Web** and paste the redirect URL copied from Copilot Studio.
4. Click on **Register**.

![Register](\images\07_CopilotTickets\17.png)

Next, we can add the permissions for the app which will dictate what kind of activities this app can do on the user's behalf.

1. Select **API Permissions**
2. Click on **Add Permissions**
3. Select **Microsoft Graph**

![API Permissions](\images\07_CopilotTickets\18.png)

Now we can select the specific Graph API permissions needed by the app:

1. Select **Delegated Permissions**
2. Search for **Sites.Read** in the search bar and select it.

![Sites.Read](\images\07_CopilotTickets\19.png)

Now we have to add the **Files.Read** permission as well, search for it and select it. Click on **Add permissions** to add both the selected permissions to the app.

![Add Permissions](\images\07_CopilotTickets\20.png)

Now we will consent to the added permissions by clicking on **Grant admin consent**

![Grant Admin Consent](\images\07_CopilotTickets\21.png)

Next, we will secure the app by adding a client secret:

1. From **Certificates and Secrets**, select **New client secret**
2. Specify the name and expiry of the certificate and 
3. Click on **Add**

![Add Client Secret](\images\07_CopilotTickets\22.png)

Copy the value of the client secret and head back to the copilot that we were creating.

![Client Secret Value](\images\07_CopilotTickets\23.png)

In the Copilot Studio, paste it in the **Client secret** section.

![Client Secret Section](\images\07_CopilotTickets\24.png)

Head back to the Azure App's overview page and copy the **Application ID**.

![Application ID](\images\07_CopilotTickets\25.png)

Finally, head back to the copilot and paste it in the **Client ID** section and click on **Save**.

![Client ID Section](\images\07_CopilotTickets\26.png)

This will complete the manual authentication settings. We will go back to Azure once again, to enable SSO in some time. We can see that the error in the generative answers node has also been resolved.

![Error Resolved](\images\07_CopilotTickets\27.png)

Now, let's continue with the addition of the remaining logic in the Copilot Studio. Up until now, the user has provided the issue and we are grounding the issue along with the SharePoint-hosted knowledge base to provide an answer back to the user.

So let's ask the user if this answer was helpful. If not, we will allow him to create a ticket.

Let's ask the user the issue resolution status using a basic card. The basic card is configured with an image hosted in Azure Blob and the user response will be saved in the variable **varIssueResolved**.

![Basic Card](\images\07_CopilotTickets\28.png)

Now let's add a condition to check the status of the variable **varIssueResolved**. If it is still a **No**, then we will add an adaptive card to accept further user inputs.

![Adaptive Card](\images\07_CopilotTickets\29.png)

We will use the below adaptive card schema to design the card. Ensure that you select **Edit JSON** and add the adaptive card schema which will in real-time show how the card looks like in the copilot canvas.

![Edit JSON](\images\07_CopilotTickets\30.png)

We can see that in the adaptive card, for each input field that we have added in the card, the value the user inputs is saved into the below output variables. We can now use this information about the issue to create a ticket in the Dataverse table.

![Output Variables](\images\07_CopilotTickets\31.png)

## Step 5: Create a Ticket in Dataverse
To save the user input details, we will now add a Dataverse action:

1. Click on **Call an action**
2. Select **Add a new row to the selected environment** action from the connector action tab.

![Call an Action](\images\07_CopilotTickets\32.png)

We can now populate the input parameters for the Dataverse action:

1. Select the **Environment name** and the **Dataverse table** from the drop-downs.
2. Populate the **issueCategory** input with the Issue category output variable from the previous adaptive card.
3. Populate the **issueDescription** input with the Issue Description output variable from the previous adaptive card.
4. Populate the **priority** input with the Priority output variable from the previous adaptive card.

![Populate Parameters](\images\07_CopilotTickets\33.png)

We will now add one more input which is the **User email ID** of the current user which we can obtain from the **User.Email** system variable that has become available as we enabled manual authentication.

![User Email ID](\images\07_CopilotTickets\34.png)

Thus we have configured the Dataverse action which saves the ticket into the table. We will finally show a success confirmation message using a basic card.

![Success Message](\images\07_CopilotTickets\35.png)

## Step 6: Configure Single Sign On
To ensure that the current logged-in user's context is taken for seamless single sign-on, we will have to update the Azure App Registration.

To do this, let's enable the **Teams Channel**:

1. Select **Channels -> Microsoft Teams**
2. Click on **Turn on Teams**

![Turn on Teams](\images\07_CopilotTickets\36.png)

Click on **Edit Details** and you can make changes to the Teams App icon, publisher details, etc.

![Edit Details](\images\07_CopilotTickets\37.png)

As you go down in the **Edit Details** pane, you will see the **App ID**, copy it as we will need to update it in the app registration.

![App ID](\images\07_CopilotTickets\38.png)

Now let's head back to the Azure App that we registered earlier:

1. Select **Expose an API**
2. Next to **Application ID URI**, click on **Add**
3. In the **Application ID URI** field, enter **api://botid-{teamsbotid}** and replace **{teamsbotid}** with the Teams channel app ID that we copied from Copilot Studio.
4. Click on **Save**

![Application ID URI](\images\07_CopilotTickets\39.png)

Now let's define a custom scope for the copilot:

1. Select the **Expose an API** section
2. Click on **Add a scope**
3. In the right pane, update the fields as per the table below:

| Scope name           | Ticket.Create                   |
|----------------------|---------------------------------|
| Who can consent?     | Select Admins and users         |
| Admin consent display name | Ticket.Create Test.Read     |
| Admin consent description  | Allows the app to log in the user to Teams |
| State                | Enabled                         |

4. Click on **Add Scope**

![Add Scope](\images\07_CopilotTickets\40.png)

Now let's add the authorized client applications which means that the API trusts the application and users should not be asked to consent when the client calls this API. In our case, we will first add the Microsoft Teams mobile/desktop, which has ID **1fec8e78-bce4-4aaf-ab1b-5451cc387264**.

1. Click on **Add a client application**
2. Enter the **Client ID** as **1fec8e78-bce4-4aaf-ab1b-5451cc387264**
3. Select the previously created scope
4. Click on **Add Application**

![Add Client Application](\images\07_CopilotTickets\41.png)

We will add the Microsoft Teams on the web as well to the authorized applications list which has the client id **5e3ce6c0-2b1f-4285-8d4b-75ee78787346**.

1. Click on **Add a client application**
2. Enter the **Client ID** as **5e3ce6c0-2b1f-4285-8d4b-75ee78787346**
3. Select the previously created scope
4. Click on **Add Application**

![Add Web Application](\images\07_CopilotTickets\42.png)

Now we will also add the API permissions so that the application can read user profiles.

1. Select **API Permissions**
2. Click on **Add Permission**
3. Select **Microsoft Graph**
4. Click on **Delegated Permissions**
5. Select **openid** and **profile**
6. Click on **Add permission**
7. Finally consent to the permissions by selecting **Grant Admin Consent**

![Grant Admin Consent](\images\07_CopilotTickets\43.png)

From the **Expose an API** section, copy the scope URL as we will have to paste it as a token exchange URL in Copilot.

![Scope URL](\images\07_CopilotTickets\44.png)

In the Copilot Studio settings, select **Security -> Authentication** and paste the scope URL in the **Token Exchange URL** field. Click on **Save**.

![Token Exchange URL](\images\07_CopilotTickets\45.png)

To add SSO to your copilot's Microsoft Teams channel, select **Channels -> Microsoft Teams** and click on **Edit details**. 

In the **Edit Details** pane, as we go down, we can see that there is an **AAD application's client ID** and **Resource URI**, both of which we will get from the Azure App that we registered.

![Edit Details](\images\07_CopilotTickets\46.png)

Let's go to the overview page of the Azure app and select these values.

![Overview Page](\images\07_CopilotTickets\47.png)

We will paste them in the respective field in the **Edit Details** section of the Teams Channel. Click on **Save**.

![Edit Details Save](\images\07_CopilotTickets\48.png)

Let's publish the copilot and click on **Availability Options**.

![Availability Options](\images\07_CopilotTickets\49.png)

We can either make this available in the Teams app store so that everyone can start using it or if we want to test or use for self, we can download the zip and upload the package to Teams as a custom app. In our case, we will submit it to the admin for org-wide rollout by clicking on **Show to everyone in my org**.

![Submit for Admin Approval](\images\07_CopilotTickets\50.png)

Click on **Submit for admin approval** which will make this app available in the Teams admin center for admin approval.

![Admin Approval](\images\07_CopilotTickets\51.png)

The app has become available, let's publish it.

![Publish App](\images\07_CopilotTickets\52.png)

Once published, we can access it from the Teams App Store. Lets start the conversation with the copilot and mention the issue we are facing. 

![Teams App Store](\images\07_CopilotTickets\54.png)

It has provided us with a possible resolution by checking the SharePoint knowledge base using Generative Answers. But since we found that as an inadequate solution, we will go ahead and raise a ticket using the adaptive card where we will provide further details to create the ticket.

![Raise Ticket](\images\07_CopilotTickets\55.png)

On clicking the **Submit** in the adaptive card, it will take the details and create a record in Dataverse and provide us with a success message.

![Success Message](\images\07_CopilotTickets\56.png)

When we check the Dataverse back end, we can see the ticket entry has been created and we can extend the implementation by building a Power App with this table as the back end for the technicians to work and update the ticket.

![Dataverse](\images\07_CopilotTickets\57.png)

## Conclusion
Implementing an end-to-end ticketing solution with Microsoft Copilot, SharePoint, and Dataverse offers a streamlined and user-friendly way to manage issue reporting and resolution. This integration leverages the strengths of Copilot’s Generative AI powered conversational capabilities, SharePoint’s robust knowledge base, and Dataverse’s powerful data management features. By following the steps outlined in this guide, you can create a seamless process where users can describe their issues, receive potential solutions, and create tickets if necessary—all within the familiar Microsoft Teams environment.
