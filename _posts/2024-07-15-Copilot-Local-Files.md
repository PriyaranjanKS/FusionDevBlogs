---
layout: post
title: Creating an Insurance and Organizational Policy Copilot Using Policy Documents
description: We will see the steps needed to create a Policy Hub Copilot using Microsoft Copilot Studio.
date: 2024-07-15 15:01:35 +0300
image: '/images/FrontImage/02.png'
tags: [copilot]
---

## Table of Contents
{: .no_toc}

* TOC
{: toc}

## Introduction

Instant access to information regarding organizational and insurance policies is of prime importance in any organization. Envision a chatbot that can fetch relevant information from policy documents directly uploaded during its build process and provide intelligent responses to users. Microsoft’s Copilot Studio, in conjunction with Generative AI, enables the creation of such a versatile bot.

In this blog, we will explore how to build a Copilot Studio bot that leverages generative AI to answer user queries related to organizational and insurance policies using multiple policy documents as the knowledge source. 
![Context](\images\02_CopilotUsingLocalFiles\0_0.png)

## Demo

Watch the demo video below to see how the Copilot assistant helps with policy queries in real-time scenarios.

<iframe width="560" height="315" src="https://www.youtube.com/embed/hF4s1jSKTGU?vq=hd1080" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Step-by-Step Guide to Creating the Copilot Studio Bot

### Step 1: Setting Up Your Environment

Before we begin building the bot, ensure you have the following prerequisites:
- Microsoft Copilot Studio access.
- Digital copies of your organizational and insurance policy documents.

### Step 2: Preparing Your Policy Documents

- Collect your policy documents, categorize them into general organizational policies and insurance policies, and ensure they are in digital format (e.g., PDF, Word).
- Maintain a consistent format in each document with clear headings and sections to facilitate better AI parsing and retrieval.

### Step 3: Create Custom Copilot from Copilot Studio

Head over to [Copilot Studio](https://copilotstudio.microsoft.com/) and click on **Create**.
![Step 3 Image 1](\images\02_CopilotUsingLocalFiles\1.png)

This will provide us the option to create a copilot based on an existing template or create a blank copilot from scratch. Let's select **New copilot**.
![Step 3 Image 2](\images\02_CopilotUsingLocalFiles\2.png)

This will take us to the page where we can:
1. Describe the copilot functionality and provide any specific instructions to the copilot.
2. Once done, click on **Create** to provision the copilot.
![Step 3 Image 3](\images\02_CopilotUsingLocalFiles\3.png)

### Step 4: Enable Generative Selection of Topics

The copilot is now created. We can then make the needed configuration changes.

1. Click on **Edit**, edit the copilot details like name, icon, and description.
2. Click on **Settings** to enable the Generative selection of topics so that without relying on triggers, the topics will be auto-selected based on user conversation, resulting in a much smoother user experience.
![Step 4 Image 1](\images\02_CopilotUsingLocalFiles\4.png)

To enable the automatic detection of topics from user interaction:
1. Click on **Generative AI**.
2. Select **Generative (preview)**.
3. Click on **Save** to update the settings.
4. Click on the **Close** icon to go back to the home page of this custom copilot.
![Step 4 Image 2](\images\02_CopilotUsingLocalFiles\5.png)

### Step 5: Create Topics

Now let’s go ahead and create the topics that will automatically redirect the conversation flow to appropriate topics based on the user's question. To do this, we will create a topic with the below 2 documents as Knowledge Source:
1. General Company Policy: This document will provide the user with information about general company policies.
2. Insurance Policy: This document will provide contextual answers back to the user for insurance-related queries.

Select **Topic** from the top bar navigation menu. 

![Step 5 Image 1](\images\02_CopilotUsingLocalFiles\6.png)

To add the topic, we can either go with the option to create a blank topic or use Copilot to create the topic with an initial set of prepopulated conversation nodes based on the topic description that we provide.
1. Click on **Add a Topic**.
2. Select **Create from description with Copilot**.
![Step 5 Image 2](\images\02_CopilotUsingLocalFiles\7.png)

When the user asks questions regarding the policy, we need a topic that will take the user query and ground the Policy document to provide the contextual answer back to the user. To do this, provide the below topic description details in the pop-up that opened when we clicked the Add topic button previously.

Click on **Create**, which will provision the topic skeleton based on the provided description.
![Step 5 Image 3](\images\02_CopilotUsingLocalFiles\8.png)

Based on the topic description, Copilot has created the trigger and initial questions to be asked to the user.
![Step 5 Image 4](\images\02_CopilotUsingLocalFiles\9.png)

Once we have asked the question and the user inputs the query for which they are seeking a response, it is saved to the Question variable. Now let's add the Generative Answers node by:
1. Selecting the **+** Sign.
2. Clicking on **Advanced**.
3. Selecting **Generative Answers**.
![Step 5 Image 5](\images\02_CopilotUsingLocalFiles\10.png)

We can now configure the Generative answers node by:
1. Selecting the right arrow, which will open the pop-up to select the input to be passed to this action.
2. Select the **Question** variable which contains the user inputted query on the company policy.
![Step 5 Image 6](\images\02_CopilotUsingLocalFiles\11.png)

Now let's configure the data source for the Generative answers node:
- Click on **Edit**.
- Select **Add Knowledge**.
![Step 5 Image 7](\images\02_CopilotUsingLocalFiles\12.png)

In the **Add available knowledge sources** pop-up, select **Files**.
![Step 5 Image 8](\images\02_CopilotUsingLocalFiles\13.png)

This will allow us to browse for a file from our local computer. Select the General Policy document and click on **Open**.
![Step 5 Image 9](\images\02_CopilotUsingLocalFiles\14.png)

Now let’s upload the Insurance document as well by browsing the local computer.
![Step 5 Image 10](\images\02_CopilotUsingLocalFiles\16.png)

Both the policy documents are uploaded. Click on **Add**.
![Step 5 Image 11](\images\02_CopilotUsingLocalFiles\17.png)

To ensure that the questions are grounded only with the uploaded document, we can:
1. Once again, click on **Edit** data sources.
2. Toggle **Search only selected sources**.
3. Check the uploaded documents.
4. Click on **Save**.
![Step 5 Image 12](\images\02_CopilotUsingLocalFiles\18.png)

Thus, we have completed the creation of the topics which will use generative AI and ground the uploaded documents to provide contextual answers back to the user.

### Step 6: Test the Copilot

Before we proceed with the testing, ensure that the documents have been preprocessed by going to the knowledge tab of the copilot.
![Step 6 Image 1](\images\02_CopilotUsingLocalFiles\19.png)

Now let's test the copilot in the test pane by asking a policy-related question. First, we will ask a general policy question like “How many sick leaves is an employee entitled to?”. We can see that it searches the document and provides us with the answer that the employee is entitled to 10 days of sick leave.
![Step 6 Image 2](\images\02_CopilotUsingLocalFiles\20.png)

We can also see that there is a citation that points to the exact location in the document from which the answer was picked. Clicking on the citation, we can see that it opens up in a pop-up.
![Step 6 Image 3](\images\02_CopilotUsingLocalFiles\21.png)

Now let's ask a question about the insurance claim process, and we can see that it has picked the information from the relevant document and provided the details with a citation.
![Step 6 Image 4](\images\02_CopilotUsingLocalFiles\22.png)

### Step 7: Publish the Copilot

Now that the copilot development is completed, let's publish it so that it becomes available for use in different channels by clicking on the **Publish** button.
![Step 7 Image 1](\images\02_CopilotUsingLocalFiles\23.png)

### Step 8: Add to Power Apps

Now let's add the copilot to Power Apps using the chatbot component which is *currently in preview at the time of writing of this blog*.
Head over to your Power Apps and from the **Insert** menu, select the **Chatbot** component which will add it to the canvas.
![Step 8 Image 1](\images\02_CopilotUsingLocalFiles\24.png)

Now let's configure the chatbot component to show the recently created copilot.
- Specify the header label for the bot.
- Click on **Select bot** to choose the recently published copilot.
![Step 8 Image 2](\images\02_CopilotUsingLocalFiles\25.png)

Select the **Policy Hub** copilot.
![Step 8 Image 3](\images\02_CopilotUsingLocalFiles\26.png)

And we can now see that the copilot has been connected to the chatbot component and it will work just like how we saw in the testing phase.
![Step 8 Image 4](\images\02_CopilotUsingLocalFiles\27.png)

## Conclusion

Creating a Copilot Studio bot that utilizes generative AI to answer queries from uploaded policy documents offers a powerful solution for managing information in organizational documents. By enabling dynamic topic selection, the bot provides users with precise, context-aware responses without the need for predefined triggers. This streamlined approach not only enhances user experience but also ensures that employees and stakeholders have quick access to critical information, improving efficiency and decision-making across the organization. 