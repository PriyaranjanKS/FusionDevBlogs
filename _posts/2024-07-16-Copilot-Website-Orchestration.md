---
layout: post
title: Creating a Farming Copilot Assistant with Generative Answers and Topic Orchestration
description: We will see the steps needed to create a Farming Assistant Copilot using Microsoft Copilot Studio.
date: 2024-07-15 15:01:35 +0300
image: '/images/FrontImage/01.png'
tags: [copilot]
---

## Table of Contents
{: .no_toc}

* TOC
{: toc}

## Introduction

This Copilot assistant will **help farmers by providing information across three scenarios where specific information resides on three different websites**. The Copilot by itself is embedded within **Power Pages** for seamless external user access as part of a larger use case.
The Copilot will :
- Provide information on **farming queries** by searching the public website of the *United States Department of Agriculture (USDA)* and providing contextual answers to farmer queries.
- Generate the current **climate conditions** from *Weather.com* so that the farmer can plan his crop season.
- Come up with additional details about **loan facilities** by querying the *Farmers.gov* site.

We will be leveraging the **Generative Answers and Generative Topic Orchestration** capabilities of Copilot to ensure a seamless and efficient user experience.

<img src="{{ site.baseurl }}/images/01_CopilotUsingWebsites/50.svg" alt="Copilot Flow">

## Demo 

Watch the demo video below to see how the Copilot assistant helps farmers in real-time scenarios.

<iframe width="560" height="315" src="https://www.youtube.com/embed/4U2gLoNqFo8?vq=hd1080" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Step 1 : Create the Copilot
1. Head over to the Copilot Studio (https://copilotstudio.microsoft.com/) and **click on Create**.
![Create]({{ site.baseurl }}/images/01_CopilotUsingWebsites/1.png)
2. It provides the option to start with a pre-existing copilot template or **create a new Copilot from scratch**.
![Start from Scratch]({{ site.baseurl }}/images/01_CopilotUsingWebsites/2.png)
3. **Specify the Copilot Description** on the next page.
![Specify Description]({{ site.baseurl }}/images/01_CopilotUsingWebsites/4.png)
4. We can add further instructions on how the copilot should assist. **Click on Create** to provision the Copilot.
![Create Copilot]({{ site.baseurl }}/images/01_CopilotUsingWebsites/5.png)
5. It will create the Copilot. We can edit the Copilot details like name, description, and add a logo by **clicking on the Edit button**.
![Edit Copilot]({{ site.baseurl }}/images/01_CopilotUsingWebsites/6.png)

## Add Topics
In Microsoft Copilot Studio, topics are the fundamental building blocks that define how a conversation with a copilot progresses. They represent discrete conversation paths that, when combined, allow users to have natural and flowing interactions with the copilot. Here are the key aspects of topics in Copilot Studio:

### Core Components of Topics
- **Trigger Phrases**: These are phrases, keywords, or questions that a user is likely to use, which are related to the topic. When a user's input matches or is close to these trigger phrases, the corresponding topic is activated. For example, a topic about store hours might be triggered by the phrase check store hours or similar variations.
- **Conversation Nodes**: These are the action steps within a topic that define what the copilot should do once the topic is triggered. Actions can include asking questions, sending messages, triggering cloud flows, setting variable values, or using conditions for branching logic.

## Step 2 : Add Topic 1 - Farming Queries
1. Let's add the first topic of our Copilot by **selecting Topics from the navigation bar**.
![Select Topics]({{ site.baseurl }}/images/01_CopilotUsingWebsites/7.png)
2. This will open the Topics creation section, and we can either select **From blank to create the trigger phrase and subsequent actions manually** or use **Create from description with Copilot** to utilize the Copilot generative AI capabilities to create a Copilot bot for us.
![Create from Description]({{ site.baseurl }}/images/01_CopilotUsingWebsites/8.png)
3. It will open up the pop-up where we can name the topic and provide the description of what the topic should do.
![Topic Description]({{ site.baseurl }}/images/01_CopilotUsingWebsites/9.png)
4. **Clicking on Create**, the Topic will be created with the potential trigger phrases and the question node, which will be used to accept the question from the User.
![Topic Creation]({{ site.baseurl }}/images/01_CopilotUsingWebsites/10.png)

5. The question provided as User input for the question node will be stored in the **FarmingQuery variable**. We will now add a **Generative Answers node** and pass in this question as the input to this node. To do this:
    1. **Click on the + sign** which will open the pop-up.
    2. Select **Advanced**.
    3. **Click on Generative Answers**.
![Generative Answers]({{ site.baseurl }}/images/01_CopilotUsingWebsites/10.1.png)

6. Now we can provide the input to the Generative Answers node by:
    1. **Click on the right arrow** in the Input field and.
    2. Select the **FarmingQuery variable** which will contain the question asked by the user.
![Input Field]({{ site.baseurl }}/images/01_CopilotUsingWebsites/11.png)

7. Now we can go ahead and configure the data source from which the Generative Answers node can fetch the data and ground the information to give us back the contextual answer to the user question. We do this by:
    1. **Click on Edit** in the Data Sources section.
    2. Select **Add Knowledge**.
![Add Knowledge]({{ site.baseurl }}/images/01_CopilotUsingWebsites/12.png)

8. It will open up a pop-up from which we can select any of the sources. In this demo, we will select the **Public websites** option to fetch the contextual answers.
![Public Websites]({{ site.baseurl }}/images/01_CopilotUsingWebsites/13.png)

9. Clicking on Public Websites will provide us the option to add single or multiple websites from which we can fetch the data. In our case, the Farming related information is present on the site: https://www.nass.usda.gov/
So, let's add that to the **Webpage link** section and **Click on Add**.
![Webpage Link]({{ site.baseurl }}/images/01_CopilotUsingWebsites/14.png)

10. If we have more websites from which we need to pick information, we can add them in the webpages link section, else **click on Add**.
![Add Webpage]({{ site.baseurl }}/images/01_CopilotUsingWebsites/15.png)

11. Finally, if there are multiple topics and multiple Knowledge websites, we want to ensure that this topic will fetch only from the mentioned sites for which we will do the below steps:
    1. **Select Edit** in the Data sources section.
    2. **Toggle On** the Select only selected sources option.
    3. **Check the site** that we added (We are doing this because as we progress in this demo and add more knowledge sites for other topics, we want to isolate and ensure that the specific topics search only the intended sites).
    4. **Finally click on Save**.
![Save Data Source]({{ site.baseurl }}/images/01_CopilotUsingWebsites/16.png)

With this, we completed the configuration of the **Farming Queries** topic.

### Test Farming Queries Topic
Now let's test the topic that we created just now by using one of the trigger phrases using the below steps:
1. **Click on the Test option** in the Copilot canvas.
2. **Enter one of the trigger phrases**, Farming Queries, that we had defined, which will invoke this specific topic.
3. As a response, the Copilot asks the question for the user to provide a response.
4. In the Canvas, we can in real-time see which node is being executed currently, which helps in debugging the Copilot flow.
![Test Topic]({{ site.baseurl }}/images/01_CopilotUsingWebsites/17.png)

Next Steps :
5. Provide the response to the question, e.g., **I am starting corn farming, help me with the ideal soil and climate conditions required**.
6. The Copilot will now invoke the **Generative Answers** node and use the user query along with the data fetched from the website, which we had mentioned earlier, and provide us with a detailed contextual answer related to the favorable conditions for Corn Farming. It also gives us citations from that website for detailed viewing.
7. The canvas will show that the Generative Answers node has successfully completed running.
![Generative Answer Completed]({{ site.baseurl }}/images/01_CopilotUsingWebsites/18.png)

To view the citations in detail, click on one of the links to be taken to the USDA (United States Department of Agriculture) site.
![Citations]({{ site.baseurl }}/images/01_CopilotUsingWebsites/19.png)

This concludes the creation of the first topic.

## Step 3 : Generative Conversation Orchestration
Before creating subsequent topics, let’s enable generative conversation orchestration to ensure the appropriate topic is auto-selected based on the query, and the conversation flow is routed dynamically.

Before we make this change, if we go to the Topics section, we can see that the Trigger is Phrases that we defined at the beginning of the topic.
![Initial Trigger]({{ site.baseurl }}/images/01_CopilotUsingWebsites/20.png)

To change this and ensure that Generative AI can route the topics based on user interaction, we will go to **Settings of the Copilot**.
![Settings]({{ site.baseurl }}/images/01_CopilotUsingWebsites/21.png)

Within the Settings page:
1. **Click on Generative AI**.
2. Select **Generative (preview)** to enable the dynamic routing of topics.
3. **Finally Click on Save**.
![Save Settings]({{ site.baseurl }}/images/01_CopilotUsingWebsites/22.png)

Now, if we head back to the Topics page, we can see that the Trigger is not the phrases rather it is automatically triggered by the copilot based on the description you will give during the topic creation.
![Auto Trigger]({{ site.baseurl }}/images/01_CopilotUsingWebsites/22_5.png)

## Step 4 : Add Topic 2 – Farming Location Weather

Now that we have received the information regarding the adequate conditions needed for Corn Farming through our first topic, we will create a second topic to understand the current weather of the farming location to decide if it matches the mandated conditions by USDA.

Let's head to the Topics section and use Copilot to create the topic for us by describing what we intend to achieve with this topic.
![Create Topic]({{ site.baseurl }}/images/01_CopilotUsingWebsites/23.png)

This time we will name the topic as **Farming Location Weather** and the description as **Let the user search for weather at a particular place and search for the weather details on the site https://weather.com/ and share back the results**. Ensure that a clear description is given as the Copilot will use this description to create the potential phrases for automatic topic routing as well as the conversational nodes within the topic.
![Topic Description]({{ site.baseurl }}/images/01_CopilotUsingWebsites/24.png)

1. **Click on Create** to create the topic for us along with the trigger and the conversation starter question.
   ![Create Topic]({{ site.baseurl }}/images/01_CopilotUsingWebsites/25.png)

2. The question that the user inputs as a response to the Question node will be saved in the **Place** variable which we will be using down the line. We will now edit the Message node and remove the text and add a **basic card** to provide a better UX.
   ![Basic Card]({{ site.baseurl }}/images/01_CopilotUsingWebsites/26.png)

3. Clicking on **Basic Card** will open up the pane where we can provide the card details and the image URL .
   ![Card Details]({{ site.baseurl }}/images/01_CopilotUsingWebsites/26_5.png)

4. Now let's add the **Generative Answer** node by:
    1. **Click on the + Sign** to add the new node.
    2. Select **Advanced**.
    3. **Click on Generative Answers**.
       ![Add Generative Answers]({{ site.baseurl }}/images/01_CopilotUsingWebsites/27.png)

5. Provide the input to the **Generative Answers** node by:
    1. **Selecting the > arrow** next to the input field.
    2. Assigning the **Place** variable to the input field which will contain the question which the user has asked about the weather at a particular place.
       ![Input Place]({{ site.baseurl }}/images/01_CopilotUsingWebsites/28.png)

6. Next, we will edit the Data source for the node by:
    1. **Clicking on Edit** button of the Data sources section.
    2. Select **Add Knowledge**.
       ![Add Knowledge]({{ site.baseurl }}/images/01_CopilotUsingWebsites/29.png)

7. This will open the pop-up where we will select the **Public websites** as the knowledge source.
   ![Select Public Websites]({{ site.baseurl }}/images/01_CopilotUsingWebsites/30.png)

8. Specify the weather site URL in the **webpage link** and **click on Add**.
   ![Webpage Link]({{ site.baseurl }}/images/01_CopilotUsingWebsites/31.png)

9. Since we don’t have any more URLs to add, let's **click on Add** to finalize the knowledge base for this topic.
   ![Add URL]({{ site.baseurl }}/images/01_CopilotUsingWebsites/32.png)

10. To ensure that this specific topic will only use the Weather Generative Knowledge Base, we will once again edit the Data source by:
    1. **Click on Edit** in the Data source section.
    2. **Toggle on the Search only selected sources**.
    3. **Check the Weather site URL**.
    4. **Click on Save**.
       ![Save Data Source]({{ site.baseurl }}/images/01_CopilotUsingWebsites/33.png)


## Step 5 : Add Topic 3 – Farming Loans

Now that we have configured the topics for farming information and location weather, let’s add a final topic to explore loan assistance from Farmers.Gov site.

1. Let’s add a new topic from the Topics tab.
   ![Create Topic]({{ site.baseurl }}/images/01_CopilotUsingWebsites/34.png)

2. Ensure that we give a proper description for the topic so that the trigger and questions conversation nodes can be created with accuracy. We have named the topic as **Farming Loans** and used the description **Ask the user about their loan query and search for the answer on the site: https://www.farmers.gov/ and share the results with the user** for our topic.
   ![Topic Description]({{ site.baseurl }}/images/01_CopilotUsingWebsites/35.png)

3. **Clicking on Create** will generate the topic for us with the trigger and question derived from the description.
   ![Create Topic]({{ site.baseurl }}/images/01_CopilotUsingWebsites/36.png)

4. The question provided by the user as a response to the question node is saved in the **LoanQuery** variable. Let's update the message node and add the **basic card** with an image to provide a better user experience.
   ![Basic Card]({{ site.baseurl }}/images/01_CopilotUsingWebsites/37.png)

5. Update the card with details like title and image URL.
   ![Card Details]({{ site.baseurl }}/images/01_CopilotUsingWebsites/38.png)

6. Add the **Generative Answers** node to fetch the answer to the user query from the farmers.gov site by:
    1. **Clicking on the + sign** to add a new node.
    2. Click on **Advanced option**.
    3. Select **Generative Answers**.
       ![Add Generative Answers]({{ site.baseurl }}/images/01_CopilotUsingWebsites/39.png)

7. Update the input to the Generative Answers node by:
    1. **Clicking on the >** in the Input field.
    2. Select the **LoanQuery** variable and assign it to the input field.
       ![Input LoanQuery]({{ site.baseurl }}/images/01_CopilotUsingWebsites/40.png)

8. Edit the datasource and add the external site URL by:
    1. **Click on Edit** in the data source.
    2. Select **Add Knowledge**.
       ![Add Knowledge]({{ site.baseurl }}/images/01_CopilotUsingWebsites/41.png)

9. This will open up the pop-up where we can select the type of Knowledge base. We will go with **Public Websites**.
   ![Select Public Websites]({{ site.baseurl }}/images/01_CopilotUsingWebsites/42.png)

10. Mention the external site URL: https://www.farmers.gov in the **webpages link** and **click on Add**.
    ![Webpage Link]({{ site.baseurl }}/images/01_CopilotUsingWebsites/43.png)

11. **Click on Add** to finalize the knowledge for this topic.
    ![Add URL]({{ site.baseurl }}/images/01_CopilotUsingWebsites/44.png)

12. Finally, to ensure that the Farming Loans topic relies only on the recently added knowledge site, we will:
    1. **Click on Edit** in the Data source section.
    2. **Toggle on the Search only selected sources**.
    3. **Check the Farmers site URL**.
    4. **Click on Save**.
       ![Save Data Source]({{ site.baseurl }}/images/01_CopilotUsingWebsites/45.png)

This completes the configuration of all three topics and enables dynamic routing of topics using Generative AI

## Step 6 : Set Security to No Authentication

Before we test the Copilot, we need to ensure that the Copilot's security settings are configured correctly. For this demo, we will set the security to "No Authentication" as the Copilot will be embedded in a public facing Power Pages site.

1. Navigate to the **Settings** of your Copilot.

2. In the Settings page, select **Security** from the left-hand navigation menu.
   
3. In the Security section, toggle the **Authentication** setting to **No Authentication**.
   
4. Click on **Save** to apply the changes.
   ![Authentication]({{ site.baseurl }}/images/01_CopilotUsingWebsites/50.png)

By setting the security to "No Authentication," we ensure that users can access and interact with the Copilot without needing to log in.

## Step 7 : Add the Copilot to Power Pages

To enhance our Farming Information Hub, we will integrate the Copilot Assistant into our Power Pages site. This integration allows users to interact with the Copilot directly from the web page, providing a seamless and interactive experience.
We can 	get the URL that will be added to the IFrame of Power Pages by : 
1. Navigate to the **Channels** tab of the Copilot.
2. Select **Custom website**
3. Fetch the **iframe src** URL
 ![IframeURL]({{ site.baseurl }}/images/01_CopilotUsingWebsites/55.png)
we will add this to the html code of power Pages by opening the page in Visual Studio Code. 

```html
<div class="sidebar">
   <div class="farmerAssistant">
      <h2 class="farmerAssistant-title">Ask Farmer Assistant</h2>
      <div class="copilot-container">
         <iframe frameborder="0" src="https://copilotstudio.microsoft.com/environments/Default-b3629ed1-3361-4ec4-a2b7-5067/bots/cr06f_copilot1/webchat?__version__=2" style="width: 100%; height: 100%; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);"></iframe>
      </div>
   </div>
</div>       
```

**Power Pages - Full HTML Used**
```html
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Farming Information Hub</title>
      <link rel="stylesheet" href="styles.css">
   </head>
   <body>
      <div class="container">
         <div class="main-column">
            <header class="header">
               <div class="header-content">
                  <img src="/farmer.png" alt="Header Image" class="header-img">
                  <div class="header-text">
                     <h1>Farming Information Hub</h1>
                     <p>Your one-stop destination for all farming-related information</p>
                  </div>
               </div>
            </header>
            <main class="main-content">
               <section class="card-row">
                  <section id="farming-queries" class="card">
                     <h2>Farming Queries</h2>
                     <p>Get detailed farming information from the USDA. Our Copilot Assistant can help you find the best farming practices, crop management tips, and more.</p>
                     <img src="/farming.png" alt="Farming Queries" class="responsive-img">
                  </section>
                  <section id="weather" class="card">
                     <h2>Weather Updates</h2>
                     <p>Check real-time weather updates for your farming location from Weather.com. Stay informed about the current weather conditions to plan your farming activities better.</p>
                     <img src="/weather.png" alt="Weather" class="responsive-img">
                  </section>
               </section>
               <section class="card-row single-card">
                  <section id="loans" class="card">
                     <h2>Loan Facilities</h2>
                     <p>Explore available loan options from Farmers.gov. Our Copilot Assistant can guide you through the various loan facilities available to support your farming needs.</p>
                     <img src="/bank.png" alt="Loans" class="responsive-img">
                  </section>
               </section>
            </main>
         </div>
         <div class="sidebar">
            <div class="farmerAssistant">
               <h2 class="farmerAssistant-title">Ask Farmer Assistant</h2>
               <div class="copilot-container">
                  <iframe frameborder="0" src="https://copilotstudio.microsoft.com/environments/Default-b3629ed1-3361-4ec4-a2b7-506a/bots/cr06f_copilot1/webchat?__version__=2" style="width: 100%; height: 100%; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);"></iframe>
               </div>
            </div>
         </div>
      </div>
   </body>
</html>
```

**Power Pages - Full CSS Used**
```css 
body {
	background-color: #f0f0f3;
	font-family: 'Arial', sans-serif;
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: stretch;
	min-height: 100vh;
	height: 100vh;
}

.container {
	display: flex;
	width: 100%;
	height: 100%;
	background: #e0e0e0;
	box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
}

.main-column {
	flex: 3;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
}

.sidebar {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	background: #e0e0e0;
	padding: 20px;
	height: 100%;
}

.header {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
	background: #e0e0e0;
	border-radius: 20px;
	box-shadow: inset 10px 10px 20px #bebebe, inset -10px -10px 20px #ffffff;
	width: 100%;
	margin-bottom: 20px;
}

.header-content {
	display: flex;
	align-items: center;
}

.header-text {
	text-align: center;
	margin-left: 20px;
}

.header h1 {
	margin: 0;
	font-size: 2.5em;
	color: #333;
}

.header p {
	margin: 10px 0 0;
	font-size: 1.2em;
	color: #666;
}

.header-img {
	width: 110px;
	height: auto;
	border-radius: 10px;
}

.main-content {
	width: 100%;
	flex-grow: 1;
}

.card-row {
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 10px;
}

.single-card {
	display: flex;
	justify-content: center;
	width: 100%;
}

.card {
	background: #e0e0e0;
	border-radius: 20px;
	box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
	padding: 20px;
	width: 48%;
	text-align: center;
	margin-bottom: 10px;
}

.single-card .card {
	width: 50%;
}

.card h2 {
	font-size: 1.8em;
	color: #333;
	margin-top: 0;
}

.card p {
	font-size: 1.1em;
	color: #666;
}

.responsive-img {
	width: 110px;
	height: auto;
	border-radius: 10px;
	margin-top: 20px;
}

.footer {
	display: none;
}

.copilot-container {
	width: 100%;
	height: calc(100vh - 60px);
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.farmerAssistant-title {
	font-size: 26px;
	text-align: center;
}

.navbar {
	display: none !important;
}
```

## Step 8 : Test the Copilot

Now let's test the Copilot end to end.

1. We will first want to get information about the **farming query related to the ideal conditions for corn farming** and the Copilot has taken the user query to fetch the generative results from the USDA site.
   <div class="center-image-container">
     <img src="{{ site.baseurl }}/images/01_CopilotUsingWebsites/51.png" alt="Loan Query">
     <div class="zoom-message">Zoom in</div>
   </div>

2. It displays back the **Soil and Climate condition** response to the user query as below:
   <div class="center-image-container">
     <img src="{{ site.baseurl }}/images/01_CopilotUsingWebsites/52.png" alt="Soil and Climate">
     <div class="zoom-message">Zoom in</div>
   </div>

3. Now that we know the climate condition needed for Corn Farming, let's try to get the **current climate conditions** using the below query. It will leverage generative AI to fetch the details from the **Weather.com site** and even show a citation link to the page where the current climate condition of the farming location will be provided.
   <div class="center-image-container">
     <img src="{{ site.baseurl }}/images/01_CopilotUsingWebsites/53.png" alt="Current Weather Query">
     <div class="zoom-message">Zoom in</div>
   </div>

4. Finally, let's see if we can get information about the **available loan options** to proceed with the farming. We can see that it successfully orchestrates the conversation to the appropriate topic and uses generative answers to fetch the details from the **farmers.gov site**.
   <div class="center-image-container">
     <img src="{{ site.baseurl }}/images/01_CopilotUsingWebsites/54.png" alt="Loan Query">
     <div class="zoom-message">Zoom in</div>
   </div>
## Conclusion

In this guide, we've walked through the process of creating a powerful **Farming Assistant chatbot** using Microsoft Copilot Studio. By leveraging **Generative Answers** and **Generative Topic Orchestration**, we've enabled the Farming Assistant to provide seamless, contextually accurate information across various farming-related queries. This assistant integrates data from three distinct public websites, ensuring comprehensive support for farmers:

1. **USDA** for detailed farming information and best practices.
2. **Weather.com** for real-time weather updates pertinent to farming locations.
3. **Farmers.gov** for information on available loan options and financial assistance.

By enabling **dynamic topic orchestration** through **Generative AI** and configuring targeted data sources, we've created a robust and intelligent Copilot that can dynamically handle user queries and provide precise answers grounded in reliable information.



<style>
.center-image-container {
    text-align: center;
    position: relative;
    display: inline-block;
}

.center-image-container img {
    max-width: 100%;
    height: auto;
}

.zoom-message {
    text-align: center;
    font-size: 14px;
    color: #666;
    margin-top: 10px;
}
</style>