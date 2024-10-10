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


## Create the Dataverse Table

We will be storing the invoice details in the **Dataverse table**, which will contain the previous month’s invoices that will be used for spotting any irregularities. The table will include the following columns: **Product Name**, **Invoice Amount**, **Month**, and **Quantity**.

![Create Dataverse Table](\images\17_CopilotInvoiceAnalyzer\1.png)

---

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

To be added later


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

To be added later


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

---

## Conclusion

By following these steps, you have successfully built a Smart Invoice Anomaly Analyzer in Copilot Studio. This system can detect irregularities between current and previous invoice records, allowing you to catch potential errors before they impact your financial records. Now, you can streamline your invoicing process with automated AI checks, ensuring greater accuracy and reliability.

---
