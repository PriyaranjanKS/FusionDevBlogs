---
layout: post
title: Building a Farming Copilot Assistant using Generative Answers and Generative Topic Orchestration
description: In this guide, we will walk through the steps to create a Farming Assistant chatbot using Microsoft Copilot Studio.
date: 2024-07-09 15:01:35 +0300
image: '/images/01_CopilotUsingWebsites/00.png'
tags: [Copilot Studio]
---

In this guide, we will walk through the steps to create a Farming Assistant chatbot using Microsoft Copilot Studio. This Copilot assistant will **help farmers by providing information across three scenarios** where specific information resides on three different websites:

- Providing specific information on **farming queries** by searching the public website of the United States Department of Agriculture (USDA) and providing contextual answers to farmer queries.
- Based on the query answer on appropriate farming conditions, the farmer can further ask for current **climate conditions** from Weather.com to get a detailed weather report.
- Additionally, we provide information about **loan facilities** by querying the farmers.gov site.

We will leverage Generative Answers and Generative Topic Routing (previously known as Dynamic Chaining) to ensure a seamless and efficient user experience.

<img src="{{ site.baseurl }}/images/01_CopilotUsingWebsites/50.svg" alt="Copilot Flow">

## Table of Contents
{: .no_toc}

* TOC
{: toc}

---

## Create the Copilot

1. Head over to the Copilot Studio [website](https://copilotstudio.microsoft.com/) and **click on Create**.
   ![Create]({{ site.baseurl }}/images/01_CopilotUsingWebsites/1.png)

2. You will have the option to start with a pre-existing copilot template or **create a new Copilot from scratch**, which is what we will be doing.
   ![Start from Scratch]({{ site.baseurl }}/images/01_CopilotUsingWebsites/2.png)

3. **Specify the Copilot Description** on the next page.
   ![Specify Description]({{ site.baseurl }}/images/01_CopilotUsingWebsites/4.png)

4. Add further instructions on how the copilot should assist. Then, **click on Create** to provision the Copilot.
   ![Create Copilot]({{ site.baseurl }}/images/01_CopilotUsingWebsites/5.png)

5. The Copilot will be created. You can edit the Copilot details like name, description, and add a logo by **clicking on the Edit button**.
   ![Edit Copilot]({{ site.baseurl }}/images/01_CopilotUsingWebsites/6.png)

---

## Add Topics

In Microsoft Copilot Studio, topics are the fundamental building blocks that define how a conversation with a copilot progresses. They represent discrete conversation paths that, when combined, allow users to have natural and flowing interactions with the copilot. Here are the key aspects of topics in Copilot Studio:

### Core Components of Topics

- **Trigger Phrases**: These are phrases, keywords, or questions that a user is likely to use, which are related to the topic. When a user's input matches or is close to these trigger phrases, the corresponding topic is activated. For example, a topic about store hours might be triggered by the phrase "check store hours" or similar variations.
- **Conversation Nodes**: These are the action steps within a topic that define what the copilot should do once the topic is triggered. Actions can include asking questions, sending messages, triggering cloud flows, setting variable values, or using conditions for branching logic.

---

## Add Topic 1 - Farming Queries

1. Let's add the first topic by **selecting Topics from the navigation bar**.
   ![Select Topics]({{ site.baseurl }}/images/01_CopilotUsingWebsites/7.png)

2. This will open the Topics creation section. You can either select **From blank to create the trigger phrase and subsequent actions manually** or use **Create from description with Copilot** to utilize the generative AI capabilities to create a Copilot bot.
   ![Create from Description]({{ site.baseurl }}/images/01_CopilotUsingWebsites/8.png)

3. A pop-up will appear where you can name the topic and provide the description of what the topic should do.
   ![Topic Description]({{ site.baseurl }}/images/01_CopilotUsingWebsites/9.png)

4. **Click on Create**. The topic will be created with potential trigger phrases and the question node, which will be used to accept the user's question.
   ![Topic Creation]({{ site.baseurl }}/images/01_CopilotUsingWebsites/10.png)

5. The user's input for the question node will be stored in the **FarmingQuery variable**. We will now add a **Generative Answers node** and pass in this question as the input. To do this:
    - **Click on the + sign** to open the pop-up.
    - Select **Advanced**.
    - **Click on Generative Answers**.
    ![Generative Answers]({{ site.baseurl }}/images/01_CopilotUsingWebsites/10.1.png)

6. Provide the input to the Generative Answers node:
    - **Click on the right arrow** in the Input field.
    - Select the **FarmingQuery variable**.
    ![Input Field]({{ site.baseurl }}/images/01_CopilotUsingWebsites/11.png)

7. Configure the data source from which the Generative Answers node can fetch the data and ground the information to give a contextual answer:
    - **Click on Edit** in the Data Sources section.
    - Select **Add Knowledge**.
    ![Add Knowledge]({{ site.baseurl }}/images/01_CopilotUsingWebsites/12.png)

8. A pop-up will appear where you can select any of the sources. For this demo, we will select the **Public websites** option to fetch the contextual answers.
    ![Public Websites]({{ site.baseurl }}/images/01_CopilotUsingWebsites/13.png)

9. Clicking on Public Websites will allow us to add single or multiple websites from which to fetch the data. Add the site https://www.nass.usda.gov/ to the **Webpage link** section and **Click on Add**.
    ![Webpage Link]({{ site.baseurl }}/images/01_CopilotUsingWebsites/14.png)

10. If more websites need to be added, do so in the webpages link section, otherwise **click on Add**.
    ![Add Webpage]({{ site.baseurl }}/images/01_CopilotUsingWebsites/15.png)

11. Ensure this topic fetches only from the mentioned sites by:
    - **Select Edit** in the Data sources section.
    - **Toggle On** the Select only selected sources option.
    - **Check the site** that was added.
    - **Click on Save**.
    ![Save Data Source]({{ site.baseurl }}/images/01_CopilotUsingWebsites/16.png)

This completes the configuration of the **Farming Queries** topic.

---

### Test Farming Queries Topic

Now, let's test the topic by using one of the trigger phrases:

1. **Click on the Test option** in the Copilot canvas.
2. **Enter one of the trigger phrases**, such as "Farming Queries", to invoke this specific topic.
3. The Copilot will ask the question for the user to provide a response.
4. In the Canvas, you can see in real-time which node is being executed, which helps in debugging the Copilot flow.
   ![Test Topic]({{ site.baseurl }}/images/01_CopilotUsingWebsites/17.png)

Next steps:

1. Provide the response to the question, e.g., **"I am starting corn farming, help me with the ideal soil and climate conditions required"**.
2. The Copilot will now invoke the **Generative Answers** node, using the user query along with the data fetched from the mentioned website, and provide a detailed contextual answer related to the favorable conditions for Corn Farming. Citations from the website will also be provided.
3. The canvas will show that the Generative Answers node has successfully completed running.
   ![Generative Answer Completed]({{ site.baseurl }}/images/01_CopilotUsingWebsites/18.png)

To view the citations in detail, click on one of the links to be taken to the USDA (United States Department of Agriculture) site.
   ![Citations]({{ site.baseurl }}/images/01_CopilotUsingWebsites/19.png)

This concludes the creation of the first topic.

---

## Generative Conversation Routing (Dynamic Chaining)

Before creating subsequent topics, let's enable Generative Conversation routing (previously known as Dynamic Chaining) to ensure the appropriate topic is auto-selected based on the query, and the conversation flow is routed dynamically.

1. Navigate to the Topics section. Initially, the Trigger is the phrases defined at the beginning of the topic.
   ![Initial Trigger]({{ site.baseurl }}/images/01_CopilotUsingWebsites/20.png)

2. To enable Generative AI routing:
    - Go to **Settings of the Copilot**.
    - **Click on Generative AI**.
    - Select **Generative (preview)** to enable dynamic routing of topics.
    - **Click on Save**.
    ![Save Settings]({{ site.baseurl }}/images/01_CopilotUsingWebsites/22.png)

3. Return to the Topics page. The Trigger will now be automatically set based on the description provided during topic creation.
   ![Auto Trigger]({{ site.baseurl }}/images/01_CopilotUsingWebsites/22_5.png)

---

## Add Topic 2 – Farming Location Weather

With the adequate conditions for Corn Farming established, let's create a second topic to understand the current weather of the farming location.

1. Navigate to the Topics section and use Copilot to create the topic by describing the intended outcome.
   ![Create Topic]({{ site.baseurl }}/images/01_CopilotUsingWebsites/23.png)

2. Name the topic **Farming Location Weather** with the description **"Let the user search for weather at a particular place and search for the weather details on the site https://weather.com/ and share back the results"**. Ensure the description is clear for effective topic routing and node creation.
   ![Topic Description]({{ site.baseurl }}/images/01_CopilotUsingWebsites/24.png)

3. **Click on Create** to generate the topic with the trigger and the conversation starter question.
   ![Create Topic]({{ site.baseurl }}/images/01_CopilotUsingWebsites/25.png)

4. The user's response to the Question node will be saved in the **Place variable**. Edit the Message node, remove the text, and add a **basic card** for better UX.
   ![Basic Card]({{ site.baseurl }}/images/01_CopilotUsingWebsites/26.png)

5. Clicking on **Basic Card** will open a pane where card details and the image URL can be provided.
   ![Card Details]({{ site.baseurl }}/images/01_CopilotUsingWebsites/26_5.png)

6. Add the **Generative Answer** node:
    - **Click on the + Sign** to add a new node.
    - Select **Advanced**.
    - **Click on Generative Answers**.
    ![Add Generative Answers]({{ site.baseurl }}/images/01_CopilotUsingWebsites/27.png)

7. Provide the input to the **Generative Answers** node:
    - **Select the > arrow** next to the input field.
    - Assign the **Place variable**.
    ![Input Place]({{ site.baseurl }}/images/01_CopilotUsingWebsites/28.png)

8. Edit the Data source for the node:
    - **Click on Edit** button of the Data sources section.
    - Select **Add Knowledge**.
    ![Add Knowledge]({{ site.baseurl }}/images/01_CopilotUsingWebsites/29.png)

9. In the pop-up, select **Public websites** as the knowledge source.
    ![Select Public Websites]({{ site.baseurl }}/images/01_CopilotUsingWebsites/30.png)

10. Specify the weather site URL in the **webpage link** and **click on Add**.
    ![Webpage Link]({{ site.baseurl }}/images/01_CopilotUsingWebsites/31.png)

11. Finalize the knowledge base by **clicking on Add**.
    ![Add URL]({{ site.baseurl }}/images/01_CopilotUsingWebsites/32.png)

12. To ensure the topic uses only the Weather Generative Knowledge Base:
    - **Click on Edit** in the Data source section.
    - **Toggle on the Search only selected sources**.
    - **Check the Weather site URL**.
    - **Click on Save**.
    ![Save Data Source]({{ site.baseurl }}/images/01_CopilotUsingWebsites/33.png)

---

## Add Topic 3 – Farming Loans

Now that we have configured the topics for farming information and location weather, let's add a final topic to explore loan assistance from USDA.

1. Navigate to the Topics section and create a new topic.
   ![Create Topic]({{ site.baseurl }}/images/01_CopilotUsingWebsites/34.png)

2. Provide a proper description for accurate trigger and conversation node creation. Name the topic **Farming Loans** and use the description **"Ask the user about their loan query and search for the answer on the site: https://www.farmers.gov/ and share the results with the user"**.
   ![Topic Description]({{ site.baseurl }}/images/01_CopilotUsingWebsites/35.png)

3. **Click on Create** to generate the topic with the trigger and question derived from the description.
   ![Create Topic]({{ site.baseurl }}/images/01_CopilotUsingWebsites/36.png)

4. The user's response to the question node is saved in the **LoanQuery variable**. Update the message node and add a **basic card** with an image for a better user experience.
   ![Basic Card]({{ site.baseurl }}/images/01_CopilotUsingWebsites/37.png)

5. Update the card with details like title and image URL.
   ![Card Details]({{ site.baseurl }}/images/01_CopilotUsingWebsites/38.png)

6. Add the **Generative Answers** node:
    - **Click on the + sign** to add a new node.
    - Click on **Advanced option**.
    - Select **Generative Answers**.
    ![Add Generative Answers]({{ site.baseurl }}/images/01_CopilotUsingWebsites/39.png)

7. Update the input to the Generative Answers node:
    - **Click on the >** in the Input field.
    - Select the **LoanQuery variable** and assign it to the input field.
    ![Input LoanQuery]({{ site.baseurl }}/images/01_CopilotUsingWebsites/40.png)

8. Edit the datasource and add the external site URL:
    - **Click on Edit** in the data source.
    - Select **Add Knowledge**.
    ![Add Knowledge]({{ site.baseurl }}/images/01_CopilotUsingWebsites/41.png)

9. Select the type of Knowledge base. Choose **Public Websites**.
    ![Select Public Websites]({{ site.baseurl }}/images/01_CopilotUsingWebsites/42.png)

10. Mention the external site URL: https://www.farmers.gov in the **webpages link** and **click on Add**.
    ![Webpage Link]({{ site.baseurl }}/images/01_CopilotUsingWebsites/43.png)

11. **Click on Add** to finalize the knowledge for this topic.
    ![Add URL]({{ site.baseurl }}/images/01_CopilotUsingWebsites/44.png)

12. Ensure the Farming Loans topic relies only on the recently added knowledge site:
    - **Click on Edit** in the Data source section.
    - **Toggle on the Search only selected sources**.
    - **Check the Farmers site URL**.
    - **Click on Save**.
    ![Save Data Source]({{ site.baseurl }}/images/01_CopilotUsingWebsites/45.png)

This completes the configuration of all three topics and enables dynamic routing of topics using Generative AI.

---

## Test the Copilot

Now let's test the Copilot end-to-end.

1. First, obtain information about the farming query related to the ideal conditions for corn farming. The Copilot will use the user query to fetch generative results from the USDA site.
   ![Test Farming Query]({{ site.baseurl }}/images/01_CopilotUsingWebsites/46.png)

2. The response will display the Soil and Climate condition related to the user query.
   ![Soil and Climate]({{ site.baseurl }}/images/01_CopilotUsingWebsites/47.png)

3. Next, let's get the current climate conditions using the query. The Copilot will leverage generative AI to fetch details from the Weather.com site and show a citation link to the page where the current climate condition of the farming location is provided.
   ![Weather Query]({{ site.baseurl }}/images/01_CopilotUsingWebsites/48.png)

4. Finally, let's see if we can get information about available loan options for farming. The Copilot will successfully orchestrate the conversation to the appropriate topic and use generative answers to fetch details from the farmers.gov site.
   ![Loan Query]({{ site.baseurl }}/images/01_CopilotUsingWebsites/49.png)

---

## Conclusion

In this guide, we've walked through the process of creating a powerful Farming Assistant chatbot using Microsoft Copilot Studio. By leveraging Generative Answers and Generative Topic Orchestration, we've enabled the Farming Assistant to provide seamless, contextually accurate information across various farming-related queries. This assistant integrates data from three distinct public websites, ensuring comprehensive support for farmers:

1. USDA for detailed farming information and best practices.
2. Weather.com for real-time weather updates pertinent to farming locations.
3. Farmers.gov for information on available loan options and financial assistance.

By enabling dynamic topic routing and configuring targeted data sources, we've created a robust and intelligent Copilot that can dynamically handle user queries and provide precise answers grounded in reliable information. This Farming Assistant not only simplifies the decision-making process for farmers but also demonstrates the potential of Microsoft Copilot Studio in creating sophisticated AI solutions.

This project highlights the effectiveness of combining generative AI with well-structured topic orchestration, setting a precedent for developing other domain-specific assistants.
