---
layout: post
title: Automating Team Creation in Microsoft Teams using Copilot, Power Automate, and Microsoft Graph
description: We will see the steps needed to create a Microsfot Teams by accepting inputs through Copilot and leveraging Graph API.
date: 2024-07-22 15:01:35 +0300
image: '/images/FrontImage/06.png'
tags: [copilot]
---

## Table of Contents
{: .no_toc}

* TOC
{: toc}

## Introduction

Efficiently managing the creation of new Teams using a Teams hosted solution can significantly enhance productivity and collaboration. Leveraging the power of Microsoft Copilot combined with Power Automate and Graph API, you can automate this process with ease. This blog will guide you through creating a Copilot in Teams that validates whether a user is a manager and, if so, provisions a new Team based on user input.
 
## Understanding the Workflow

1. **User Interaction**: The user initiates the process by interacting with the Copilot in Microsoft Teams.
2. **Validation**: Copilot checks if the user is a manager using Office 365 actions.
3. **Input Collection**: The user provides the desired Team name and description.
4. **Automation**: If validated as a manager, Copilot triggers a Power Automate flow to create the Team using the Graph API.
5. **Confirmation**: The user receives a confirmation message once the Team is created.

![Provision Copilot](\images\06_CopilotCreateTeam\0_0.png)

## Demo

Watch the demo video below to see how the Teams creation copilot works. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/40WnwpMGX9I?vq=hd1080" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Step-by-Step Guide to Building the Team Creation Copilot

### Step 1: Creating the Copilot in Copilot Studio

Head over to [Copilot Studio](https://copilotstudio.microsoft.com/) and click on **Create**.

![Create Copilot](\images\06_CopilotCreateTeam\1_1.png)

This will provide the option to create a copilot based on an existing template or create a blank copilot from scratch. Let's select **New copilot**.

![New Copilot](\images\06_CopilotCreateTeam\1_2.png)

This will take us to the page where we can:

1. Describe the copilot functionality and provide any specific instructions to the copilot.
2. Once done, click on **Create** to provision the copilot.

![Provision Copilot](\images\06_CopilotCreateTeam\1.png)

### Step 2: Enable Generative Selection of Topics

The copilot is now created. We can then make the needed configuration changes:

1. Click on **Edit**, edit the copilot details like name, icon, and description.
2. Click on **Settings** to enable the **Generative selection of topics** so that without relying on triggers, the topics will be auto-selected based on user conversation resulting in a much smoother user experience.

![Enable Generative Selection](\images\06_CopilotCreateTeam\2.png)

To enable the automatic detection of topics from user interaction:

1. Click on **Generative AI**.
2. Select **Generative (preview)**.
3. Click on **Save** to update the settings.
4. Click on the **Close** icon to go back to the home page of this custom copilot.

![Save Generative Settings](\images\06_CopilotCreateTeam\3.png)

### Step 3: Create Topics

Now let’s go ahead and create the topics that will automatically redirect the conversation flow to appropriate topics based on the question the user posts. Click on **Topics** from the navigation menu.

![Topics Navigation](\images\06_CopilotCreateTeam\4.png)

To add the topic, we can either go with the option to create a blank topic or use Copilot to create the topic with an initial set of prepopulated conversation nodes based on the topic description that we provide.

1. Click on **Add a Topic**.
2. Select **Create from description with Copilot**.

![Add Topic](\images\06_CopilotCreateTeam\5.png)

Provide the topic description details in the pop-up that opened when we clicked the **Add a Topic** button previously. Then, click on **Create**, which will provision the topic skeleton based on the provided description.

![Provide Topic Description](\images\06_CopilotCreateTeam\6.png)

Copilot Studio has created the trigger based on the description of the topic that we gave and, as we have enabled Generative selection of topics, whenever the user starts a conversation, the topics are generatively auto-selected based on the user activity text and the conversation flows to the respective topic.

Based on the topic description, Copilot Studio has also auto-created 2 question nodes that will accept the **Team Name** and **Description** and store them in the variables **TeamName** and **TeamDescription** which we will use down the line for team creation.

![Auto-Generated Nodes](\images\06_CopilotCreateTeam\7.png)

Before we proceed, we will add a condition check just after the trigger node to ensure if the current user is a manager so that we can bring in strong governance on who can create a team to control the team creation process. 

To add an Office 365 Action:

1. Click the **+** sign to add a new node.
2. Select **Call an action**.
3. Click the **Connector** tab and search for **Office 365 actions**.
4. Select **Get my profile (V2)**.

![Add Office 365 Action](\images\06_CopilotCreateTeam\8.png)

It adds the action which will output 30+ User Profile properties of the current user. We will be interested in the **jobTitle** property.

![User Profile Properties](\images\06_CopilotCreateTeam\9.png)

Just after the Office 365 connector, let's add a condition to check if the **jobTitle** is equal to manager.

![Add Condition](\images\06_CopilotCreateTeam\10.png)

In the condition variable check, select the **jobTitle** output from the Office 365 action

![Check Job Title](\images\06_CopilotCreateTeam\11.png)

Compare it against the value **Manager**, If it evaluates to true, we will provide the option for the user to enter the team name and team description

![Check Job Title](\images\06_CopilotCreateTeam\12.png)

### Step 4: Configure Manual Authentication

Before we add the next step of calling Power Automate where we will use Graph API to create the team, we will enable Manual authentication by creating an Azure App registration. This will enable us to generate an authentication token within the copilot which we can pass to Power Automate and use it to authenticate Team Creation Graph API.

To do this, click on **Settings** of the copilot.

![Configure Manual Authentication](\images\06_CopilotCreateTeam\12_5.png)

Let's configure the security settings by:

1. Selecting **Security**.
2. Clicking on **Authentication**.
3. Selecting the **Authenticate manually** option.
4. Copying the **Redirect URL** as we will need it in Azure Portal while registering the app.

![Security Settings](\images\06_CopilotCreateTeam\12_6.png)

Now, head over to Azure Portal’s Entra ID and select **App registrations** -> **New registration**.

![New App Registration](\images\06_CopilotCreateTeam\13.png)

This will open up the page where we can:

1. Name the app registration.
2. Specify who can access the app registration (e.g., users in the current tenant or external tenant). For this demo, we will specify **Accounts in this organizational directory only**.
3. Mention the platform as **Web** and paste the **Redirect URL** copied from Copilot Studio.
4. Click on **Register**.

![Register App](\images\06_CopilotCreateTeam\14.png)

Next, we can add the permissions for the app which will dictate what kind of activities this app can do on the user's behalf.

1. Select **API Permissions**.
2. Click on **Add Permissions**.
3. Select **Microsoft Graph**.

![Add Permissions](\images\06_CopilotCreateTeam\15.png)

Now we can select the specific Graph API permissions needed by the app.

1. Select **Delegated Permissions**.
2. Search for **Team.Create** in the search bar and select it.
3. Click on **Add permissions**.

![Add Graph API Permissions](\images\06_CopilotCreateTeam\16.png)

Now let’s provide the consent for the permissions by clicking on **Grant admin consent**.

![Grant Admin Consent](\images\06_CopilotCreateTeam\17.png)

Next, we will secure the app by adding a client secret.

1. From **Certificates and Secrets**, select **New client secret**.
2. Specify the name and expiry of the certificate.
3. Click on **Add**.

![Add Client Secret](\images\06_CopilotCreateTeam\18.png)

Copy the value of the **client secret** and head back to the copilot that we were creating.

![Copy Client Secret](\images\06_CopilotCreateTeam\19.png)

In Copilot Studio, paste it in the **client secret** section.

![Paste Client Secret](\images\06_CopilotCreateTeam\20.png)

Head back to the Azure Apps overview page and copy the **Application ID**.

![Copy Application ID](\images\06_CopilotCreateTeam\21.png)

Finally, head back to the copilot and paste it in the **Client ID** section and click on **save**.

![Paste Client ID](\images\06_CopilotCreateTeam\22.png)

This will provide us with the bot authentication token which we can pass to Power Automate for Graph API authentication.

### Step 5: Create Power Automate Flow

As the next step, let's create the flow by:

1. Clicking on the **+** to add a new node.
2. Selecting **Call an action**.
3. From **Basic action**, select **Create a flow**.

![Create Flow](\images\06_CopilotCreateTeam\23.png)

This will open up the Power Automate site. Select the **trigger** and add 4 text inputs which will be used in the Team provisioning action.

![Add Text Inputs](\images\06_CopilotCreateTeam\24.png)

Now we will add an **HTTP** action.

1. Click on the **+** Sign to add a new action.
2. Search for **HTTP action**.
3. Click on **HTTP**.

![Add HTTP Action](\images\06_CopilotCreateTeam\25.png)

We will then configure the **HTTP** action with the below parameters:

1. Add the **URI** as: `https://graph.microsoft.com/v1.0/teams`.
2. Method will be **POST**.
3. In the **Body** add the below payload.

```json
{
  "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
  "displayName": "@{triggerBody()?['text']}",
  "description": "@{triggerBody()?['text_1']}",
  "members": [
    {
      "@@odata.type": "#microsoft.graph.aadUserConversationMember",
      "roles": [
        "owner"
      ],
      "user@odata.bind": "https://graph.microsoft.com/v1.0/users('@{triggerBody()?['text_2']}')"
    }
  ],
  "memberSettings": {
    "allowCreateUpdateChannels": true,
    "allowDeleteChannels": true,
    "allowAddRemoveApps": true,
    "allowCreateUpdateRemoveTabs": true,
    "allowCreateUpdateRemoveConnectors": true
  }
}

```


In the **Authentication** section, mention the authentication type as **Raw** and value as **Bearer <<Token Passed from Copilot>>**.

With this, we are done with the Power Automate. Click on **Publish**.

![Publish Flow](\images\06_CopilotCreateTeam\27.png)

Heading back to the copilot, we can now add the newly created flow as an action. Click on **Call an action** and select the flow **Create Team from Copilot**.

![Add Flow Action](\images\06_CopilotCreateTeam\28.png)

We can now configure the input parameters of the flow:

1. The user inputted **Team Name** and **Description** are present in the respective question node variables, pass them as the **First** and **Second** parameter.
2. We also need to pass the **owner email** which we have received from the Office 365 connector. Search for **mail** and select it to pass it as the **third** parameter.

![Configure Input Parameters](\images\06_CopilotCreateTeam\29.png)

The final parameter is the **authentication token** which we can get hold of as we have enabled manual authentication. This is present in the system variable **User.AccessToken** which we can add as the **fourth** parameter.

We will also provide back a **team creation message** back to the user.

![Team Creation Message](\images\06_CopilotCreateTeam\30.png)

Thus, we have completed the creation of the copilot that creates a Microsoft Teams Team leveraging Power Automate and Graph API.

### Step 6: Publish to Microsoft Teams

Now let’s publish the copilot to Teams by going to **Channels** -> **Microsoft Teams** -> **Turn On Teams**.

![Turn On Teams](\images\06_CopilotCreateTeam\31.png)

The Teams channel is now added and we can:

1. Make edits to the copilot Teams icon and other publisher details in the **Edit Details** section.
2. Once done, click on **Availability options** to decide how to distribute the app.

![Edit Details](\images\06_CopilotCreateTeam\32.png)

We can either:

1. Make this available in the Teams app store so that everyone can start using it.
2. Or, if we want to test or use it for ourselves, we can download the zip and upload the package to Teams as a custom app. In our case, we will submit it to the admin for org-wide rollout by clicking on **Show to everyone in my org**.

![Submit for Admin Approval](\images\06_CopilotCreateTeam\33.png)

Click on **Submit for admin approval** so that the app goes to the admin for approval.

![Admin Approval](\images\06_CopilotCreateTeam\34.png)

The admin can head over to [Teams Admin Center](https://admin.teams.microsoft.com/) and find the app for approval. Click on **Publish** to make it available for everyone in the organization.

![Publish App](\images\06_CopilotCreateTeam\35.png)

Users can now access the app by searching for it in the catalog.

![Search App](\images\06_CopilotCreateTeam\36.png)

### Step 7: Test the Copilot

We can start the conversation with the copilot and it will check if the current user is a manager. If so, we can provide the **team name** and **team description**.

![Start Conversation](\images\06_CopilotCreateTeam\37.png)

We can also see that the new team has been created in Teams.

![Team Created](\images\06_CopilotCreateTeam\38.png)

## Conclusion

Automating the creation of Teams within Microsoft Teams can greatly streamline collaboration and enhance productivity across your organization. By leveraging Microsoft Copilot, Power Automate, and the Graph API, this solution provides a seamless and efficient way for managers to set up new Teams with minimal effort. From validating user roles to provisioning Teams and confirming actions, this integrated approach ensures a smooth user experience and strong governance over team creation.
