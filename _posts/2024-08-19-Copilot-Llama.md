---
layout: post
title:  Building a Sales Analyzer Copilot using Dataverse and Llama Model in Azure AI Studio
description: We will see the steps needed to create a Llama powered sales analyzer than can fetch data from dataverse and provide business insights.
date: 2024-08-19 15:01:35 +0300
image: '/images/FrontImage/13.png'
tags: [copilot]
---

## Table of Contents
{: .no_toc}

* TOC
{: toc}

## Introduction

Integrating cutting-edge AI models, such as the Llama model, with robust platforms like Azure AI Studio and Microsoft Dataverse, offers a sophisticated yet easy to build solution for analyzing sales data. This powerful combination allows businesses to transform raw data into meaningful insights and respond promptly to user queries.

In this blog, we will explore how to leverage the Llama model within Azure AI Studio, alongside Microsoft Copilot, to read and analyze sales data stored in Dataverse. We will guide you through setting up this integration to create a system that efficiently processes user questions and delivers insightful answers directly from your sales data.


## Llama Model

Llama (Large Language Model for AI) is a groundbreaking language model from Meta AI designed to understand and generate human-like text. It's adept at processing natural language inputs and can provide contextually relevant responses. When integrated with Azure AI Studio, Llama becomes a formidable tool for interpreting and analysing data, allowing businesses to address user queries with precision and depth.

## Understanding the Use Case

**Use Case Overview:** We aim to build a system that allows users to query their sales data stored in Dataverse using natural language. This system will utilize the Llama model to understand and process these queries and Microsoft Copilot to facilitate interactive conversations.

The control flow is as follows : 

- **User Queries:** User asks sales-related questions to the Copilot.
- **Data Retrieval:** Copilot fetches Q1 sales data from the Sales Information Table in Dataverse.
- **Llama Model Analysis:** Copilot sends the data to the Llama model in Azure AI Studio for analysis.
- **Generate Response:** Llama model analyzes the data and generates a contextual response.
- **Display Answer:** Copilot displays the generated response to the user.

![Q1 Sales Data](\images\13_CopilotLlama\0.gif)

## Prerequisites

To successfully implement this solution, you will need:
1. Azure Subscription: Access to Azure AI for configuring the Llama model.
2. Copilot Studio: Access to copilot studio to build custom copilots.
3. Dataverse Environment: Structured and accessible sales data within Dataverse.

## Demo 

Watch the demo video below to see how the Sales Analysis Copilot works. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/80jM-w5Jvd8?vq=hd1080" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Step 1: Preparing Your Dataverse Environment

Start by ensuring your sales data is well-structured and available in Dataverse. We have created a table named “Q1 Sales Data” which contains the First quarter sales details for 4 companies . 

![Q1 Sales Data](\images\13_CopilotLlama\1.png)

## Step 2: Setting Up Azure AI Studio

Azure AI Studio will be used to develop, train, and manage the Llama model. So as to work with the AI studio, we need to first create an instance of AI Services which we can do by navigating to the Azure AI Services in the azure portal . 

1. **Click on** **Create**. 


   ![Create AI Services](\images\13_CopilotLlama\2.png)


2. Specify the Resource Group, Name  and other details for the AI Services instance . **Click on** **Review+Create** which will run the validation and create the AI Services instance for us.


   ![Review and Create](\images\13_CopilotLlama\3.png)


3. Head over to the newly created Azure AI Services instance and **click on** **Goto Azure AI Studio**.
 
   ![Goto Azure AI Studio](\images\13_CopilotLlama\4.png)


4. Once we are in Azure AI Studio , we can create an AI Hub which will act as a top level container for all resources created in the AI Studio. **Click on** **New hub**.


   ![New Hub](\images\13_CopilotLlama\4_1.png)


5. Specify the details like Name, Subscription, Resource group, Location and the AI Service Instance name. **Click on** **Next**. 


   ![Hub Details](\images\13_CopilotLlama\4_2.png)


6. **Click on** **Create** to provision the AI Hub.


   ![Create Hub](\images\13_CopilotLlama\4_3.png)


7. We can see that the AI hub is created, Within the hub lets create a project as well so that we can compartmentalize different model deployments to different projects. **Click on** **New Project**.

   ![New Project](\images\13_CopilotLlama\4_4.png)

8. Let’s provide a Project Name and **click on** **Create a Project**.

    ![Project Name](\images\13_CopilotLlama\4_5.png)

9. Now that the AI Hub and Project is created , lets select the  Model catalog from the left pane. Azure AI Studio offers a diverse range of AI models tailored to meet various business needs and enhance data analysis capabilities. 

   For this demo, we will be deploying an instance of the Meta Llama 3 - 8 B model where 3 stands for the version number of the model and 8 B refers to the number of parameters in the model, which is 8 billion. Parameters are the components of the model that get adjusted during training to learn patterns from the data.
   Let’s select this model.

    ![Select Model](\images\13_CopilotLlama\5.png)

10. **Click on** **Deploy** to create the instance of the selected Llama model. 

     ![Deploy Model](\images\13_CopilotLlama\6.png)

11. We can choose to have Azure AI Content safety filters along with the model which would incur charges through Azure AI Content Safety services. However, this is optional. 

     ![Content Safety](\images\13_CopilotLlama\7.png)

12. Ensure that you have selected the recently created project , Select **Subscribe and Deploy**. 

     ![Subscribe and Deploy](\images\13_CopilotLlama\8.png)

13. Specify the Deployment name and **click on** **Deploy** to finalize the deployment of the model. 

     ![Deployment Name](\images\13_CopilotLlama\9.png)

14. It would take some time for the model deployment to complete. Once done, 
    1. In the deployments left side pane, we can see that the Provisioning State is succeeded. 
    2. We will copy the Key value as it is needed for authentication from copilot
    3. We will now **click on** **consume** tab so as to copy the REST endpoint for this model. 

     ![Provisioning State](\images\13_CopilotLlama\11.png)

15. In the consume tab, 
    1. Copy the REST endpoint which we will use for invoking the model from the copilot.
    2. There is also samples of how the input prompt for Llama model looks like which we can follow while creating the prompt in copilot. 

     ![Consume Tab](\images\13_CopilotLlama\12.png)

## Step 3: Create the Copilot in Copilot Studio

1. Head over to [Copilot Studio](https://copilotstudio.microsoft.com/) and 
   1. **Click on** **Create**.
   2. This will provide us the option to create a copilot based on an existing template on create a blank copilot from scratch, Lets select **New copilot**.

    ![Create Copilot](\images\13_CopilotLlama\13.png)

2. This will take us to the page where we can
   1. Describe the copilot functionality and provide any specific instructions to the copilot. 
   2. Once done, **click on** **Create** to provision the copilot. 

    ![Describe Copilot](\images\13_CopilotLlama\14.png)

## Step 4: Enable Generative selection of topics

1. The copilot is now created. We can then make the needed configuration changes
   1. **Click on** **Edit**, edit the copilot details like name, icon and description. 
   2. **Click on** **Settings** to enable the Generative selection of topics so that without relying on triggers, the topics will be auto selected based on user conversation resulting in a much smoother user experience.

    ![Enable Generative Selection](\images\13_CopilotLlama\15.png)   

2. To enable the automatic detection of topics from user interaction:
   1. **Click on** **Generative AI**.
   2. Select **Generative(preview)**.
   3. **Click on** **Save** to update the settings.
   4. **Click on** Close icon to go back to the home page of this custom copilot.

    ![Generative AI Settings](\images\13_CopilotLlama\15_1.png)

## Step 5 : Create Topics

1. Now let’s go ahead and create the topics that will automatically redirect the conversation flow to appropriate topics based on the question user posts. 
   - **Click on** **Topics** from the navigation menu. 
2. To add the topic, we can either go with the option to create a blank topic or use Copilot to create the topic with initial set of prepopulated conversation nodes based on the topic description that we provide. 
   - Let’s **Click on** **Add a Topic** and 
   - Select **Create from description with Copilot**. 

    ![Add Topic](\images\13_CopilotLlama\16.png)

3. Let’s provide the below topic description details in the pop up that opened when we clicked the Add topic button previously.
Then, **Click on** **Create**, which will provision the topic skeleton based on the provided description. 

    ![Topic Description](\images\13_CopilotLlama\17.png)

4. Thus, we have the basic topic created with an automatic trigger as well as a question to the user which are generated using the description provided.

    ![Topic Created](\images\13_CopilotLlama\18.png)

5. Now lets add the dataverse connector action which will fetch the Q1 Sales data information from the table. 
   1. Select **Call an action**.
   2. From the Connector tab, select **List rows from selected environment**.

    ![List Rows](\images\13_CopilotLlama\19.png)

6. Create the connection and **Click on** **Submit**.

    ![Create Connection](\images\13_CopilotLlama\20.png)

7. We can now configure the Dataverse connection by 
   1. Selecting the Environment and Table.
   2. Mention the logical name of the columns to be retrieved.

    ![Configure Dataverse](\images\13_CopilotLlama\21.png)

8. We can see that the output of the Dataverse connector action is a table, and we need to define a variable to hold the table data. For this we will 
   1. Select the right arrow against the value field and 
   2. **Click on** **Create a new variable** and name it as *varSalesTable*.

   ![Create Variable](\images\13_CopilotLlama\22.png)

9. The output of the Dataverse Table Connector(*varSalesTable*) will contain lots of system columns as well . We will need to format the table to filter and ensure only the needed columns are present. 
To do this let’s initialize a variable(*varSalesDetails*) to hold the new filtered output of the Dataverse connector.

    ![Initialize Variable](\images\13_CopilotLlama\39.png)

10. We will then add the below formula which will filter the output to create a subset of the table and store it in the variable. It does this by looping through the previous Dataverse connector output and fetching only the columns that we have mentioned in the expression.

	```
	ForAll(
		Topic.varSalesTable,
		{
			Month: ThisRecord.cr06f_month,
			Product: ThisRecord.cr06f_product,
			SalesAmount: ThisRecord.cr06f_salesamount
		}
		)
	```
     ![Filtered Output](\images\13_CopilotLlama\40.png)

11. If we were to test and output this variable(*varSalesDetails*) value in the test pane, we will get the table output as : 

	```
	[{“Month”:“January”,“Product”:“AeroFusion Blender”,“SalesAmount”:7500},
	{“Month”:“January”,“Product”:“SolarX PowerPack”,“SalesAmount”:6200},
	{“Month”:“January”,“Product”:“QuantumLight Glasses”,“SalesAmount”:5600}]
	```
We will do one more formatting of this output to serialize this table into a string readable format as shown below **< Month >: < Product >: < Sales Amount >** . The reason for doing this is because the LLM input should be a string and hence the table has to be serialized to the string format. 

	```
	January:AeroFusion Blender:7500, 
	January:SolarX PowerPack:6200, 
	January:QuantumLight Glasses:5600, 
	January:EcoWave Cleanser:4300, 
	February:AeroFusion Blender:8100, 
	February:SolarX PowerPack:5900, 
	February:QuantumLight Glasses:6300,

	```
To do this, lets add another variable(*varSerializedSalesData*) and set its formula to

	```
	Concat(Topic.varSalesDetails, Month & ":" & Product & ":" & SalesAmount, ", ")

	```
This way, from the previous filtered table, we will concat the Product and sales details in the readable string format which can be shared as an input to the Llama Prompt
   
   ![Filtered Output](\images\13_CopilotLlama\41.png)

## Step 6: Add an HTTP Request for Llama Model

Now let’s add an HTTP Request so that we can call the Llama deployment endpoint in Azure AI Studio.

![HTTP Request](\images\13_CopilotLlama\29.png)

## Step 7: Configure the HTTP Request 

1. Paste the REST URL we copied from azure ai studio to the URL field.
2. Change the Method to POST.
3. **Click on** **Edit** to update the Header and Body.

![Edit Request](\images\13_CopilotLlama\30.png)

## Step 8: Add Header Properties

1. This will open up the HTTP Request Properties pane where : 
   1. We will **click on** **Add** so that it adds a Key Value Pair field section 
   2. Add the **Authorization** text to the Key and **Bearer {Key copied from Azure AI Studio}** to the value field

    ![Add Authorization](\images\13_CopilotLlama\31.png)

2. We have to add one more header property 
   1. **Click on** **Add** once again so that we can add the next Key Value Pair
   2. Add the **Content-Type** text to the Key and **application/json** to the value field

![Add Content-Type](\images\13_CopilotLlama\32.png)

## Step 9: Add the Body to the Request 

1. Now we have to add the Body which is the Llama prompt to the Request for which we will 
   1. **Click on** the Body field and 
   2. Select **JSON Content**.

    ![Body Content](\images\13_CopilotLlama\32_2.png)

2. This will open up the JSON/Formula box just below the body field. If we were sending a static text as body, we could have selected JSON. But since, we need to dynamically pass the user query as well into the prompt,we will select Formula.

    ![Formula](\images\13_CopilotLlama\33.png)

3. We can now add the prompt by concatenating the User query along with the Dataverse table sales data and passing it to the content attribute of the prompt. The role attribute indicates that  this message is an input from the user. 
Thus we have created the prompt as expected by Llama. Now lets head back to the copilot designer and define the response data type. 

    ![Configure Prompt](\images\13_CopilotLlama\34.png)

4. We will now configure the response data type field by : 
   1. **Clicking the** right arrow and
   2. Select **From sample data**.

    ![Response Data Type](\images\13_CopilotLlama\35.png)

   In general the output of Llama 3 would look like below:

	```json
		{
			"choices": [
				{
					"finish_reason": "stop",
					"index": 0,
					"logprobs": null,
					"message": {
						"content": "Output Text",
						"role": "assistant",
						"tool_calls": null
					},
					"stop_reason": 128009
				}
			],
			"created": 1718285835,
			"id": "cmpl-7443f01686d24a52924850b34655bf22",
			"model": "Meta-Llama-3-8B-Instruct",
			"object": "chat.completion",
			"usage": {
				"completion_tokens": 108,
				"prompt_tokens": 51,
				"total_tokens": 159
			}
		}
	```

5. **Lets add this sample output data by clicking on** **Getting schema from sample JSON**.
	1. **Paste** the above JSON Output content and
	2. **Click on** **Confirm**.
	3. We will add a variable named *varLlamaOutput* to hold the returned output value which is of record datatype.
  
    ![Response Data Type](\images\13_CopilotLlama\36.png)

## Step 10: Display the Generative Answer

Finally lets show the generative answer result from the Llama model as a basic card. As we can see in the output schema, the generative answer will be present in the content key value pair which is nested within the choice and message parent . We will get this output using the Power Fx formula:

```
	First(Topic.varLlamaOutput.choices).message.content
```
	
![Response Data Type](\images\13_CopilotLlama\37.png)

Thus we have completed the creation of the copilot which will invoke Llama model to helps us derive meaningful insights from the Q1 Sales Data present in the dataverse table.

## Step 11: Test the Copilot

Lets test the copilot by initiating the conversation. We will ask few sales related questions to the copilot.

![Test Copilot](\images\13_CopilotLlama\38.png)

We will also try to ask a bit more complex question which involves calculating the cumulative sales across different records and we can see that Llama has intelligently provided us back with the contextual response.

![Complex Question](\images\13_CopilotLlama\39_1.png)

## Conclusion

By following these steps, you can successfully leverage the Llama model within Azure AI Studio and Microsoft Dataverse to create a system that efficiently processes user questions and delivers insightful answers from your sales data. This integration not only enhances data analysis capabilities but also provides a seamless and interactive user experience through Microsoft Copilot. With the power of AI, businesses can now make informed decisions based on real-time data insights, driving growth and innovation.
