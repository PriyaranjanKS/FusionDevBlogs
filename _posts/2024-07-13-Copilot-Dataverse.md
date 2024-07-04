---
layout: post
title: Building a Pharmacy Assistant Copilot with Microsoft Copilot Studio and Dataverse
description: Let's walk through the steps to create a Pharmacy Assistant Copilot with Dataverse.
date: 2024-07-09 15:01:35 +0300
image: '\images\04_CopilotUsingDataverse\00.png'
tags: [Copilot Studio]
---

## Introduction 

In the pharmacy domain, having instant access to detailed information about medications is crucial. A Pharmacy Assistant Copilot, capable of answering complex queries regarding drug pricing, effects on pre-existing conditions, and generic names, can significantly enhance efficiency and accuracy. This copilot leverages a secure Dataverse backend to access enterprise data directly, ensuring reliable and comprehensive information for every query.

In this blog, we will walk through the process of building such a copilot using Microsoft Copilot Studio, leveraging the generative answers capability and Dataverse for seamless data retrieval.

## Table of Contents
- [Step 1: Setting Up Your Environment](#step-1-setting-up-your-environment)
- [Step 2: Preparing Your Data in Dataverse](#step-2-preparing-your-data-in-dataverse)
- [Step 3: Creating the Copilot in Copilot Studio](#step-3-creating-the-copilot-in-copilot-studio)
- [Step 4: Enable Generative Selection of Topics (Dynamic Chaining)](#step-4-enable-generative-selection-of-topics-dynamic-chaining)
- [Step 5: Create Topics](#step-5-create-topics)
- [Step 6: Authentication](#step-6-authentication)
- [Step 7: Publish to Power Pages](#step-7-publish-to-power-pages)
- [Step 8: Test the Copilot](#step-8-test-the-copilot)
- [Conclusion](#conclusion)

## Step 1: Setting Up Your Environment

Before you start creating the copilot, ensure you have the following prerequisites:
- Microsoft Copilot Studio access.
- Dataverse environment with your enterprise data.

## Step 2: Preparing Your Data in Dataverse

Ensure your Dataverse instance contains all necessary information about medications, including unit prices, generic names, effects on pre-existing conditions, etc. We have created a Dataverse table with the below fields:
- ProductName
- ProductDescription
- GenericName
- EffectedPreConditions
- UnitPrice

![Dataverse Table](\images\04_CopilotUsingDataverse\1.png)

## Step 3: Creating the Copilot in Copilot Studio

Head over to [Microsoft Copilot Studio](https://copilotstudio.microsoft.com/) and click on **Create**.

![New Copilot](\images\04_CopilotUsingDataverse\1_5.png)

This will provide the option to create a copilot based on an existing template or create a blank copilot from scratch. Let's select **New copilot**.

![Blank Copilot](\images\04_CopilotUsingDataverse\1_6.png)

This will take you to the page where you can:
1. Describe the copilot functionality and provide any specific instructions to the copilot.
2. Once done, click on **Create** to provision the copilot.

<img src="\images\04_CopilotUsingDataverse\2.png" alt="Creating Copilot" width="80%">


## Step 4: Enable Generative Selection of Topics (Dynamic Chaining)

The copilot is now created. You can then make the needed configuration changes.
1. Click on **Edit** to edit the copilot details like name, icon, and description.
2. Click on **Settings** to enable the Generative selection of topics so that without relying on triggers, the topics will be auto-selected based on user conversation, resulting in a much smoother user experience.

![Edit Copilot](\images\04_CopilotUsingDataverse\3.png)

To enable the automatic detection of topics from user interaction:
1. Click on **Generative AI**.
2. Select **Generative (preview)**.
3. Click on **Save** to update the settings.
4. Click on the **Close icon** to go back to the home page of this custom copilot.

![Generative AI](\images\04_CopilotUsingDataverse\4.png)

## Step 5: Create Topics

Now let’s go ahead and create the topics that will automatically redirect the conversation flow to appropriate topics based on the question user posts. Click on **Topics** from the navigation menu.

![Topics](\images\04_CopilotUsingDataverse\5.png)

To add the topic, we can either go with the option to create a blank topic or use Copilot to create the topic with an initial set of prepopulated conversation nodes based on the topic description that we provide.
1. Click on **Add a Topic**.
2. Select **Create from description with Copilot**.

![Add Topic](\images\04_CopilotUsingDataverse\6.png)

When the user asks questions regarding the medicine, we will need a topic that will take the user query and ground the medicine-related information in the Dataverse and provide the contextual answer back to the user.
To do this, provide the below topic description details in the pop-up that opened when we clicked the Add topic button previously. Then, click on **Create**, which will provision the topic skeleton based on the provided description.

![Topic Description](\images\04_CopilotUsingDataverse\7.png)

Thus, we have the basic topic created with an automatic trigger that is generated using the description provided. We can now add more conversation nodes.

![Topic Nodes](\images\04_CopilotUsingDataverse\8.png)

Now let’s add the Generative Answers node by:
1. Selecting the **+ Sign**.
2. Click on **Advanced**.
3. Select **Generative Answers**.

![Generative Answers](\images\04_CopilotUsingDataverse\9.png)

We can now configure the Generative Answers node by:
1. Clicking the **Right Arrow**.
2. Select **System** from the Select a variable pane.
3. Select **Activity.Text** which will contain the text that the user had inputted to initiate the conversation which is most likely the question about a medicine.

![Activity Text](\images\04_CopilotUsingDataverse\10.png)

Now let's configure the data source for the Generative answers node:
- Click on **Edit**.
- Select **Add Knowledge**.

![Add Knowledge](\images\04_CopilotUsingDataverse\11.png)

In the Add available knowledge sources pop-up, select **Dataverse**.

![Select Dataverse](\images\04_CopilotUsingDataverse\12.png)

In the next window, we can:
1. Search for the Dataverse table from which we want the copilot to ground the data. In our case, it is **MedicineInformation**.
2. Select the table.
3. Click on **Next**.

![Select Table](\images\04_CopilotUsingDataverse\13.png)

It will preview the table data, click on **Next**.

![Preview Table](\images\04_CopilotUsingDataverse\14.png)

To improve the data retrieval accuracy based on the user question, we have the option to provide synonyms or alternate names for the table columns. Click on **Edit**.

![Edit Synonyms](\images\04_CopilotUsingDataverse\15.png)

Here we can provide the column synonyms as well as the detailed description of what kind of data each column holds.

![Column Details](\images\04_CopilotUsingDataverse\16.png)

Once you have added the details, click on **Back**.

![Back Button](\images\04_CopilotUsingDataverse\17.png)

We can also add domain-specific terms and their meanings to make the grounding process more relevant by adding the information in the glossary section.

![Glossary Section](\images\04_CopilotUsingDataverse\18.png)

We added a few pharmacy-related glossary items. Once done, click on **Back**.

![Glossary Items](\images\04_CopilotUsingDataverse\19.png)

Finally, click on **Add** to finalize the data source.

![Add Data Source](\images\04_CopilotUsingDataverse\20.png)

Thus, the Generative answers node is configured. To ensure that the questions are grounded only with the configured Dataverse table, we can:
1. Once again, click on **Edit** data sources.
2. Toggle **Search only selected sources**.
3. Check the Dataverse table which we added recently.
4. Click on **Save**.

![Save Data Source](\images\04_CopilotUsingDataverse\21.png)

Thus, we have created the topic and the basic pharmacy assistant is all ready to be tested.

## Step 6: Authentication

We will embed the Copilot in the Power Pages Channel as part of an end-to-end integration. To do this, we need to enable manual authentication from the **Settings** section.

![Settings](\images\04_CopilotUsingDataverse\29.png)

Select **Authentication** from the Security tab.

![Authentication](\images\04_CopilotUsingDataverse\30.png)

In the Authentication page:
1. Select **Authenticate manually**.
2. Copy the **Redirect URL** as we will need this when we create the app registration in Azure.

![Redirect URL](\images\04_CopilotUsingDataverse\31.png)

### Create App Registration

Head over to [Microsoft Entra ID](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade), which will open up the Microsoft Entra ID page. Select **App registrations** -> **New registration**.

![App Registration](\images\04_CopilotUsingDataverse\31_5.png)

This will open up the page where you can:
1. Name the app registration.
2. Specify who can access the app registration (e.g., users in the current tenant or external tenant). For this demo, select **Accounts in this organizational directory only**.
3. In Redirect URI, select the platform as **Web** and paste the URL that we had copied from Copilot studio in the field next to it.
4. Click on **Register**.

![Register App](\images\04_CopilotUsingDataverse\32.png)

The app registration process has created the app object, but we need to do a few more things to ensure that this app can be used to authenticate the user to Dataverse.

To grant the Dataverse API permission to the app:
1. Select **API Permissions**.
2. Click on **Add a Permission**.
3. Select **APIs my organization uses**.
4. Search for **Dataverse** in the search bar.
5. Select the **Dataverse** API.

![API Permissions](\images\04_CopilotUsingDataverse\33.png)

Select **user_impersonation** and click on **Add permissions**.

![Add Permissions](\images\04_CopilotUsingDataverse\34.png)

Next, we need to create a client secret by:
1. Selecting **Certificates & secrets**.
2. Clicking on **New client secret**.
3. Specifying the description and expiry of the secret.
4. Clicking on **Add** which will create a new secret value.

![Client Secret](\images\04_CopilotUsingDataverse\35.png)

Copy the secret value and head over to the Authentication page of Copilot.

![Copy Secret](\images\04_CopilotUsingDataverse\36.png)

Paste the secret in the client secret field of the authentication page. We need to add the client ID as well.

![Client Secret Field](\images\04_CopilotUsingDataverse\37.png)

Head back to the Overview page of the Azure app that we registered recently and copy the **Application ID**.

![Application ID](\images\04_CopilotUsingDataverse\38.png)

Finally, head back to the copilot and paste the client ID. Click on **Save** to complete the authentication configuration.

![Save Authentication](\images\04_CopilotUsingDataverse\39.png)

## Step 7: Publish to Power Pages

Let’s publish the Copilot and select the embed code from **Channels** -> **Custom Website** -> **Copy**.

![Publish Copilot](\images\04_CopilotUsingDataverse\40.png)

Head over to the Power Pages site and add the above copied embed code to the HTML of the site.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Pharmacy Assistant Copilot</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
  <!-- Copilot embed code here -->
</body>
</html>

The CSS used for the site is also given below in case you want to try it out.

```css
/* Add your CSS here */

You can open the page in VSCode using the **Edit Code** option.

Add the above HTML and CSS to the VS Code and save it.

Now head back to the Power Pages site and sync it for the changes to be reflected.

## Step 8: Test the Copilot

Click on **Preview** -> **Desktop** to test the added copilot in the Power Pages site.

This will open up the page and you will see that the Copilot component has come up on the page.

Let’s initiate the conversation and ask a few pharmacy-related questions.

## Conclusion

By following these steps, we’ve successfully built a robust Pharmacy Assistant Copilot that seamlessly integrates with Dataverse and delivers accurate, real-time medication information. Using Power Pages, we can easily embed this Copilot into a user-friendly website, making it accessible to healthcare professionals. This integration showcases the potential of combining generative AI with enterprise data and web platforms, enhancing decision-making and improving patient outcomes in the rapidly evolving healthcare industry.
