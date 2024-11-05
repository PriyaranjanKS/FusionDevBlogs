---
layout: post
title: PII Detection Copilot powered with AI Prompt Action
description: We will see the steps needed to create a Copilot that can detect patient's PII from the Dataverse table using AI Prompt Action 
date: 2024-10-29 15:01:35 +0300
image: '/images/FrontImage/18.jpg'
tags: [copilot]
---

## Table of Contents
{: .no_toc}

* TOC
{: toc}

## Introduction

Businesses can now automatically scan and detect sensitive PII within their customer registration Dataverse tables.This capability empowers organizations to flag records containing personal information and take appropriate actions, such as masking sensitive fields, notifying compliance teams.



## Overview <a name="overview"></a>

**PII Detection Copilot** helps businesses identify and take actions on personally identifiable information (PII) within their customer registration data.

### Features:
- **Fetch Data**: Retrieves customer registration data from Dataverse.
- **AI-Powered PII Identification**: Detects PII using **Azure OpenAI** prompt actions, including sensitive data like names, SSNs, credit card details, and medical information.

![Step 3 - Image 1](\images\18_CopilotPII\0_0.gif)

## Step-by-Step Guide to Building the Supply Chain Copilot <a name="step-by-step-guide"></a>

### Step 1: Set Up Dataverse for Customer Registration Data <a name="step-1"></a>

To begin, we need to organize our customer details in Dataverse. Create a table named **Customer Registration** with the following columns:
- Name
- MedicalID
- Preexisting Conditions
- Additional Details
- And any other needed fields.

### Step 2: Populate the Dataverse Table <a name="step-2"></a>

Enter the customer details into the Dataverse table. We have the below data for the demo.
![Step 3 - Image 1](\images\18_CopilotPII\0.png)

### Step 3: Creating the Copilot in Copilot Studio <a name="step-3"></a>

Head over to https://copilotstudio.microsoft.com/ and click on **Create**.

This will provide us the option to create a copilot based on an existing template or create a blank copilot from scratch. Let's select **New copilot**.

![Step 3 - Image 1](\images\18_CopilotPII\1.png)

This will take us to the page where we can:
1. **Describe** the copilot functionality and provide any specific instructions to the copilot. 
2. Once done, **click** on **Create** to provision the copilot.

![Step 3 - Image 2](\images\18_CopilotPII\2.png)

### Step 4: Enable Generative Selection of Topics <a name="step-4"></a>

The copilot is now created. We can then make the needed configuration changes.

1. **Click** on **Edit**, edit the copilot details like name, icon, and description. 
2. **Click** on **Settings** to enable the **Generative selection of topics** so that without relying on triggers, the topics will be auto-selected based on user conversation resulting in a much smoother user experience.

![Step 4 - Image 1](\images\18_CopilotPII\3.png)

To enable the automatic detection of topics from user interaction:

1. **Click** on **Generative AI**.
2. **Select** **Generative (preview)**.
3. **Select** **High – More precise** for content moderation.
4. **Click** on **Save** to update the settings.
5. **Click** on the **Close** icon to go back to the homepage of this custom copilot.

![Step 4 - Image 2](\images\18_CopilotPII\4.png)

### Step 5: Create Topics <a name="step-5"></a>

Now let’s go ahead and create the topics that will automatically redirect the conversation flow to appropriate topics based on the question user posts.

1. **Click** on **Topics** from the navigation menu. 
2. To add the topic, we can either go with the option to create a blank topic or use Copilot to create the topic with an initial set of prepopulated conversation nodes based on the topic description that we provide. 
3. Let’s **click** on **Add a Topic**.
4. **Select** **Create from description with Copilot**.

![Step 5 - Image 1](\images\18_CopilotPII\5.png)

Let’s provide the below topic description details in the pop-up that opened when we clicked the **Add topic** button previously. Then, **click** on **Create**, which will provision the topic skeleton based on the provided description.

![Step 5 - Image 2](\images\18_CopilotPII\6.png)

Thus, we have the basic topic created with an automatic trigger as well as a question to the user which is generated using the description provided. We can now add more conversation nodes.

As the first step, let's add an **adaptive card** to accept details from the user.

![Step 5 - Image 3](\images\18_CopilotPII\7.png)

Add the below adaptive card schema to the node properties so that it will provide the user with the option to enter the medical ID that we need to search for and also the specific PII information to search for.

```
{
    "type": "AdaptiveCard",
    "version": "1.4",
    "backgroundImage": {
        "url": "https://adaptivecardsbot.blob.core.windows.net/imagestore/GDPRBG.jpg"
    },
    "body": [
        {
            "type": "Image",
            "url": "https://adaptivecardsbot.blob.core.windows.net/imagestore/GDPR.png",
            "size": "Medium",
            "horizontalAlignment": "Center"
        },
        {
            "type": "TextBlock",
            "text": "GDPR PII Checker",
            "weight": "Bolder",
            "size": "Large",
            "color": "Accent",
            "spacing": "Medium",
            "horizontalAlignment": "Center"
        },
        {
            "type": "TextBlock",
            "text": "Enter the Medical ID and select the personal information you want to check for.",
            "wrap": true,
            "spacing": "Small",
            "size": "Medium",
            "horizontalAlignment": "Center",
            "weight": "Default"
        },
        {
            "type": "TextBlock",
            "text": "Medical ID",
            "weight": "Bolder",
            "size": "Medium",
            "color": "Good",
            "spacing": "Medium"
        },
        {
            "type": "Input.Text",
            "id": "medicalId",
            "placeholder": "Enter Medical ID",
            "style": "text",
            "spacing": "Small"
        },
        {
            "type": "TextBlock",
            "text": "Select Information to Check",
            "weight": "Bolder",
            "size": "Medium",
            "color": "Good",
            "spacing": "Medium"
        },
        {
            "type": "Input.Toggle",
            "id": "checkName",
            "title": "Name",
            "valueOn": "true",
            "valueOff": "false",
            "wrap": true,
            "spacing": "Small",
            "weight": "Default",
            "size": "Medium"
        },
        {
            "type": "Input.Toggle",
            "id": "checkCreditCard",
            "title": "Credit Card",
            "valueOn": "true",
            "valueOff": "false",
            "wrap": true,
            "spacing": "Small",
            "weight": "Default",
            "size": "Medium"
        },
        {
            "type": "Input.Toggle",
            "id": "checkSSN",
            "title": "Social Security Number (SSN)",
            "valueOn": "true",
            "valueOff": "false",
            "wrap": true,
            "spacing": "Small",
            "weight": "Default",
            "size": "Medium"
        },
        {
            "type": "Input.Toggle",
            "id": "checkConditions",
            "title": "Preexisting Conditions",
            "valueOn": "true",
            "valueOff": "false",
            "wrap": true,
            "spacing": "Small",
            "weight": "Default",
            "size": "Medium"
        }
    ],
    "actions": [
        {
            "type": "Action.Submit",
            "title": "Check GDPR Compliance",
            "style": "positive",
            "spacing": "Medium"
        }
    ]
}

```

![Step 5 - Image 4](\images\18_CopilotPII\8.png)

The user input details can be found in the output variables of the adaptive card, which we will be using down the line.

![Step 6 - Image 1](\images\18_CopilotPII\9.png)

### Step 6: Fetching Customer Details from Dataverse <a name="step-6"></a>

We now need to fetch the customer details from the Dataverse table for which we will add the **Dataverse connector action** by:

1. **Select** **Call an action**.
2. **Select** the **Connector** tab and **search** for **Dataverse**.
3. **Click** on **List rows from selected environment**.

![Step 6 - Image 1](\images\18_CopilotPII\10.png)

This will add the **Dataverse connector action** to the Copilot canvas, and let's configure the inputs for this action by:

1. Mentioning the **Environment** and **Table name** where the **Customer Registration Details Table** is present.
2. Specify the column names from the table that should be returned in the results .
    ```
	cr026_medicalid,cr026_name,cr026_preexistingconditions,cr026_additionaldetails
	```
3. Using the **Filter rows** field, mention the specific **MedicalID** that the user had input in the adaptive card to fetch the specific table record .
   ```
   Concatenate("cr026_medicalid eq '", Topic.medicalId,"'")
   ```
   

![Step 6 - Image 2](\images\18_CopilotPII\11.png)

The output of the **Dataverse connector** will be stored in the **varCustomerDetails** variable, which we will use for further processing in the subsequent steps.
![Step 6 - Image 2](\images\18_CopilotPII\12.png)

### Step 7: Adding AI-Prompt for PII Detection <a name="step-7"></a>

The output of the **Dataverse Table Connector** (**varCustomerDetails**) will contain lots of system columns as well. We will need to format the table to filter and ensure only the needed columns are present.

To do this, let’s initialize a variable (**varFilteredTable**) to hold the filtered output of the **Dataverse connector** .
```
ForAll(
    Topic.varCustomerDetails.value,
    {
        Name: ThisRecord.cr026_name,
        MedicalID: ThisRecord.cr026_medicalid,
        PreExistingConditions: ThisRecord.cr026_preexistingconditions,
        AdditionalDetails: ThisRecord.cr026_additionaldetails
    }
)
```

![Step 7 - Image 1](\images\18_CopilotPII\13.png)

If we were to test and output this variable value in the test pane, we will get the output as :
```
[{“AdditionalDetails”:“Credit Card: 1234-5678-9101-1121”,“MedicalID”:“15”,“Name”:“Graham Maynard”,“PreExistingConditions”:“Fatty Liver”}]
```

Since the table cannot be used as input to the **Prompt action**, we will do one more formatting of this output to serialize this JSON into a readable format: `<Name>: <MedicalID>: <Pre Existing Conditions>: <Additional Details>`.

To do this, let's add another variable and set its formula as below : 
```
Concat(Topic.varFilteredTable, Name & ": " & MedicalID & ":" & PreExistingConditions & " :" & AdditionalDetails)
```

This way, from the previous filtered table, we will concatenate the customer information in a readable format, which can be shared as an input to the AI Prompt.

![Step 7 - Image 2](\images\18_CopilotPII\14.png)

Now, let’s add the **AI prompt** using which we can check for the PII of a customer. To do this:

1. **Select** **Call an action**.
2. From **Basic Actions**, select **Create a prompt**.

![Step 7 - Image 3](\images\18_CopilotPII\15.png)

This will open up the **Prompt window** where we can name the prompt and also:

1. Define the variables that will be used in the prompt, which will be dynamically added from the copilot during runtime.
2. Create the prompt that will be used to identify PII from the **Dataverse returned data** and also mask them as needed.
3. **Save** the prompt, which will make it available for use within the Copilot canvas.

![Step 7 - Image 4](\images\18_CopilotPII\16.png)

Now that the **Prompt action** is added, populate the:

1. Adaptive Card outputs into the respective **Prompt action input fields**.
2. Pass the serialized **Dataverse returned data** into the **Prompt action**.

![Step 7 - Image 5](\images\18_CopilotPII\17.png)

The output of the **Prompt action** will be stored in the **varPrediction** variable, which we will be using for displaying the final output.
![Step 7 - Image 5](\images\18_CopilotPII\18.png)

Finally, we will show the **PII detection output** as a **basic card** back to the user, for which we will select the **text** property of the **varPrediction** record, which will contain the **Generative AI output**.
```
Topic.varPrediction.text
```
![Step 7 - Image 6](\images\18_CopilotPII\19.png)

### Test the Copilot

Now, let's test the Copilot by triggering the conversation, and we will enter the details to check for in the **adaptive card**.

![Step 7 - Image 7](\images\18_CopilotPII\20.png)

It fetches the details from the **Dataverse table** and passes them to the **Prompt action** to check if any PII is present. It masks the related information and shares the details back with the user.

![Step 7 - Image 8](\images\18_CopilotPII\21.png)



## Conclusion <a name="conclusion"></a>

The **PII Detection Copilot** provides a powerful and automated solution for detecting personally identifiable information (PII) using **Azure OpenAI** and **Microsoft Copilot**. By fetching customer data from **Dataverse**, detecting PII, and masking sensitive information, businesses can ensure compliance with data privacy regulations. This streamlined process, powered by AI, helps organizations safeguard sensitive data and improve customer trust.
