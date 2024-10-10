---
layout: post
title: Smart Invoice Anomaly Detection using AI prompt Action and Dataverse data
description: We will see the steps needed to create an intelligent invoice anomaly checker that leverages AI prompt so that we can easily cross check current invoices for potential discrepencies by checking it against previous month's data
date: 2024-07-29 15:01:35 +0300
image: '/images/FrontImage/04.png'
tags: [copilot]
---

## Table of Contents
{: .no_toc}

* TOC
{: toc}

## Introduction

Keeping invoices accurate is crucial to avoid financial mistakes. This blog will show you how to build an Invoice Anomaly Detection system using Copilot Studio. You'll learn how to input invoice details using an Adaptive Card and compare them with previous month’s data stored in Dataverse. The system will automatically check for any irregularities using AI prompt actions, helping you ensure accuracy and streamline your invoice process.

## User Process Flow

1. **User Inputs Invoice Details:**
   - The user initiates the process by entering the invoice details through an Adaptive Card. These details include the Product Name, Invoice Amount, Month, and Quantity.

2. **System Fetches Previous Month Data:**
   - Upon receiving the current month's invoice details, the system automatically fetches the previous month's data from the Dataverse table using the configured connector.

3. **Data Serialization & Anomaly Detection:**
   - The system serializes both the current and previous month's invoice data into a textual format, making it suitable for AI processing.The serialized data is passed to an AI Prompt action, which analyzes the current invoice against the previous month's data to detect any anomalies.

4. **Results Display:**
   - The AI-generated results, highlighting any detected anomalies, are displayed back to the user in an Adaptive Card format. This allows the user to review and take appropriate action based on the insights provided by the system.

![Dataverse Table](\images\17_CopilotInvoiceAnalyzer\0_0.png)

## Create the Dataverse Table

We will be storing the invoice details in a Dataverse table, which will contain the previous month's invoices that we'll be using for spotting any irregularities. It will contain the Product name, Invoice Amount, Month, and Quantity as the columns.

![Dataverse Table](\images\17_CopilotInvoiceAnalyzer\1.png)

## Creating the Copilot in Copilot Studio

1. Head over to [Copilot Studio](https://copilotstudio.microsoft.com/) and click on **Create**.
   
2. This will provide us the option to create a copilot based on an existing template or create a blank copilot from scratch. Let's select **New Copilot**.

    ![Create Copilot](\images\17_CopilotInvoiceAnalyzer\2.png)

3. This will take us to the page where we can describe the copilot functionality and provide any specific instructions to the copilot.

4. Once done, click on **Create** to provision the copilot.

    ![Provision Copilot](\images\17_CopilotInvoiceAnalyzer\3.png)

## Enable Generative Selection of Topics

1. The copilot is now created. We can then make the needed configuration changes.

2. Click on **Edit** and edit the copilot details like name, icon, and description.

    ![Edit Copilot](\images\17_CopilotInvoiceAnalyzer\4.png)

3. Click on **Settings** to enable the Generative selection of topics so that without relying on triggers, the topics will be auto-selected based on user conversation, resulting in a much smoother user experience.

    ![Settings](\images\17_CopilotInvoiceAnalyzer\5.png)

4. To enable the automatic detection of topics from user interaction:

   1. Click on **Generative AI**.
   2. Select **Generative (preview)**.
   3. Click on **Save** to update the settings.
   4. Click on the **Close** icon to go back to the home page of this custom copilot.

## Create Topics

1. Now let’s go ahead and create the topics that will automatically redirect the conversation flow to appropriate topics based on the question the user posts.

2. Click on **Topics** from the navigation menu.

    ![Topics Menu](\images\17_CopilotInvoiceAnalyzer\6.png)

3. To add the topic, we can either go with the option to create a blank topic or use Copilot to create the topic with an initial set of prepopulated conversation nodes based on the topic description that we provide.

4. Let’s click on **Add a Topic** and select **Create from description with Copilot**.

    ![Add Topic](\images\17_CopilotInvoiceAnalyzer\7.png)

5. Let’s provide the below topic description details in the pop-up that opened when we clicked the **Add Topic** button previously.

6. Then, click on **Create**, which will provision the topic skeleton based on the provided description.

    ![Create Topic](\images\17_CopilotInvoiceAnalyzer\8.png)

## Adding Invoice Details Using Adaptive Card

1. Thus we have the basic topic created with an automatic trigger.

2. We can now add more conversation nodes. Let's add an adaptive card so that the user can add the invoice details as input.

3. We will add the below JSON schema for the adaptive card in the Node properties. 

```
{
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.4",
    "body": [
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "width": "auto",
                    "items": [
                        {
                            "type": "Image",
                            "url": "https://adaptivecardsbot.blob.core.windows.net/imagestore/InvoiceProcess.png",
                            "size": "Small",
                            "style": "Person"
                        }
                    ]
                },
                {
                    "type": "Column",
                    "width": "stretch",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "Invoice Entry Form",
                            "weight": "Bolder",
                            "size": "Large",
                            "wrap": true
                        }
                    ]
                }
            ]
        },
        {
            "type": "TextBlock",
            "text": "Please fill in the details below to submit your invoice.",
            "wrap": true,
            "weight": "Bolder",
            "color": "Good", 
            "spacing": "Medium"
        },
        {
            "type": "TextBlock",
            "text": "Invoice Month",
            "weight": "Bolder",
            "wrap": true,
            "spacing": "Small"
        },
        {
            "type": "Input.Text",
            "id": "invoiceMonth",
            "placeholder": "Enter Invoice Month (e.g., January)"
        },
        {
            "type": "TextBlock",
            "text": "Product Name",
            "weight": "Bolder",
            "wrap": true,
            "spacing": "Small"
        },
        {
            "type": "Input.Text",
            "id": "productName",
            "placeholder": "Enter Product Name"
        },
        {
            "type": "TextBlock",
            "text": "Quantity",
            "weight": "Bolder",
            "wrap": true,
            "spacing": "Small"
        },
        {
            "type": "Input.Number",
            "id": "quantity",
            "placeholder": "Enter Quantity"
        },
        {
            "type": "TextBlock",
            "text": "Invoice Total",
            "weight": "Bolder",
            "wrap": true,
            "spacing": "Small"
        },
        {
            "type": "Input.Number",
            "id": "invoiceTotal",
            "placeholder": "Enter Invoice Total"
        }
    ],
    "actions": [
        {
            "type": "Action.Submit",
            "title": "Submit"
        }
    ],
    "style": "default",
    "backgroundImage": {
        "url": "https://adaptivecardsbot.blob.core.windows.net/imagestore/background.jpg"
    }
}

```

    ![Adaptive Card](\images\17_CopilotInvoiceAnalyzer\9.png)

4. The user-entered values in the adaptive card will be available for use within the Copilot as output variables of the adaptive card.

## Fetch Previous Month Invoice Data

1. Now let’s add a variable so that we can use Power Fx to concatenate the user-input values in the format: **ProductName: Month: InvoiceTotal (Quantity kg)**.

2. For example:
   *Copper Wires: March: 1900 (15 kg)*

3. We will add the below expression to the newly added variable (**varCurrentMonthInvoiceDetails**). 

```
Concat(Topic.varFormattedTable, Product & ": " & Month & ":" & Amount & " (" & Quantity & " kg)", ", ")
```

    ![Concatenate Values](\images\17_CopilotInvoiceAnalyzer\10.png)

4. Now let's add the Dataverse connector action to fetch the previous month invoice details from the Monthly Invoices table so that we can compare the current values against it. To do this:

   1. Select **Call an action**.
   2. From the connector tab, search for **Dataverse**.
   3. Select **List rows from selected environment**.

    ![List Rows](\images\17_CopilotInvoiceAnalyzer\11.png)

5. Now let's configure the connector by:

   1. Mentioning the Environment and table name.
   2. Click on **Advanced inputs** so that we can filter the columns that will be returned.

    ![Configure Connector](\images\17_CopilotInvoiceAnalyzer\12.png)

6. Mention the columns that we would like to fetch. In our case, the logical names for Product Name, Month, Quantity, and Invoice Amount are added to the **Select columns** field.

    ![Select Columns](\images\17_CopilotInvoiceAnalyzer\13.png)

7. Note: You can get the logical names for these fields by going to the table and selecting the name by navigating the respective columns as shown below:

    ![Logical Names](\images\17_CopilotInvoiceAnalyzer\14.png)

8. Finally, let's add an output variable (**varInvoiceTable**) so that the Dataverse returned data will be stored in table format in this variable.

    ![Output Variable](\images\17_CopilotInvoiceAnalyzer\15.png)

9. Since there will be a few system columns as well present in the Dataverse returned data, let's filter the output to retrieve the below filtered table format and we will store it in a new variable (**varFormattedTable**).

10. For this, we will be using the below Power Fx expression. 

```
ForAll(
    Topic.varInvoiceTable,
    {
        Product: ThisRecord.crfeb_productname,
        Month: ThisRecord.crfeb_month,
        Amount: ThisRecord.crfeb_invoiceamount,
        Quantity: ThisRecord.crfeb_quantitykg
    }
)
```

    ![Filtered Table](\images\17_CopilotInvoiceAnalyzer\16.png)

## Serialize and Analyze Invoice Data Using AI Prompt

1. Since we cannot pass a table as an input to the AI Prompt action, we will serialize the table into the below textual representation, which can be passed as an input to AI prompt.

2. For this, we will add a new variable (**varSerializedInvoiceDetails**) and use the below expression to concatenate and serialize the table data. 

```
Concat(Topic.varFormattedTable, Product & ": " & Month & ":" & Amount & " (" & Quantity & " kg)", ", ")
```

    ![Serialize Data](\images\17_CopilotInvoiceAnalyzer\17.png)

3. Now let's add the **AI Prompt** action to which we will pass the serialized invoice data. For this:

   1. Select **Call an action**.
   2. From the **Basic actions** tab, select **Create a prompt**.

    ![Create Prompt](\images\17_CopilotInvoiceAnalyzer\18.png)

4. This will open up the pop-up where we can add the prompt that will be used by the AI action. We will:

   1. Enter the name for the prompt so that this can be selected and added to the Copilot designer later.
   2. Create the Current Month Invoice and Previous Month Details variables to which we will pass the respective information from the Copilot.
   3. In the Prompt section, use the below prompt.
   4. Add the previously created dynamic variables using the **Insert** button so that they will be added to the prompt during runtime.
   5. Click on **Save custom prompt**, which will make the prompt available in the copilot designer.

    ![Save Custom Prompt](\images\17_CopilotInvoiceAnalyzer\19.png)

5. We will add the recently created prompt by:

   1. Selecting **Call an action**.
   2. From the **Basic actions** tab, select the **Invoice Anomaly Checker** prompt.

    ![Add Prompt](\images\17_CopilotInvoiceAnalyzer\20.png)

6. The prompt is now available, let's configure it by adding the below input variables which we had initialized earlier:

   1. **varSerializedInvoiceDetails**: The previous month's Dataverse returned data.
   2. **varCurrentMonthInvoiceDetails**: It contains the current user-input invoice data.

    ![Configure Prompt](\images\17_CopilotInvoiceAnalyzer\21.png)

7. We will then store the AI prompt returned record output in the (**varPredictionOutput**) variable which will be used to display the results back to the user.

## Display Results

1. Finally, let's add a basic card and populate it with the below details. The **text** Property of the **varPredictionOutput** record variable will contain the generative AI output, which we will add in the formula section of the Adaptive Card Text field.

    ![Display Results](\images\17_CopilotInvoiceAnalyzer\22.png)

2. Thus we have completed the creation of a Smart Invoice Anomaly Analyzer.

## Conclusion

In this blog, we have successfully created a smart Invoice Anomaly Detection system using Copilot Studio. This system inputs invoice details through an Adaptive Card, fetches the previous month’s data from Dataverse, and uses AI to analyze and spot any anomalies. This approach ensures accuracy and streamlines the invoice processing workflow, making it an essential tool for businesses to avoid costly financial mistakes.

With this setup, your invoice management will become more reliable and automated, allowing you to focus on more critical tasks.
