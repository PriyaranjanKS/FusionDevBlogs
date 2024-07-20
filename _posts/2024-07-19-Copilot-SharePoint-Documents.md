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

1. **Collect and Organize Documents**:
    - Gather all relevant project documents, such as estimates, timelines, milestones, and other key details.
    - Ensure that the document is well-structured, with clear sections and headings to facilitate easier parsing by the copilot.
    - In our case, we have a software development project document which contains the estimates and key timelines for the project.
    ![1](\images\03_CopilotUsingSharePointDocuments\1.jpg)

2. **Upload Documents to SharePoint**:
    - Create a dedicated document library in SharePoint for your project files.
    - Upload the collected documents to this library.
    ![2](\images\03_CopilotUsingSharePointDocuments\2.jpg)

### Step 2: Create the Custom Copilot

1. **Create a New Copilot**:
    - Head over to [Copilot Studio](https://copilotstudio.microsoft.com/) and click on **Create**.
    ![3](\images\03_CopilotUsingSharePointDocuments\3.png)
    - Select **New copilot**.
    ![4](\images\03_CopilotUsingSharePointDocuments\4.png)
    - Describe the copilot functionality and provide any specific instructions to the copilot.
    - Click on **Create** to provision the copilot.
    ![5](\images\03_CopilotUsingSharePointDocuments\5.png)

2. **Enable Generative Selection of Topics**:
    - Click on **Edit**, edit the copilot details like name, icon, and description.
    - Click on **Settings** to enable the Generative selection of topics.
    ![7](\images\03_CopilotUsingSharePointDocuments\7.png)
    - Click on **Generative AI**.
    - Select **Generative (preview)**.
    - Click on **Save** to update the settings.
    ![8](\images\03_CopilotUsingSharePointDocuments\8.png)

### Step 3: Create Topics

1. **Add Topics**:
    - Click on **Topics** from the navigation menu.
    ![9](\images\03_CopilotUsingSharePointDocuments\9.png)
    - Click on **Add a Topic** and select **Create from description with Copilot**.
    ![10](\images\03_CopilotUsingSharePointDocuments\10.png)
    - Provide the topic description details and click on **Create**.
    ![11](\images\03_CopilotUsingSharePointDocuments\11.png)
    - Add the Generative Answers node by selecting the **+ Sign**, clicking on **Advanced**, and selecting **Generative Answers**.
    ![13](\images\03_CopilotUsingSharePointDocuments\13.png)
    - Configure the Generative answers node by selecting the **right arrow** and choosing the **Question variable**.
    ![14](\images\03_CopilotUsingSharePointDocuments\14.png)

2. **Configure Data Source**:
    - Click on **Edit**.
    - Select **Add Knowledge**.
    ![15](\images\03_CopilotUsingSharePointDocuments\15.png)
    - In the **Add available knowledge sources** pop-up, select **SharePoint and OneDrive**.
    ![16](\images\03_CopilotUsingSharePointDocuments\16.png)
    - Copy the Document Library URL of the SharePoint Site and add it to the **SharePoint or OneDrive link**. Click on **Add**.
    ![17](\images\03_CopilotUsingSharePointDocuments\17.png)
    - Toggle **Search only selected sources**, check the SharePoint URL, and click on **Save**.
    ![19](\images\03_CopilotUsingSharePointDocuments\19.png)
    - Save the topic.

### Step 4: Configure Manual Authentication

1. **Create App Registration**:
    - Head over to [Azure Portal](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade) and select **App registrations** -> **New registration**.
    ![21](\images\03_CopilotUsingSharePointDocuments\21.png)
    - Name the app registration and specify who can access it.
    ![22](\images\03_CopilotUsingSharePointDocuments\22.png)

2. **Update Redirect URI**:
    - Click on **Settings** of the copilot and select **Security** -> **Authentication**.
    ![23](\images\03_CopilotUsingSharePointDocuments\23.png)
    - Select **Authenticate manually** and copy the **Redirect URL**.
    ![25](\images\03_CopilotUsingSharePointDocuments\25.png)
    - Paste the Redirect URL in the App Registration page and click on **Register**.
    ![26](\images\03_CopilotUsingSharePointDocuments\26.png)

3. **Add API Permissions**:
    - Select **API Permissions** -> **Add a Permission** -> **Microsoft Graph**.
    ![27](\images\03_CopilotUsingSharePointDocuments\27.png)
    - Add **Sites.Read.All** and **Files.Read** permissions.
    ![28](\images\03_CopilotUsingSharePointDocuments\28.png)
    - Click on **Grant admin consent for** and select **Yes**.
    ![29](\images\03_CopilotUsingSharePointDocuments\29.png)

4. **Add Client Secret**:
    - Add the client secret in the Azure portal and copy it.
    ![30](\images\03_CopilotUsingSharePointDocuments\30.png)
    - Paste the Client Secret and Client ID in the Copilot authentication settings and click on **Save**.
    ![34](\images\03_CopilotUsingSharePointDocuments\34.png)

### Step 5: Host the Copilot in SharePoint

1. **Create SharePoint Page**:
    - Create a new page in SharePoint.
    ![38](\images\03_CopilotUsingSharePointDocuments\38.png)

2. **Embed Copilot**:
    - Add **copilotstudio.microsoft.com** to HTML Field security settings.
    ![42](\images\03_CopilotUsingSharePointDocuments\42.png)
    - Add the **Embed** web part to the page and paste the copilot iframe embed code.
    ![46](\images\03_CopilotUsingSharePointDocuments\46.png)

### Step 6: Test the Copilot

1. **Verify Document Processing**:
    - Ensure documents have been processed by checking the knowledge tab of the copilot.
    ![36](\images\03_CopilotUsingSharePointDocuments\36.png)

2. **Authenticate and Test**:
    - Click on **Login** to perform the authentication.
    ![49](\images\03_CopilotUsingSharePointDocuments\49.png)
    - Authenticate with the user account and copy the validation code.
    ![51](\images\03_CopilotUsingSharePointDocuments\51.png)
    - Continue the conversation with the copilot and ask project-related questions.
    ![52](\images\03_CopilotUsingSharePointDocuments\52.png)

## Conclusion
Integrating SharePoint with Microsoft Copilot Studio to create a project management copilot can significantly enhance how project information is accessed and utilized. This setup allows for secure, real-time access to project documents, ensuring that stakeholders have the most up-to-date information at their fingertips. By following the steps outlined in this blog, you can create a powerful tool that streamlines project management and decision-making processes. Happy building!
