---
layout: post
title: Building a Farming Copilot Assistant using Generative Answers and Generative Topic Orchestration
description: In this guide, we will walk through the steps to create a Farming Assistant chatbot using Microsoft Copilot Studio.
date: 2022-11-09 15:01:35 +0300
image: '/images/06.jpg'
tags: [workflow, story, rest]
---
# Building a Farming Copilot Assistant using Generative Answers and Generative Topic Orchestration

In this guide, we will walk through the steps to create a Farming Assistant chatbot using Microsoft Copilot Studio. This Copilot assistant will help farmers by providing information across three scenarios where specific information resides on three different websites:
- Providing specific information on farming queries by searching the public website of the United States Department of Agriculture (USDA) and providing contextual answers to farmer queries.
- Based on the query answer on appropriate farming conditions, the farmer can further ask for current climate conditions from Weather.com to get a detailed weather report.
- In addition to this, we provide additional details about loan facilities by querying the farmers.gov site.

We will leverage Generative Answers and Generative Topic Routing (previously known as Dynamic Chaining) to ensure a seamless and efficient user experience.

## Step 1: Create the Copilot
1. Head over to the Copilot Studio (https://copilotstudio.microsoft.com/) and **click on Create**.
![Create](images/01_CopilotUsingWebsites/1.png)
2. It provides the option to start with a pre-existing copilot template or **create a new Copilot from scratch**, which is what we will be doing.
![Start from Scratch](images/01_CopilotUsingWebsites/2.png)
3. **Specify the Copilot Description** on the next page.
![Specify Description](images/01_CopilotUsingWebsites/4.png)
4. We can add further instructions on how the copilot should assist. **Click on Create** to provision the Copilot.
![Create Copilot](images/01_CopilotUsingWebsites/5.png)
5. It will create the Copilot. We can edit the Copilot details like name, description, and add a logo by **clicking on the Edit button**.
![Edit Copilot](images/01_CopilotUsingWebsites/6.png)

## Step 2: Add Topics
In Microsoft Copilot Studio, topics are the fundamental building blocks that define how a conversation with a copilot progresses. They represent discrete conversation paths that, when combined, allow users to have natural and flowing interactions with the copilot. Here are the key aspects of topics in Copilot Studio:

### Core Components of Topics
- **Trigger Phrases**: These are phrases, keywords, or questions that a user is likely to use, which are related to the topic. When a user's input matches or is close to these trigger phrases, the corresponding topic is activated. For example, a topic about store hours might be triggered by the phrase check store hours or similar variations.
- **Conversation Nodes**: These are the action steps within a topic that define what the copilot should do once the topic is triggered. Actions can include asking questions, sending messages, triggering cloud flows, setting variable values, or using conditions for branching logic.

## Step 3: Add Topic 1 - Farming Queries
1. Let's add the first topic of our Copilot by **selecting Topics from the navigation bar**.
![Select Topics](images/01_CopilotUsingWebsites/7.png)
2. This will open the Topics creation section, and we can either select **From blank to create the trigger phrase and subsequent actions manually** or use **Create from description with Copilot** to utilize the Copilot generative AI capabilities to create a Copilot bot for us.
![Create from Description](images/01_CopilotUsingWebsites/8.png)
3. It will open up the pop-up where we can name the topic and provide the description of what the topic should do.
![Topic Description](images/01_CopilotUsingWebsites/9.png)
4. **Clicking on Create**, the Topic will be created with the potential trigger phrases and the question node, which will be used to accept the question from the User.
![Topic Creation](images/01_CopilotUsingWebsites/10.png)

5. The question provided as User input for the question node will be stored in the **FarmingQuery variable**. We will now add a **Generative Answers node** and pass in this question as the input to this node. To do this:
    1. **Click on the + sign** which will open the pop-up.
    2. Select **Advanced**.
    3. **Click on Generative Answers**.
![Generative Answers](images/01_CopilotUsingWebsites/10.1.png)

6. Now we can provide the input to the Generative Answers node by:
    1. **Click on the right arrow** in the Input field and.
    2. Select the **FarmingQuery variable** which will contain the question asked by the user.
![Input Field](images/01_CopilotUsingWebsites/11.png)

7. Now we can go ahead and configure the data source from which the Generative Answers node can fetch the data and ground the information to give us back the contextual answer to the user question. We do this by:
    1. **Click on Edit** in the Data Sources section.
    2. Select **Add Knowledge**.
![Add Knowledge](images/01_CopilotUsingWebsites/12.png)

8. It will open up a pop-up from which we can select any of the sources. In this demo, we will select the **Public websites** option to fetch the contextual answers.
![Public Websites](images/01_CopilotUsingWebsites/13.png)

9. Clicking on Public Websites will provide us the option to add single or multiple websites from which we can fetch the data. In our case, the Farming related information is present on the site: https://www.nass.usda.gov/
So, let's add that to the **Webpage link** section and **Click on Add**.
![Webpage Link](images/01_CopilotUsingWebsites/14.png)

10. If we have more websites from which we need to pick information, we can add them in the webpages link section, else **click on Add**.
![Add Webpage](images/01_CopilotUsingWebsites/15.png)

11. Finally, if there are multiple topics and multiple Knowledge websites, we want to ensure that this topic will fetch only from the mentioned sites for which we will do the below steps:
    1. **Select Edit** in the Data sources section.
    2. **Toggle On** the Select only selected sources option.
    3. **Check the site** that we added (We are doing this because as we progress in this demo and add more knowledge sites for other topics, we want to isolate and ensure that the specific topics search only the intended sites).
    4. **Finally click on Save**.
![Save Data Source](images/01_CopilotUsingWebsites/16.png)

With this, we completed the configuration of the **Farming Queries** topic.

### Test Farming Queries Topic
Now let's test the topic that we created just now by using one of the trigger phrases using the below steps:
1. **Click on the Test option** in the Copilot canvas.
2. **Enter one of the trigger phrases**, Farming Queries, that we had defined, which will invoke this specific topic.
3. As a response, the Copilot asks the question for the user to provide a response.
4. In the Canvas, we can in real-time see which node is being executed currently, which helps in debugging the Copilot flow.
![Test Topic](images/01_CopilotUsingWebsites/17.png)

Now let's continue the conversation by:
1. I have provided my response to the question, which is **I am starting corn farming, help me with the ideal soil and climate conditions required**.
2. The Copilot will now invoke the **Generative Answers** node and use the user query along with the data fetched from the website, which we had mentioned earlier, and provide us with a detailed contextual answer related to the favorable conditions for Corn Farming. It also gives us citations from that website for detailed viewing.
3. Finally, we can see in the canvas that the Generative Answers node has successfully completed running.
![Generative Answer Completed](images/01_CopilotUsingWebsites/18.png)

If we want to view the citations in detail, we can click on one of the links, and it will take us to the USDA (United States Department of Agriculture) site.
![Citations](images/01_CopilotUsingWebsites/19.png)

With this, we come to the end of our first topic creation.

## Step 4: Generative Conversation Routing (Dynamic Chaining)
Before we move on to the creation of subsequent topics, let's enable Generative Conversation routing (previously known as Dynamic Chaining) to ensure that based on your query, the appropriate topic will be auto-selected, and the conversation flow will be routed dynamically to those topics.

Before we make this change, if we go to the Topics section, we can see that the Trigger is Phrases that we defined at the beginning of the topic.
![Initial Trigger](images/01_CopilotUsingWebsites/20.png)

To change this and ensure that Generative AI can route the topics based on user interaction, we will go to **Settings of the Copilot**.
![Settings](images/01_CopilotUsingWebsites/21.png)

Within the Settings page:
1. **Click on Generative AI**.
2. Select **Generative (preview)** to enable the dynamic routing of topics.
3. **Finally Click on Save**.
![Save Settings](images/01_CopilotUsingWebsites/22.png)

Now, if we head back to the Topics page, we can see that the Trigger is not the phrases rather it is automatically triggered by the copilot based on the description you will give during the topic creation.
![Auto Trigger](images/01_CopilotUsingWebsites/22_5.png)

## Step 5: Add Topic 2 – Farming Location Weather
Now that we have received the information regarding the adequate conditions needed for Corn Farming through our first topic, we will create a second topic to understand the current weather of the farming location to decide if it matches the mandated conditions by USDA.

Let's head to the Topics section and use Copilot to create the topic for us by describing what we intend to achieve with this topic.
![Create Topic](images/01_CopilotUsingWebsites/23.png)

This time we will name the topic as **Farming Location Weather** and the description as **Let the user search for weather at a particular place and search for the weather details on the site https://weather.com/ and share back the results**. Ensure that a clear description is given as the Copilot will use this description to create the potential phrases for automatic topic routing as well as the conversational nodes within the topic.
![Topic Description](images/01_CopilotUsingWebsites/24.png)

**Clicking on Create** will create the topic for us along with the trigger and the conversation starter question.
![Create Topic](images/01_CopilotUsingWebsites/25.png)

The question that the user inputs as a response to the Question node will be saved in the **Place variable** which we will be using down the line. We will now edit the Message node and remove the text and add a **basic card** to provide a better UX.
![Basic Card](images/01_CopilotUsingWebsites/26.png)

Clicking on **Basic Card** will open up the pane where we can provide the card details and the image URL which will be shown in the card in the copilot.
![Card Details](images/01_CopilotUsingWebsites/26_5.png)

Now let's add the **Generative Answer** node by:
1. **Click on the + Sign** to add the new node.
2. Select **Advanced**.
3. **Click on Generative Answers**.
![Add Generative Answers](images/01_CopilotUsingWebsites/27.png)

First, let’s provide the input to the **Generative Answers** node by:
1. **Selecting the > arrow** next to the input field.
2. Assigning the **Place variable** to the input field which will contain the question which the user has asked about the weather at a particular place.
![Input Place](images/01_CopilotUsingWebsites/28.png)

Next, we will edit the Data source for the node by:
1. **Clicking on Edit** button of the Data sources section.
2. Select **Add Knowledge**.
![Add Knowledge](images/01_CopilotUsingWebsites/29.png)

This will open the pop-up where we will select the **Public websites** as the knowledge source.
![Select Public Websites](images/01_CopilotUsingWebsites/30.png)

Specify the weather site URL in the **webpage link** and **click on Add**.
![Webpage Link](images/01_CopilotUsingWebsites/31.png)

Since we don’t have any more URLs to add, let's **click on Add** to finalize the knowledge base for this topic.
![Add URL](images/01_CopilotUsingWebsites/32.png)

To ensure that this specific topic will only use the Weather Generative Knowledge Base, we will once again edit the Data source by:
1. **Click on Edit** in the Data source section.
2. **Toggle on the Search only selected sources** and.
3. **Check the Weather site URL**.
4. **Finally, Click on Save**.
![Save Data Source](images/01_CopilotUsingWebsites/33.png)

## Step 6: Add Topic 4 – Farming Loans
Now we have configured the topics for getting farming information and the farming location weather. Now we would like to have one final topic to see if we can get any loan assistance from USDA. Let's create the last topic from the Topics section.
![Create Topic](images/01_CopilotUsingWebsites/34.png)

Ensure that we give a proper description for the topic so that the trigger and questions conversation nodes can be created with accuracy. We have named the topic as **Farming Loans** and used the description **Ask the user about their loan query and search for the answer on the site: https://www.farmers.gov/ and share the results with the user** for our topic.
![Topic Description](images/01_CopilotUsingWebsites/35.png)

**Clicking on Create** will generate the topic for us with the trigger and question derived from the description.
![Create Topic](images/01_CopilotUsingWebsites/36.png)

The question provided by the user as a response to the question node is saved in the **LoanQuery variable**. Let's update the message node and add the **basic card** with an image to provide a better user experience.
![Basic Card](images/01_CopilotUsingWebsites/37.png)

We will update the card with details like title and image URL which will be reflected in the message node in the canvas.
![Card Details](images/01_CopilotUsingWebsites/38.png)

Finally, let's add the **Generative Answers** node to fetch the answer to the user query from the farmers.gov site by:
1. **Clicking on the + sign** to add a new node.
2. Click on **Advanced option** and.
3. Select **Generative Answers**.
![Add Generative Answers](images/01_CopilotUsingWebsites/39.png)

Now let's update the input to the Generative Answers node by:
1. **Clicking on the >** in the Input field.
2. Select the **LoanQuery variable** and assign it to the input field.
![Input LoanQuery](images/01_CopilotUsingWebsites/40.png)

We can now edit the datasource and add the external site URL by:
1. **Click on Edit** in the data source.
2. Select **Add Knowledge**.
![Add Knowledge](images/01_CopilotUsingWebsites/41.png)

This will open up the pop-up where we can select the type of Knowledge base. We will go with **Public Websites**.
![Select Public Websites](images/01_CopilotUsingWebsites/42.png)

Mention the external site URL: https://www.farmers.gov in the **webpages link** and **click on Add**.
![Webpage Link](images/01_CopilotUsingWebsites/43.png)

**Click on Add** to finalize the knowledge for this topic.
![Add URL](images/01_CopilotUsingWebsites/44.png)

Finally, to ensure that the Farming Loans topic relies only on the recently added knowledge site, we will:
1. **Click on Edit** in the Data source section.
2. **Toggle on the Search only selected sources** and.
3. **Check the Farmers site URL**.
4. **Finally, Click on Save**.
![Save Data Source](images/01_CopilotUsingWebsites/45.png)

Thus we have configured all three topics and have also enabled dynamic routing of topics using Generative AI.

## Step 7: Test the Copilot
Now let's test the Copilot end to end.
1. We will first want to get information about the farming query related to the ideal conditions for corn farming and the Copilot has taken the user query to fetch the generative results from the USDA site.
![Test Farming Query](images/01_CopilotUsingWebsites/46.png)
2. It displays back the Soil and Climate condition response to the user query as below:
![Soil and Climate](images/01_CopilotUsingWebsites/47.png)
3. Now that we know the climate condition needed for Corn Farming, let's try to get the current climate conditions using the below query. It will leverage generative AI to fetch the details from the Weather.com site and even show a citation link to the page where the current climate condition of the farming location will be provided.
![Weather Query](images/01_CopilotUsingWebsites/48.png)
4. Finally, let's see if we can get information about the available loan options to proceed with the farming. We can see that it successfully orchestrates the conversation to the appropriate topic and uses generative answers to fetch the details from the farmers.gov site.
![Loan Query](images/01_CopilotUsingWebsites/49.png)

## Conclusion
In this guide, we've walked through the process of creating a powerful Farming Assistant chatbot using Microsoft Copilot Studio. By leveraging Generative Answers and Generative Topic Orchestration, we've enabled the Farming Assistant to provide seamless, contextually accurate information across various farming-related queries. This assistant integrates data from three distinct public websites, ensuring comprehensive support for farmers:
1. USDA for detailed farming information and best practices.
2. Weather.com for real-time weather updates pertinent to farming locations.
3. Farmers.gov for information on available loan options and financial assistance.

By enabling dynamic topic routing and configuring targeted data sources, we've created a robust and intelligent Copilot that can dynamically handle user queries and provide precise answers grounded in reliable information. This Farming Assistant not only simplifies the decision-making process for farmers but also demonstrates the potential of Microsoft Copilot Studio in creating sophisticated AI solutions.

This project highlights the effectiveness of combining generative AI with well-structured topic orchestration, setting a precedent for developing other domain-specific assistants.

