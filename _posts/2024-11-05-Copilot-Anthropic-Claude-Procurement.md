---
layout: post
title: Material Procurement Analyzer Copilot: Leveraging Anthropic Claude with Dataverse
description: This blog will guide you through the steps to create a Copilot that analyzes inventory levels from Dataverse and identifies materials needing procurement using Anthropic Claude.
date: 2024-11-05 12:00:00 +0300
image: '/images/FrontImage/22.jpg'
tags: [copilot]
---

## Table of Contents
{: .no_toc}

* TOC
{: toc}



## Introduction

In manufacturing and supply chain environments, maintaining optimal stock levels is critical. To address this, we’ll explore building a **Material Procurement Copilot** that leverages **Anthropic Claude** to assess real-time inventory data from **Dataverse**. This copilot will analyze stock levels and reorder thresholds, providing actionable insights to help identify materials that need timely procurement.

---

## Technologies Involved

1. **Microsoft Copilot Studio**: The platform to design and manage the conversational flow, adaptive card interface, and data retrieval from Dataverse.
2. **Anthropic Claude**: Claude will process and analyze selected material data from Dataverse, generating recommendations for procurement.
3. **Dataverse**: Stores the inventory data, including **Material Name**, **Current Stocks**, and **Reorder Levels**, serving as the central data source for material status and procurement needs.

---

## Overall Flow

- **User Selects Materials**: The process begins when the user initiates the copilot. An adaptive card is displayed, allowing the user to select materials from a list.
- **Data Retrieval from Dataverse**: Based on the selected materials, the copilot fetches data from Dataverse, specifically the **Material Name**, **Current Stocks**, and **Reorder Levels** fields.
- **Claude Analysis**: Using **Anthropic Claude**, the copilot analyzes the material data. The model reviews current stock levels against reorder thresholds to determine if procurement is necessary.
- **Results Displayed**: The copilot displays a list of materials that need replenishment. Users receive clear recommendations on which items to prioritize for procurement.

---

## Step 1: Get the Anthropic Claude Keys

1. Head over to [Anthropic Console - Keys](https://console.anthropic.com/settings/keys) and **Click on Create Key**.
   ![Create Key](\images\22_AnthropicProcurement\1.png)

2. **Save the key** as we will use it to create the connection from Copilot.
   ![Save Key](\images\22_AnthropicProcurement\2.png)

---

## Step 2: Create a Custom Connector for Anthropic Claude

1. Go to [Power Automate](https://make.powerautomate.com/) and select **Custom Connector** to create a connector that will issue **POST requests** to Anthropic Claude.
   ![Custom Connector](\images\22_AnthropicProcurement\3.png)

2. **Select New Connector** and **Create from Blank**.
   ![Create from Blank](\images\22_AnthropicProcurement\4.png)

3. **Specify the connector name** and click on **Continue**.
   ![Specify Name](\images\22_AnthropicProcurement\5.png)

4. **Click on Swagger editor** and paste the below swagger definition on the left pane. Then **Click on Create Connector**.
   **Add code**
   ![Swagger Editor](\images\22_AnthropicProcurement\6.png)

---

## Step 3: Create and Populate the Dataverse Table

1. Create the table **Raw Material Stocks** in Dataverse and add fields for **Material Name**, **Current Stocks**, and **Reorder Levels**.
   ![Dataverse Table](\images\22_AnthropicProcurement\7.png)

---

## Step 4: Creating the Copilot in Copilot Studio

1. Go to [Copilot Studio](https://copilotstudio.microsoft.com/) and **Click on Create**.
   ![Create Copilot](\images\22_AnthropicProcurement\8.png)

2. Select **New Copilot** to create one from scratch.
   ![New Copilot](\images\22_AnthropicProcurement\9.png)

3. **Describe the copilot functionality** and provide any specific instructions, then **Click on Create** to provision the copilot.

---

### Enable Generative Selection of Topics

1. **Click on Edit** to update the copilot details like **name**, **icon**, and **description**.
2. **Click on Settings**, enable **Generative selection of topics**, and choose **High - More precise** for **Content moderation**.
   ![Generative Settings](\images\22_AnthropicProcurement\10.png)

3. **Save** the settings and **Close** to return to the copilot’s main page.
   ![Close Settings](\images\22_AnthropicProcurement\11.png)

---

## Step 5: Create Topics

1. Go to the **Topics** section in the navigation menu.
2. **Click on Add a Topic** and choose **Create from description with Copilot**.
   ![Add Topic](\images\22_AnthropicProcurement\12.png)

3. Provide the topic description, then **Click on Create** to provision the topic.
   ![Create Topic](\images\22_AnthropicProcurement\13.png)

### Adding Material Selection Card

1. In the **Procurement Analysis** topic, **add an adaptive card** asking which materials to analyze for procurement.
   ![Adaptive Card](\images\22_AnthropicProcurement\14.png)

2. **Add the below adaptive card schema** in the node properties.
   **Add code**
   ![Adaptive Card Schema](\images\22_AnthropicProcurement\15.png)

3. Set the output variable as **selectedMaterials** to store user-selected materials.
   ![Output Variable](\images\22_AnthropicProcurement\16.png)

### Adding Dataverse Data Retrieval

1. Add the **Dataverse connector action** to retrieve records from the **Raw Materials** Dataverse table.
   ![Dataverse Connector](\images\22_AnthropicProcurement\17.png)

2. **Configure the connector** by specifying the **Environment**, **Table name**, and required table columns.
   ![Connector Configuration](\images\22_AnthropicProcurement\18.png)

3. Store the fetched data in the **rawMaterials** variable for further processing.
   ![Stored Data](\images\22_AnthropicProcurement\19.png)

4. **Initialize a variable (filteredStockDetails)** to hold filtered data with only necessary columns.
   **Add code**
   ![Filtered Data](\images\22_AnthropicProcurement\20.png)

5. **Test the variable** to verify that only relevant information is retrieved.
   ![Test Variable](\images\22_AnthropicProcurement\21.png)

### Formatting Data for Analysis

1. Format the JSON output for readability as **<Material Name>: <Current Stock Levels>:<Reorder Levels>**.
   **Add code**
   ![Formatted Data](\images\22_AnthropicProcurement\22.png)

### Adding the Anthropic Claude Connector

1. Add the **Anthropic Claude custom connector** to the copilot canvas.
   ![Add Claude Connector](\images\22_AnthropicProcurement\24.png)

2. Provide the **API key** saved earlier for authentication.
   ![API Key](\images\22_AnthropicProcurement\25.png)

3. Configure the connector fields with:
   - **Anthropic-version**: `2023-06-01`
   - **Model**: `claude-3-5-sonnet-20240620`

4. In the **message field**, add the prompt formula to be sent to Claude.
   **Add code**
   ![Prompt Formula](\images\22_AnthropicProcurement\25_1.png)

5. Store the output response from **Anthropic Claude** in the variable **OutputResponse** and configure a **Message node** to display the response back to the user.
   **Add code**
   ![Message Node](\images\22_AnthropicProcurement\26.png)

---

## Testing the Copilot

1. **Initiate the conversation** and select materials to analyze from the adaptive card.
   ![Material Selection](\images\22_AnthropicProcurement\27.png)

2. **Click on Check Stock Levels**. This action invokes **Anthropic Claude** to analyze the data and provide recommendations.
   ![Material Selection Output](\images\22_AnthropicProcurement\28.png)
---

## Conclusion

We have successfully created the **Procurement Analyzer Copilot**, which leverages **Anthropic Claude** and **Microsoft Copilot Studio** to simplify inventory management. By analyzing Dataverse data, this copilot allows users to make data-driven procurement decisions in real-time, ensuring inventory remains optimized and responsive to changing needs.
