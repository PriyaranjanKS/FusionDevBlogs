---
layout: post
title: Smart Invoice Anomaly Detection using AI prompt Action and Dataverse data
description: We will see the steps needed to create an intelligent invoice anomaly checker that leverages AI prompt so that we can easily cross check current invoices for potential discrepencies by checking it against previous month's data
date: 2024-10-22 15:01:35 +0300
image: '/images/FrontImage/InvoiceAnomaly.png'
tags: [copilot]
---

## Table of Contents
{: .no_toc}

* TOC
{: toc}

## Introduction

Keeping invoices accurate is crucial to avoid financial mistakes. This blog will show you how to build an Invoice Anomaly Detection system using Copilot Studio. You'll learn how to input invoice details using an Adaptive Card and compare them with previous month’s data stored in Dataverse. The system will automatically check for any irregularities using AI prompt actions, helping you ensure accuracy and streamline your invoice process.

## Process Flow

**Invoice Anomaly Detection System** involves several key steps to ensure accurate and efficient anomaly detection. Here's an overview of the process:

1. **Data Storage:** Invoice details are stored in Dataverse, allowing us to easily access and compare previous month's data.
2. **Copilot Setup:** Using Copilot Studio, we build a bot that captures the current month's invoice details through an Adaptive Card and stores them as variables.
3. **Data Retrieval:** The system fetches invoice data from Dataverse and formats it for comparison.
4. **Anomaly Detection:** By leveraging AI prompt actions, the bot compares the current month’s invoice details with the historical data. If discrepancies are detected, the bot highlights them for review.
5. **Results Display:** Finally, the system presents the analysis results in a user-friendly format, allowing you to take any necessary actions to maintain financial accuracy.

![Create Dataverse Table](\images\17_CopilotInvoiceAnalyzer\0_0.gif)

## Demo 

Watch the demo video below to see how the **Invoice Anomaly Detection System** works. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/Dw5uSJEini4?vq=hd1080" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Steps to Create the Invoice Anomaly Detection System 

## Create the Dataverse Table

We will be storing the invoice details in the **Dataverse table**, which will contain the previous month’s invoices that will be used for spotting any irregularities. The table will include the following columns: **Product Name**, **Invoice Amount**, **Month**, and **Quantity**.

![Create Dataverse Table](\images\17_CopilotInvoiceAnalyzer\1.png)



## Step 3: Creating the Copilot in Copilot Studio

1. Navigate to [Copilot Studio](https://copilotstudio.microsoft.com/) and **click on** **Create**.
2. Choose **New Copilot** to start from scratch.

![Create New Copilot](\images\17_CopilotInvoiceAnalyzer\2.png)

3. Provide a description of the copilot's functionality, then **click on** **Create**.

![Provide Copilot Description](\images\17_CopilotInvoiceAnalyzer\3.png)

---

## Step 4: Enable Generative Selection of Topics

After creating the copilot:

1. **Click on** **Edit** to update details like **Name**, **Icon**, and **Description**.
2. **Go to** **Settings** and enable the **Generative selection of topics** to allow the topics to be automatically selected based on user conversation.

![Enable Generative Selection](\images\17_CopilotInvoiceAnalyzer\4.png)

To activate topic auto-selection from user interactions:

1. **Click on** **Generative AI**.
2. Choose **Generative (preview)** and **click on** **Save**.
3. **Close** the settings to return to the copilot home page.

![Generative AI Preview](\images\17_CopilotInvoiceAnalyzer\5.png)

---

## Step 5: Create Topics

1. **Click on** **Topics** in the navigation menu.
2. **Add a Topic** and select **Create from description with Copilot**.
3. Enter the topic description and **click on** **Create** to generate a topic skeleton.

![Create Topics](\images\17_CopilotInvoiceAnalyzer\6.png)

4. Add an **Adaptive Card** for user invoice input. Enter the JSON schema for the Adaptive Card in the **Node properties**.

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


![Add Adaptive Card](\images\17_CopilotInvoiceAnalyzer\8.png)

---

## Adding Invoice Data using an Adaptive Card

The values entered in the adaptive card are available as output variables within Copilot.

1. **Create a variable** named **varCurrentMonthInvoiceDetails** to concatenate the user-inputted values. Use the format:  
   **ProductName: Month: InvoiceTotal (Quantity kg)**  
   
   Example:
   
```
Copper Wires: March: 1900 (15 kg)
```

![Adaptive Card Output](\images\17_CopilotInvoiceAnalyzer\10.png)

```
Concat(Topic.varFormattedTable, Product & ": " & Month & ":" & Amount & " (" & Quantity & " kg)", ", ")
```

---

## Fetching Previous Month Data

To retrieve the previous month's invoice details:

1. **Select** **Call an action**.
2. From the **Connector tab**, **search for** **Dataverse** and select **List rows**.

![Fetch Data from Dataverse](\images\17_CopilotInvoiceAnalyzer\12.png)

---

## Configuring the Dataverse Connector

1. Set the **Environment** and **Table Name**.
2. **Click on** **Advanced Inputs** to specify the columns to retrieve. Add **Product Name**, **Month**, **Quantity**, and **Invoice Amount**.

![Configure Connector Columns](\images\17_CopilotInvoiceAnalyzer\13.png)

3. Add an output variable, **varInvoiceTable**, to store the retrieved data in table format. Use Power Fx to filter the output table into the format:

```
[
{"Amount":"1000","Month":"January","Product":"Copper Wires","Quantity":"15"}, 
{"Amount":"1100","Month":"February","Product":"Copper Wires","Quantity":"15"}
]
```

![Filtered Output Table](\images\17_CopilotInvoiceAnalyzer\16.png)

To be added later


---

## Creating the AI Prompt Action

1. **Select** **Call an action** and choose **Create a prompt** from the **Basic actions tab**.
2. **Name the prompt** and **add** variables like **Current Month Invoice** and **Previous Month Details**.
3. Use the dynamic variables in the **Prompt** field to populate the content at runtime.

![Create Prompt Action](\images\17_CopilotInvoiceAnalyzer\18.png)

4. Add the prompt action by selecting **Invoice Anomaly Checker**.

![Add Prompt Action](\images\17_CopilotInvoiceAnalyzer\21.png)

5. Configure it with the **Serialized Invoice Data** for previous month’s data and **Current Month Invoice Details** for user-input data.

![Configure Prompt Input](\images\17_CopilotInvoiceAnalyzer\22.png)

To be added later


---

## Displaying Anomaly Detection Results

1. Store the AI output in **varPredictionOutput** and **display** the results back to the user using a **Basic Card**.
2. The **text** property of **varPredictionOutput** will contain the AI-generated output.

![Display Results](\images\17_CopilotInvoiceAnalyzer\24.png)

## Testing the Invoice Anomaly Detection Copilot

Let’s put the **Invoice Anomaly Detection Copilot** to the test by entering the invoice details for the month of March using the Adaptive Card.

![Enter Invoice Details](\images\17_CopilotInvoiceAnalyzer\25.png)

1. **Enter Invoice Details:**  
   On the Adaptive Card, we fill out the necessary details such as:
   - **Invoice Month:** March
   - **Product Name:** Copper Wires
   - **Quantity:** 15
   - **Invoice Total:** 3000
   
2. **Submit and Analyze:**  
   After submitting the details, the Copilot fetches the relevant historical invoice data from **Dataverse** for comparison.

3. **Anomaly Detection:**  
   Using an **AI Prompt Action**, the Copilot checks for any significant variations between the current and previous month’s invoices. It then identifies any potential discrepancies and shares the results back with the user.

![Anomaly Detection Result](\images\17_CopilotInvoiceAnalyzer\26.png)

In this example, the AI identifies that the March invoice total of $3000 is significantly higher than previous months' totals, such as $1100 in February, flagging it as a potential anomaly for further review. This automatic detection ensures financial accuracy and highlights unusual patterns for timely investigation.


## Conclusion

By following these steps, we have successfully built a Smart Invoice Anomaly Analyzer in Copilot Studio. This system can detect irregularities between current and previous invoice records, allowing you to catch potential errors before they impact your financial records. Now, you can streamline your invoicing process with automated AI checks, ensuring greater accuracy and reliability.

---
