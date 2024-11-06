---
layout: post
title: Material Procurement Copilot Agent built using Anthropic Claude & Dataverse
description: This blog will guide you through the steps to create a Agent that analyzes inventory levels from Dataverse and identifies materials needing procurement using Anthropic Claude.
date: 2024-11-05 12:00:00 +0300
image: '/images/FrontImage/22.jpg'
tags: [copilot]
---

## Table of Contents
{: .no_toc}

* TOC
{: toc}



## Introduction

In manufacturing and supply chain environments, maintaining optimal stock levels is critical. To address this, we’ll explore building a **Material Procurement Agent** that leverages **Anthropic Claude** to assess real-time inventory data from **Dataverse**. This Agent will analyze stock levels and reorder thresholds, providing actionable insights to help identify materials that need timely procurement.

 

## Technologies Involved

1. **Microsoft Copilot Studio**: The platform to design and manage the conversational flow, adaptive card interface, and data retrieval from Dataverse.
2. **Anthropic Claude**: Claude will process and analyze selected material data from Dataverse, generating recommendations for procurement.
3. **Dataverse**: Stores the inventory data, including **Material Name**, **Current Stocks**, and **Reorder Levels**, serving as the central data source for material status and procurement needs.

 

## Overall Flow

- **User Selects Materials**: The process begins when the user initiates the Agent. An adaptive card is displayed, allowing the user to select materials from a list.
- **Data Retrieval from Dataverse**: Based on the selected materials, the Agent fetches data from Dataverse, specifically the **Material Name**, **Current Stocks**, and **Reorder Levels** fields.
- **Claude Analysis**: Using **Anthropic Claude**, the Agent analyzes the material data. The model reviews current stock levels against reorder thresholds to determine if procurement is necessary.
- **Results Displayed**: The Agent displays a list of materials that need replenishment. Users receive clear recommendations on which items to prioritize for procurement.

    ![Message Node](\images\22_AnthropicProcurement\0_0.gif)

## Step 1: Get the Anthropic Claude Keys

1. Head over to [Anthropic Console - Keys](https://console.anthropic.com/settings/keys) and **Click on Create Key**.
   ![Create Key](\images\22_AnthropicProcurement\1.png)

2. **Save the key** as we will use it to create the connection from Agent.
   ![Save Key](\images\22_AnthropicProcurement\2.png)

 

## Step 2: Create a Custom Connector for Anthropic Claude

1. Go to [Power Automate](https://make.powerautomate.com/) and select **Custom Connector** to create a connector that will issue **POST requests** to Anthropic Claude.
   ![Custom Connector](\images\22_AnthropicProcurement\3.png)

2. **Select New Connector** and **Create from Blank**.
   ![Create from Blank](\images\22_AnthropicProcurement\4.png)

3. **Specify the connector name** and click on **Continue**.
   ![Specify Name](\images\22_AnthropicProcurement\5.png)

4. **Click on Swagger editor** and paste the below swagger definition on the left pane. Then **Click on Create Connector**.
   ```
   swagger: '2.0'
info:
  title: Anthropic Claude Messages API
  description: >-
    Claude is a large language model (LLM) built by Anthropic. It's trained to
    be a helpful assistant in a conversational tone.
  version: 1.0.0
host: api.anthropic.com
basePath: /v1
schemes:
  - https
consumes:
  - application/json
produces:
  - application/json
paths:
  /messages:
    post:
      summary: Send Messages to Claude
      description: >-
        Send a structured list of input messages, and the model will generate
        the next message in the conversation.
      operationId: ClaudeMessagesPost
      parameters:
        - name: anthropic-version
          in: header
          required: true
          type: string
          description: The version of the Anthropic API to use.
          default: '2023-06-01'
        - name: body
          in: body
          required: true
          schema:
            type: object
            properties:
              model:
                type: string
                description: The model that will complete your prompt.
                default: claude-3-5-sonnet-20240620
                enum:
                  - claude-3-5-sonnet-20240620
              messages:
                type: array
                items:
                  type: object
                  properties:
                    role:
                      type: string
                      description: The role of the message sender (user or assistant).
                      enum:
                        - user
                        - assistant
                    content:
                      type: string
                      description: The text content of the message.
                  required:
                    - role
                    - content
                description: List of input messages for the conversation.
              max_tokens:
                type: integer
                format: int32
                description: The maximum number of tokens to generate.
                default: 1024
              temperature:
                type: number
                description: >-
                  Controls randomness in the response, with values ranging from
                  0.0 (deterministic) to 1.0 (highly random).
                default: 1
              stop_sequences:
                type: array
                items:
                  type: string
                description: Custom sequences that will cause the model to stop generating.
              system:
                type: string
                description: A system prompt providing context and instructions to Claude.
              stream:
                type: boolean
                description: >-
                  Whether to stream the response incrementally using server-sent
                  events.
      responses:
        '200':
          description: Successful text generation
          schema:
            type: object
            properties:
              id:
                type: string
                description: Unique identifier for the message.
              content:
                type: array
                items:
                  type: object
                  properties:
                    type:
                      type: string
                      description: The type of content generated (e.g., text).
                    text:
                      type: string
                      description: The text generated by the model.
                description: The content generated by the model.
              model:
                type: string
                description: The model used for text generation.
              stop_reason:
                type: string
                description: The reason the model stopped generating.
                enum:
                  - end_turn
                  - max_tokens
                  - stop_sequence
                  - tool_use
              stop_sequence:
                type: string
                description: The stop sequence that was triggered, if any.
              usage:
                type: object
                properties:
                  input_tokens:
                    type: integer
                    format: int32
                    description: Number of input tokens used.
                  output_tokens:
                    type: integer
                    format: int32
                    description: Number of output tokens generated.
                description: Token usage information.
securityDefinitions:
  apiKeyHeader:
    type: apiKey
    in: header
    name: x-api-key
security:
  - apiKeyHeader: []

   
   ```
   ![Swagger Editor](\images\22_AnthropicProcurement\6.png)

 

## Step 3: Create and Populate the Dataverse Table

1. Create the table **Raw Material Stocks** in Dataverse and add fields for **Material Name**, **Current Stocks**, and **Reorder Levels**.
   ![Dataverse Table](\images\22_AnthropicProcurement\7.png)

 

## Step 4: Creating the Agent in Copilot Studio

1. Go to [Copilot Studio](https://copilotstudio.microsoft.com/) and **Click on Create**. Select **New Agent** to create one from scratch.
   ![Create Copilot](\images\22_AnthropicProcurement\8.png)

2. **Describe the Agent functionality** and provide any specific instructions, then **Click on Create** to provision the Agent.
   ![New Copilot](\images\22_AnthropicProcurement\9.png)

### Enable Generative Selection of Topics

1. **Click on Edit** to update the Agent details like **name**, **icon**, and **description**. Then **Click on Settings**, to enable **Generative selection of topics**
   ![Generative Settings](\images\22_AnthropicProcurement\10.png)
2. Choose **High - More precise** for **Content moderation**.**Save** the settings and **Close** to return to the Agent’s main page.
   ![Close Settings](\images\22_AnthropicProcurement\11.png) 

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
   ```
   {
    "type": "AdaptiveCard",
    "version": "1.4",
    "backgroundImage": {
        "url": "https://copilotai29.blob.core.windows.net/copilot/bg.jpg"
    },
    "body": [
        {
            "type": "Image",
            "url": "https://copilotai29.blob.core.windows.net/copilot/in-stock.png",
            "size": "Small",
            "horizontalAlignment": "Center"
        },
        {
            "type": "TextBlock",
            "text": "Material Stock Check",
            "weight": "Bolder",
            "size": "extraLarge",
            "color": "Warning",
            "horizontalAlignment": "Center"
        },
        {
            "type": "TextBlock",
            "text": "Select the materials you want to check the stock levels for:",
            "wrap": true,
            "weight":"Bolder",
            "spacing": "Small",
            "color": "Good",
            "horizontalAlignment": "Center"
        },
        {
            "type": "Input.ChoiceSet",
            "id": "selectedMaterials",
            "style": "expanded",
            "isMultiSelect": true,
            "choices": [
                {
                    "title": "Aluminium Sheets",
                    "value": "AluminiumSheets"
                },
                {
                    "title": "Copper Wires",
                    "value": "CopperWires"
                },
                {
                    "title": "Silica Beading",
                    "value": "SilicaBeading"
                },
                {
                    "title": "Zinc Plates",
                    "value": "ZincPlates"
                }
            ]
        }
    ],
    "actions": [
        {
            "type": "Action.Submit",
            "title": "Check Stock Levels",
            "style": "positive",
            "data": {
                "action": "checkStock"
            }
        }
    ],
    "minHeight": "200px",
    "verticalContentAlignment": "Center"
}

   ```
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

4. The returned data from dataverse will contain additional system columns. Lets **Initialize a variable (filteredStockDetails)** to hold filtered data with only necessary columns. For this we will use the below Power Fx expression to loop through the Dataverse returned data and filter it. 
   ```
   ForAll(
    Topic.rawMaterials.value,
    {
        MaterialName: ThisRecord.crd69_materialname,
        CurrentStockLevels: ThisRecord.crd69_currentstockkg,
        ReorderLevels: ThisRecord.crd69_reorderlevelskg
    }
)
   ```
   ![Filtered Data](\images\22_AnthropicProcurement\20.png)

5. We will **Test the filteredStockDetails variable** to verify that only relevant information is retrieved by outputting in a message node. 
   ![Test Variable](\images\22_AnthropicProcurement\21.png)

### Formatting Data for Analysis

1. We will further format the above JSON output of the **filteredStockDetails** variable for better understanding by the Claude model by formatting it as **< Material Name > : < Current Stock Levels > : < Reorder Levels >**.
   ```
   Concat(Topic.filteredStockDetails, "Material Name : "&MaterialName & " - " & " Current Stock Levels : " & CurrentStockLevels & "-" & "Reorder Levels : "&ReorderLevels," , " )
   ```
   ![Formatted Data](\images\22_AnthropicProcurement\22.png)

### Adding the Anthropic Claude Connector

1. Now lets add the **Anthropic Claude custom connector** to the copilot canvas using the **Call an action** option. Select the **Anthropic Claude Custom Connector** that we had previously created.
   ![Add Claude Connector](\images\22_AnthropicProcurement\24.png)

2. Provide the **API key** saved earlier for authentication.
   ![API Key](\images\22_AnthropicProcurement\25.png)

3. Configure the connector fields with the below parameters:
   - **Anthropic-version**: `2023-06-01`
   - **Model**: `claude-3-5-sonnet-20240620`

4. In the **message field**, add the prompt formula to be sent to Claude. Here we sent the dataverse data as well as the instruction to identify low stock from the data. 
   ```
   Table(
    {
        role: "user",
        content: Concatenate(
            "Analyze the given stock levels and determine whether procurement is needed based if the current stock levels is less than the reorder levels. \n\n",
            "**Stock Details**\n",
            Topic.serializedStockDetails,
            "\n\n**User Input:** - The user has selected the following materials for stock check: ",
            Concat(Topic.selectedMaterials, Value, ", "),
            ". Based on the current stock levels and reorder levels for each material asked by the user, identify which materials need to be reordered by checking if the current stock level is less than the reorder level. Ensure that this calculation is accurate. Provide a list of only the materials that need procurement and the reason for each in a bulleted format in less than 100 words.Strictly follow the Bulleted format   Material Name :Current Stock Level : Reorder Level : Procurement Needed ? : "
        )
    }
)

   ```
   ![Prompt Formula](\images\22_AnthropicProcurement\25_1.png)

5. Store the output response from **Anthropic Claude** in the variable **OutputResponse** and configure a **Message node** to display the response back to the user using the below formula.
   ```
   First(Topic.OutputResponse.content).text
   ```
   ![Message Node](\images\22_AnthropicProcurement\26.png)

 

## Testing the Agent

1. **Initiate the conversation** and select materials to analyze from the adaptive card.
   ![Material Selection](\images\22_AnthropicProcurement\27.png)

2. **Click on Check Stock Levels**. This action invokes **Anthropic Claude** to analyze the data and provide recommendations.

   ![Material Selection Output](\images\22_AnthropicProcurement\28.png)
 

## Conclusion

We have successfully created the **Procurement Analyzer Agent**, which leverages **Anthropic Claude** and **Microsoft Copilot Studio** to simplify inventory management. By analyzing Dataverse data, this Agent allows users to make data-driven procurement decisions in real-time, ensuring inventory remains optimized and responsive to changing needs.
