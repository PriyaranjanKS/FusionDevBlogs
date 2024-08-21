---
layout: post
title:  Cafeteria Feedback Copilot that uses AI Prompt Action for Sentiment Analysis
description: We will see the steps needed to create an intelligent Feedback Analyzer Copilot that uses AI prompt action to analyze the user sentiments and escalate it if needed
date: 2024-08-21 15:01:35 +0300
image: '/images/FrontImage/15.jpg'
tags: [copilot]
---

## Table of Contents
{: .no_toc}

* TOC
{: toc}

## Introduction
In this blog, we will walk through the process of creating a custom Cafeteria Feedback Copilot using Copilot Studio. This Copilot will analyze user feedback using the AI Prompt action, perform sentiment analysis, automatically escalate negative feedback, and store positive feedback in Dataverse.

## Process Flow
1. **User Interaction**: The user initiates the conversation with the Copilot by providing feedback about the cafeteria.
2. **Automatic Topic Selection**: Based on the user's input, the Copilot automatically detects the relevant topic and directs the conversation accordingly.
3. **Feedback Collection**: The user is presented with an adaptive card to input specific details such as the date and their feedback.
4. **Sentiment Analysis**: Once the feedback is submitted, the Copilot uses an AI Prompt action to analyze the sentiment of the feedback in real-time.
5. **Action Based on Sentiment**:
   - **Negative Feedback**: If the sentiment is negative, the feedback is escalated to the concerned team via email, and the details are logged in Dataverse.
   - **Positive Feedback**: If the sentiment is positive, the feedback is simply logged in Dataverse.
6. **User Confirmation**: The user receives a confirmation message indicating the action taken on their feedback.

This process ensures a seamless and responsive interaction where the user’s feedback is promptly analyzed and acted upon.

![Step 2 Image 1](\images\17_CopilotFeedbackAnalyzer\0.gif)

## Prerequisites
- Access to [Copilot Studio](https://copilotstudio.microsoft.com/).
- Dataverse configured for storing feedback.
- AI Builder Credits for using AI Prompt Action
- Images stored in a location like Azure Blob Storage which can be used in Adaptive Cards

## Demo
Watch the demo video below to see how the Smart Feedback Analyzer works. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/XiTWd3eG12E?vq=hd1080" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Step 1 : Create the Dataverse Table
We will be storing the positive and negative feedbacks in the dataverse table named *`RestaurantFeedbacks`* which contains the columns *`Feedback`*,*`Feedback Date`*,*`Sentiment`*
![Step 2 Image 1](\images\17_CopilotFeedbackAnalyzer\3.png)

### Step 2: Create the Custom Copilot
1. Head over to [Copilot Studio](https://copilotstudio.microsoft.com/) and **click** on **Create**.

    ![Step 2 Image 2](\images\17_CopilotFeedbackAnalyzer\3_1.png)

2. You will have the option to create a copilot based on an existing template or create a blank copilot from scratch. Let's select **New copilot**.

    ![Step 2 Image 2](\images\17_CopilotFeedbackAnalyzer\3_2.png)

3. This will take you to the page where you can:
   1. **Describe the copilot functionality** and provide any specific instructions.
   2. **Click** on **Create** to provision the copilot.

    ![Step 2 Image 1](\images\17_CopilotFeedbackAnalyzer\4.png)

### Step 3: Enable Generative Selection of Topics

1. The copilot is now created. Next, we need to make some configuration changes.
   1. **Click** on **Edit** to update the copilot's name, icon, and description.
   2. **Click** on **Settings** to enable the **Generative selection of topics** so that topics are auto-selected based on user conversations, resulting in a smoother user experience.

    ![Step 3 Image 1](\images\17_CopilotFeedbackAnalyzer\5.png)

2. To enable the automatic detection of topics from user interaction:
   1. **Click** on **Generative AI**.
   2. **Select** **Generative**.
   3. **Click** on **Save** to update the settings.
   4. **Click** on the **Close** icon to return to the home page of this custom copilot.

    ![Step 3 Image 2](\images\17_CopilotFeedbackAnalyzer\6.png)

### Step 4: Create Topics

1. Now, let’s go ahead and create the topics that will automatically redirect the conversation flow to appropriate topics based on the user's questions.
   1. **Click** on **Topics** from the navigation menu.
   2. **Click** on **Add a Topic**.
   3. You can either create a blank topic or use Copilot to create the topic with an initial set of prepopulated conversation nodes based on the topic description.**Select** **Create from description with Copilot**.

    ![Step 4 Image 1](\images\17_CopilotFeedbackAnalyzer\7.png)

2. Let’s provide the topic description details in the pop-up that appears.

    ![Step 4 Image 2](\images\17_CopilotFeedbackAnalyzer\8.png)

3. **Click** on **Create** to provision the topic skeleton based on the provided description.

   Thus, we have the basic topic created with an automatic trigger. Now, let's add an adaptive card to accept the user input, such as feedback date and cafeteria feedback.

    ![Step 4 Image 3](\images\17_CopilotFeedbackAnalyzer\9.png)

   We will add the below adaptive card JSON schema to the Adaptive Card Node Properties as shown below. 
	```
	{
		"$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
		"type": "AdaptiveCard",
		"version": "1.4",
		"backgroundImage": {
			"url": "https://adaptivecardsbot.blob.core.windows.net/imagestore/108265.jpg",
			"fillMode": "cover",
			"horizontalAlignment": "center",
			"verticalAlignment": "center"
		},
		"body": [
			{
				"type": "Container",
				"backgroundColor": "#E0FFFF",
				"items": [
					{
						"type": "ColumnSet",
						"columns": [
							{
								"type": "Column",
								"width": "auto",
								"items": [
									{
										"type": "Image",
										"url": "https://adaptivecardsbot.blob.core.windows.net/imagestore/cafeteria.png",
										"size": "Small",
										"horizontalAlignment": "Left"
									}
								]
							},
							{
								"type": "Column",
								"width": "stretch",
								"items": [
									{
										"type": "TextBlock",
										"text": "Cafeteria Food Feedback",
										"weight": "Bolder",
										"size": "Large",
										"wrap": true,
										"horizontalAlignment": "Left",
										"color": "Default",
										"spacing": "Medium"
									}
								]
							}
						]
					}
				],
				"style": "emphasis",
				"bleed": true,
				"spacing": "None"
			},
			{
				"type": "TextBlock",
				"text": "Please provide your feedback for the food served today.",
				"wrap": true,
				"weight": "Bolder",
				"color": "Good",
				"spacing": "Medium"
			},
			{
				"type": "TextBlock",
				"text": "Date",
				"weight": "Bolder",
				"wrap": true,
				"spacing": "Small"
			},
			{
				"type": "Input.Date",
				"id": "feedbackDate",
				"placeholder": "dd-mm-yyyy"
			},
			{
				"type": "TextBlock",
				"text": "Your Feedback",
				"weight": "Bolder",
				"wrap": true,
				"spacing": "Small"
			},
			{
				"type": "Input.Text",
				"id": "feedbackText",
				"isMultiline": true,
				"placeholder": "Enter your feedback here...",
				"maxLength": 500
			}
		],
		"actions": [
			{
				"type": "Action.Submit",
				"title": "Submit Feedback"
			}
		],
		"style": "default"
	}


	```
     ![Step 4 Image 5](\images\17_CopilotFeedbackAnalyzer\10.png)

4. As we can see, the user inputted values for date and feedback are stored in the *`feedbackDate`* and *`feedbackText`* variables, which we will use later.

    ![Step 4 Image 6](\images\17_CopilotFeedbackAnalyzer\11.png)

### Step 5: Add AI Prompt Action

1. Now, let's add the AI Prompt action:
   1. **Select** **Call an action**.
   2. **Click** on **Basic Actions**.
   3. **Select** **Create a prompt**.

    ![Step 5 Image 2](\images\17_CopilotFeedbackAnalyzer\12.png)

2. This will open a pop-up window where we can define the prompt. We will:
   1. Provide a name for the prompt (e.g., **Cafeteria Feedback Analyzer**) so that we can later select it by this name.
   2. Create an input with the name **Feedback** so that we can dynamically pass the user input to this variable.
   3. Add the prompt that will analyze the feedback in the **Prompt** section and **click** on **Insert** to add the *`Feedback`* variable to the prompt.
   4. **Click** on **Save custom prompt** to make it available in the Copilot canvas.

    ![Step 5 Image 3](\images\17_CopilotFeedbackAnalyzer\13.png)

3. Now we can add the prompt to the conversation flow by selecting its name:
   1. **Select** **Call an action**.
   2. From **Basic Actions**, search for the recently created prompt by its name.
   3. **Select** the **Cafeteria Feedback Analyzer** prompt.

    ![Step 5 Image 4](\images\17_CopilotFeedbackAnalyzer\14.png)

4. Select the *`feedbackText`* variable, which contains the user inputted feedback, and assign it as the input to the Prompt action.

    ![Step 5 Image 5](\images\17_CopilotFeedbackAnalyzer\15.png)

5. We will also define a variable (*`feedbackSentiment`*) to hold the output of the AI Prompt action so that we can check the sentiment of the user feedback and take action on it.

    ![Step 5 Image 6](\images\17_CopilotFeedbackAnalyzer\16.png)

### Step 6: Escalate Negative Feedback
1. Now, let's add a condition to check whether the feedback analyzed by the AI Prompt action is negative or positive by adding the condition node.

    ![Step 6 Image 1](\images\17_CopilotFeedbackAnalyzer\17.png)

2. Since *`feedbackSentiment`* is a record variable, we need to get the *`feedbackSentiment.text`* property, which contains the feedback analysis value. We will then check if it is negative and, if so, escalate the feedback to the concerned users.

    ![Step 6 Image 2](\images\17_CopilotFeedbackAnalyzer\18.png)

3. To escalate the feedback, let's add an **Office 365 Mail** action:

   1. **Select** **Call an action**.
   2. From the **Connector** tab, search for **Office 365 Mail** connectors.
   3. **Select** **Send an email (V2)** action.

    ![Step 6 Image 3](\images\17_CopilotFeedbackAnalyzer\19.png)

4. Now, configure the Office 365 Mail connector:
   1. Set the **To** and **Escalation Subject** fields.
   2. In the **Body**, add the mail content and concatenate it with the user feedback present in the *`feedbackText`* variable using the **Concatenate** expression.
   3. Add an output variable to the Connector action.

    ![Step 6 Image 4](\images\17_CopilotFeedbackAnalyzer\20.png)

### Step 7: Save Feedback to Dataverse
1. Once escalated, let's save the negative feedback to the Dataverse backend using the Connector action:
   1. **Select** **Call an action**.
   2. From the **Connector actions** tab, search for the **Dataverse** connector.
   3. **Select** the **Add a new row to the selected environment** connector.

     ![Step 7 Image 1](\images\17_CopilotFeedbackAnalyzer\21.png)

2. Now, configure the Dataverse connector action:
   1. Set the environment and table name.
   2. Select the `feedbackText` variable, which contains the User Feedback.
   3. **Select** **Advanced inputs** to add the remaining data that needs to be saved.

    ![Step 7 Image 2](\images\17_CopilotFeedbackAnalyzer\22.png)

3. Add additional inputs like Feedback Date and Feedback Sentiments retrieved from the AI prompt action to save them to Dataverse.

    ![Step 7 Image 3](\images\17_CopilotFeedbackAnalyzer\23.png)

4. We will also add an image to provide the user confirmation that the feedback has been escalated to the concerned individuals.

    ![Step 7 Image 4](\images\17_CopilotFeedbackAnalyzer\23_5.png)

5. In the positive branch of the condition, let's repeat the same steps to save the positive feedback to Dataverse:
   1. **Select** **Call an action**.
   2. From the **Connector actions** tab, search for the **Dataverse** connector.
   3. **Select** the **Add a new row to the selected environment** connector.

    ![Step 7 Image 5](\images\17_CopilotFeedbackAnalyzer\24.png)

6. Now, configure the Dataverse connector action:
   1. Set the environment and table name.
   2. Select the `feedbackText` variable, which contains the User Feedback.
   3. **Select** **Advanced inputs** to add the remaining data that needs to be saved.

    ![Step 7 Image 6](\images\17_CopilotFeedbackAnalyzer\25.png)

7. Add additional inputs like Feedback Date and Feedback Sentiments retrieved from the AI prompt action to save them to Dataverse.

    ![Step 7 Image 7](\images\17_CopilotFeedbackAnalyzer\26.png)

8. We will also add an image to provide the user confirmation that the feedback has been saved.

    ![Step 7 Image 8](\images\17_CopilotFeedbackAnalyzer\27.png)

### Step 8: Publish the Copilot
1. We have now completed the Copilot development. Let's deploy this in Teams so that employees can start using it.
   1. **Select** **Channels** and select **Microsoft Teams**.
   2. **Select** **Turn on Teams** to enable Teams publishing channel.

    ![Step 8 Image 1](\images\17_CopilotFeedbackAnalyzer\28.png)

2. Now we have the option to edit the Copilot icon, details, and description that will be shown in Teams. Once done, **Click** on **Availability options**.

    ![Step 8 Image 2](\images\17_CopilotFeedbackAnalyzer\29.png)

3. We have different ways to publish the Copilot to Teams. We can download and upload the Zip to use the Copilot as a personal app, but we will publish it to the whole organization.

    ![Step 8 Image 3](\images\17_CopilotFeedbackAnalyzer\30.png)

4. **Select** **Submit for admin approval** so that the app can be approved by the admin from the Teams admin center.

   ![Step 8 Image 4](\images\17_CopilotFeedbackAnalyzer\31.png)

5. We can see that the app has come up for approval in the admin center. Let's approve it.

    ![Step 8 Image 5](\images\17_CopilotFeedbackAnalyzer\32.png)

6. It would take some time for the app to be globally published. Once available, let's search for the app from the Teams store and add it for our use.

    ![Step 8 Image 6](\images\17_CopilotFeedbackAnalyzer\33_1.png)

7. We will initiate the conversation with the copilot, and it provides the adaptive card for providing the feedback details.

   ![Step 8 Image 7](\images\17_CopilotFeedbackAnalyzer\34.png)

8. The feedback has been submitted, and we get a success message indicating the escalation process has been initiated.

    ![Step 8 Image 8](\images\17_CopilotFeedbackAnalyzer\35.png)

9. If we head to the Dataverse, we can see that the feedback has been logged.

    ![Step 8 Image 9](\images\17_CopilotFeedbackAnalyzer\36.png)

10. We can also see that the escalation mail has reached the concerned team.

    ![Step 8 Image 10](\images\17_CopilotFeedbackAnalyzer\37.png)

11. Now, let's test with positive feedback.

    ![Step 8 Image 11](\images\17_CopilotFeedbackAnalyzer\38.png)

12. The feedback has been submitted, and we get a positive feedback success message.

    ![Step 8 Image 12](\images\17_CopilotFeedbackAnalyzer\39.png)

13. If we check Dataverse, we can see that the positive feedback has also been logged.

    ![Step 8 Image 13](\images\17_CopilotFeedbackAnalyzer\40.png)

## Summary
In this blog, we have walked through the process of developing a Cafeteria Feedback Copilot that uses AI Prompt action to perform sentiment analysis on the fly and take appropriate actions based on the sentiment. This copilot can be a powerful tool for automating feedback analysis and ensuring prompt responses to user feedback in an organization.
