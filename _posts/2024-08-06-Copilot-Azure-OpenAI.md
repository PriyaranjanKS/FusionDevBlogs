---
layout: post
title:  Power Apps FAQ Copilot built using Azure AI Search and Azure Open AI
description: Learn how to build a Power Apps FAQ Copilot by integrating Azure AI Search and Azure OpenAI within Microsoft Copilot Studio. This guide walks you through connecting and configuring these services to create intelligent, context-driven copilots that provide accurate answers from official Power Apps documentation
date: 2024-08-13 15:01:35 +0300
image: '/images/FrontImage/11.png'
tags: [copilot]
---

## Table of Contents
{: .no_toc}

* TOC
{: toc}

## Introduction
Connecting data through Azure OpenAI Service within Microsoft Copilot Studio enables your Copilots to utilize Azure resources effectively via the Generative Answers node. Leveraging the robust capabilities of Azure AI Search and Azure OpenAI, these copilots can deliver responses that are both contextually relevant and compliant with your organization's guidelines.
In this blog we will see how to create a Power Apps FAQ copilot utilizing the official Microsoft PowerApps documentation PDF and leveraging the Azure AI Search and Azure Open AI.

### Process Flow Explanation

The overall process flow that we will see in this explanation is as follows : 

1. **Power Apps Documentation** : **PDF** is uploaded to **Azure Storage account**
2. **Index the Document** : **Azure AI Search** indexes the document for easy retrieval
3. **User Interaction**: A **user** initiates a **query** related to Power Apps via the Copilot interface.
4. **Copilot Processing**: The Copilot captures the user's query and passes it as a **prompt** to the **Azure OpenAI**, which is configured as a datasource.
5. **Grounding** :  **Azure OpenAI** processes the query using its generative capabilities, accessing the **indexed Power Apps documentation** stored in Azure AI Search.
6. **User Display**: The **Copilot** displays the **contextual response to the user**, providing accurate and detailed answers to their Power Apps-related queries.

This integration allows users to get precise answers to their queries by leveraging the power of Azure's AI services, making it a valuable tool for enhancing productivity and knowledge access.

![Download Power Apps Documentation](\images\11_CopilotOpenAI\0_0.gif)

## Demo

Watch the demo video below to see how the Power Apps FAQ Copilot works. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/ukmZUNxCeIs?vq=hd1080" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Prerequisites
If you are intending to implement, ensure you have the following:
- An active **Azure subscription**.
- Access to **Microsoft Copilot Studio**.
- **Power Apps Documentation PDF** from Microsoft Learn site.

## Step-by-Step Implementation

### Step 1: Download the Power Apps Documentation
Head over to the **Power Apps Documentation** and download the **PDF**. We will index it using the Azure search service and use it to generate contextual answers to user queries around Power Apps. 

![Download Power Apps Documentation](\images\11_CopilotOpenAI\0.png)

### Step 2: Create an Azure AI Search Instance
1. **Navigate to the Azure Portal**: Log in to the Azure portal, search for "AI Search," and select the service.
   ![Navigate to AI Search](\images\11_CopilotOpenAI\1.png)
2. **Create a New Search Service**: Click on **Create** to start setting up a new search service.
   ![Create New Search Service](\images\11_CopilotOpenAI\2.png)
3. Fill in the necessary details like resource group, service name, location, and pricing tier. Once you've filled in the details, review your configurations and click **Create**.
   ![Fill in Details](\images\11_CopilotOpenAI\3.png)
4. After a while, the search instance will be provisioned and available for use.
   ![Search Instance Provisioned](\images\11_CopilotOpenAI\4.png)

### Step 3: Add Blob Storage and Create an Indexer
1. **Set Up Azure Blob Storage**: Navigate to the **Storage Accounts** in the Azure portal and click on **Create** to add a new storage account.
   ![Setup Blob Storage](\images\11_CopilotOpenAI\5.png)
2. Fill in the necessary details like resource group, storage account name, region, and performance. Click on **Create** to provision the storage account.
   ![Provision Storage Account](\images\11_CopilotOpenAI\6.png)
3. Once the storage account is created, head over to this resource and click on **Container** to create a new container to store the Power Apps PDF.
   ![Create Container](\images\11_CopilotOpenAI\7.png)
4. Click on **Container**, specify the container name, and click on **Create** to add the new container to the storage account.
   ![Specify Container Name](\images\11_CopilotOpenAI\8.png)
5. Inside the container, click on **Browse for files** to add the Power Apps documentation PDF downloaded earlier. Click on **Upload**.
   ![Upload PDF](\images\11_CopilotOpenAI\9.png)
6. Navigate back to the Azure search instance that we created to index this PDF document. From the AI Search Overview page, click on **Import data**.
   ![Import Data](\images\11_CopilotOpenAI\10.png)
7. In the **Connect your data** tab, select **Azure Blob Storage**.
   ![Select Blob Storage](\images\11_CopilotOpenAI\11.png)
8. Specify a name for the datasource and click on **Choose an existing connection** to connect to the container within the storage account.
   ![Choose Existing Connection](\images\11_CopilotOpenAI\12.png)
9. Select the appropriate container and click on **Select**.
   ![Select Container](\images\11_CopilotOpenAI\13.png)
10. The connection string is automatically added for this container. Click on **Next: Add Cognitive Skills**. This is optional and will be skipped for now.
    ![Connection String Added](\images\11_CopilotOpenAI\14.png)
11. Ensure the content field of the indexer is marked as **Retrievable** and **Searchable**. Click on **Create an Indexer** to create the index.
    ![Create Indexer](\images\11_CopilotOpenAI\15.png)
12. The indexer is now created, and we can connect this to Azure OpenAI for generative features.

### Step 4: Create Azure OpenAI Instance
1. **Navigate to Azure OpenAI**: Head over to Azure, search for Azure OpenAI, and select the service.
   ![Search Azure OpenAI](\images\11_CopilotOpenAI\16.png)
2. Click on **Create**.
   ![Create OpenAI Instance](\images\11_CopilotOpenAI\17.png)
3. Specify the values for Resource Group, Name, and Pricing tier. Click on **Next** for network-specific configurations. Finally, click on **Create** on the review page.
   ![Specify Details](\images\11_CopilotOpenAI\18.png)
4. The Azure OpenAI Instance is now created. Click on **Go to Azure OpenAI Studio** where we can configure and connect the OpenAI Instance with the Azure Search indexer.
   ![Go to OpenAI Studio](\images\11_CopilotOpenAI\19.png)
5. In Azure OpenAI Studio, create a model deployment. From the Chat section, click on **Create new deployment**.
   ![Create Model Deployment](\images\11_CopilotOpenAI\20.png)
6. Specify the model type (e.g., gpt-4), mention the name, and click on **Create**.
   ![Specify Model Type](\images\11_CopilotOpenAI\21.png)
7. The model is deployed. In the chat playground, click on **Add your data** to connect to the search index.
   ![Model Deployed](\images\11_CopilotOpenAI\22.png)
8. Select the data source.
   ![Select Data Source](\images\11_CopilotOpenAI\23.png)
9. In the opened pop-up:
   - Select the data source as **Azure AI Search**.
   - Mention the Search Instance and Search Index created earlier.
   - Click on **Next**.
   ![Configure Data Source](\images\11_CopilotOpenAI\25.png)
10. In the Data Management section, enable **Keyword search**. Semantic search is also an option that can be configured.
    ![Enable Keyword Search](\images\11_CopilotOpenAI\28.png)
11. Select **API Key** as the Azure resource authentication type. Click on **Next**.
    ![Select API Key](\images\11_CopilotOpenAI\26.png)
12. Finally, click on **Save and close** to finalize the data source setup.
    ![Save and Close](\images\11_CopilotOpenAI\29.png)
13. Test the Azure OpenAI playground, which has its data source as Azure AI Search. For example, ask about Power Apps offline functionality, and it will fetch detailed contextual answers from the Azure AI search index.
    ![Test OpenAI Playground](\images\11_CopilotOpenAI\30.png)

### Step 5: Integrate Copilot with Azure OpenAI Instance
1. **Deploy to Copilot Studio**: Click on **Deploy to** and select **A new copilot in Copilot Studio**.
   ![Deploy to Copilot Studio](\images\11_CopilotOpenAI\31.png)
2. Select **Continue in Copilot Studio**, which will take us to Copilot Studio to continue with the copilot creation.
   ![Continue in Copilot Studio](\images\11_CopilotOpenAI\32.png)
3. Specify the copilot name and click on **Create**.
   ![Specify Copilot Name](\images\11_CopilotOpenAI\33.png)
4. This initializes the copilot, which is already connected to the Azure OpenAI Instance.
   ![Copilot Initialized](\images\11_CopilotOpenAI\34.png)
5. Head over to topics and select the **Conversational boosting system** topic.
   ![Select Conversational Boosting System](\images\11_CopilotOpenAI\35.png)
6. It contains a **Generative answers node** preconfigured with the Azure OpenAI instance set up earlier.
   ![Generative Answers Node](\images\11_CopilotOpenAI\36.png)
7. Click on the connection properties. Under the **General** tab, you can see the model details and parameters used for generating answers.
   ![General Tab](\images\11_CopilotOpenAI\37.png)
8. In the **Model data** tab, you can see the Azure AI Search data source and the field from which the data is grounded.
   ![Model Data Tab](\images\11_CopilotOpenAI\38.png)
9. The copilot is auto-configured and connected to the Azure OpenAI instance, which is internally connected with the Azure AI Search Instance.

### Step 6: Publish the Bot
1. We can publish the bot to different channels. For now, deploy it to Teams.
   ![Deploy to Teams](\images\11_CopilotOpenAI\40.png)
2. Head over to **Channels -> Microsoft Teams -> Turn on Teams**.
   ![Turn on Teams](\images\11_CopilotOpenAI\41.png)
3. Click on **Availability Options** to choose how to distribute the app in Teams.
   ![Availability Options](\images\11_CopilotOpenAI\42.png)
4. You can either deploy it to the app store through admin approval or upload the app as a zip and use it as a personal app.
   ![Deploy Options](\images\11_CopilotOpenAI\43.png)
5. The app becomes available in the Teams admin centre, and the admin can now publish it for org-wide use.
   ![App in Teams Admin Centre](\images\11_CopilotOpenAI\44.png)
6. Access the app from the Teams App Store and start a conversation. Ask anything about Power Apps, and the copilot will fetch contextual answers from the grounded Power Apps Documentation PDF and provide responses.
   ![Access App in Teams](\images\11_CopilotOpenAI\45.png)

Thus we have completed the implementation and demo of a scalable Copilot that can leverage Azure AI search and Azure Open AI to provide us with contextual answers for our questions. 

### Alternate Approach : Power Apps Documentation as Local Datasource 

So far we explored how we can build a scalable Copilot using Azure AI search Index as the primary data source. Now lets see how we can implement the same using the native local datasource approach in Copilot. For this we can upload the same Power Apps PDF documentation as a Local File Knowledge base : 
![Access App in Teams](\images\11_CopilotOpenAI\46.png)

Once uploaded, depending on the size, the processing time varies and once ready we can see the status in the Knowledge section 
![Access App in Teams](\images\11_CopilotOpenAI\47.png)

We can now create a new Topic and add the **Generative Answers** node and connect to this knowledge source that we have uploaded. 
![Access App in Teams](\images\11_CopilotOpenAI\48.png)

We can test the Copilot's ability to use the local knowledge source by initiating a conversation and asking questions and we can see that we are getting back the contextual response along with citations. 
![Access App in Teams](\images\11_CopilotOpenAI\49.png)

### High Level Data Source Comparison : Azure AI Search vs SharePoint Vs Local File

| **Data Source**                     | **When to Use**                                                                                                                                          | **Pros**                                                                                                                                                  | **Cons**                                                                                                                                                                |
|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Local File Upload**               | - Quick, simple setups                                                            | - **Simplicity**: Easy setup<br>- **Flexibility**: User uploads as needed when creating a personal Copilot                                           | - **Limited Scope**: Best for small-scale operations<br>- **Size**: - 512 MB per file limitation<br>- **Manual Process**: Requires user intervention every time the document has to be updated    |
| **SharePoint Documents**            | - Enterprise applications<br>- Collaboration and document management<br>- Regularly updated, accessible content                                           |- **Centralized Management**: Easy to update the document from SharePoint<br>- **Version Control**: Tracks document changes | - **Complexity**: As of writing, Manual authentication with App registration is required for authentication configuration  |
| **Azure OpenAI with Azure AI Search** | - Complex searches across large datasets<br>- Aggregation and analysis of unstructured data<br>- Enterprise-level applications requiring AI-driven insights | - **Powerful AI Capabilities**: Combines NLU with robust search<br>- **Scalability**: Handles large datasets<br>- **Advanced Features**: Semantic and cognitive search | - **Complex Setup**: Requires more configuration<br>- **Cost**: Different tiers have different storage limitations. Higher the tier, higher the cost  |


## Conclusion
Integrating Azure OpenAI Service with Microsoft Copilot Studio opens up a lot of possibilities for creating intelligent, data-driven copilots. This guide has walked you through the process of setting up Azure AI Search, configuring Azure OpenAI, and seamlessly connecting these services in Copilot Studio. By harnessing the power of Azure's AI capabilities, you can build copilots that provide rich, contextual responses tailored to your organizational needs. We also saw how the same Power Apps PDF documentation can be used as a Local Source Knowledge Data Source. Depending on the use case and complexity of search involved, we can use either of them as a source of generative answers. 
 
