---
layout: post
title:  Creating a Smart Supply Chain Copilot with AI Prompt
description: We will see the steps needed to create an intelligent Supply Chain Copilot with Microsoft Copilot Studio.
date: 2024-07-22 15:01:35 +0300
image: '/images/FrontImage/10.png'
tags: [copilot]
---

## Table of Contents
{: .no_toc}

* TOC
{: toc}

## Introduction
Leveraging advanced technologies like Microsoft Power Platform can significantly enhance your supply chain operations. In this blog, we will explore how to create a Copilot for supply chain management that identifies the best vendor based on vendor details stored in Dataverse. This Copilot will utilize parameters like lead time, quality score, and unit price, and employ AI prompts to make intelligent vendor recommendations.

## Overview
Our supply chain Copilot will:
1. **Fetch Vendor Details from Dataverse**: Retrieve data for multiple vendors, each providing the same product with different parameters.
2. **Use AI to Identify the Best Vendor**: Implement AI-powered analysis to find the most suitable vendor based on the retrieved data and parameters like lead time, quality score, and unit price.
![Vendor Details](\images\10_CopilotAIPrompt\0_0.png)

## Step-by-Step Guide to Building the Supply Chain Copilot

### Step 1: Set Up Dataverse for Vendor Data
To begin, we need to organize our vendor details in Dataverse. Create a table named **Vendor Details** with the following columns:
- **Material Name**: The name of the material or product (e.g., Aluminium Sheets, Copper Wires).
- **Vendor Name**: The name of the vendor supplying the product.
- **Unit Price (Dollars)**: The cost per unit of the product.
- **Quality Score**: A score representing the quality of the product (typically on a scale of 1-100).
- **Lead Time (Days)**: The time taken by the vendor to deliver the product.

### Step 2: Populate the Dataverse Table
Enter the vendor details into the Dataverse table. We have the below data for the demo:
![Vendor Details](\images\10_CopilotAIPrompt\1.png)

### Step 3: Creating the Copilot in Copilot Studio
Head over to [Copilot Studio](https://copilotstudio.microsoft.com/) and click on **Create**.

![Create Copilot](\images\10_CopilotAIPrompt\1_3.png)

This will provide us the option to create a copilot based on an existing template or create a blank copilot from scratch. Let's select **New Copilot**.

![New Copilot](\images\10_CopilotAIPrompt\1_4.png)

This will take us to the page where we can:
1. **Describe the copilot functionality** and provide any specific instructions to the copilot.
2. Once done, click on **Create** to provision the copilot.

![Create Copilot](\images\10_CopilotAIPrompt\2.png)

### Step 4: Enable Generative Selection of Topics (Dynamic Chaining)
The copilot is now created. We can then make the needed configuration changes:
1. Click on **Edit**, edit the copilot details like name, icon, and description.
2. Click on **Settings** to enable the **Generative selection of topics** so that without relying on triggers, the topics will be auto-selected based on user conversation resulting in a much smoother user experience.

![Edit Copilot](\images\10_CopilotAIPrompt\3.png)

To enable the automatic detection of topics from user interaction:
1. Click on **Generative AI**.
2. Select **Generative (preview)**.
3. Click on **Save** to update the settings.
4. Click on the **Close icon** to go back to the home page of this custom copilot.

![Generative AI](\images\10_CopilotAIPrompt\4_1.png)

### Step 5: Create Topics
Now let’s go ahead and create the topics that will automatically redirect the conversation flow to appropriate topics based on the question user posts.
1. Click on **Topics** from the navigation menu.
To add the topic, we can either go with the option to create a blank topic or use Copilot to create the topic with an initial set of prepopulated conversation nodes based on the topic description that we provide.
2. Click on **Add a Topic** and 
3. Select **Create from description with Copilot**.

![Add Topic](\images\10_CopilotAIPrompt\4.png)

Let’s provide the below topic description details in the pop-up that opened when we clicked the **Add topic** button previously.
Then, click on **Create**, which will provision the topic skeleton based on the provided description.

![Create Topic](\images\10_CopilotAIPrompt\5.png)

Thus we have the basic topic created with an automatic trigger as well as a question to the user which are generated using the description provided. We can now add more conversation nodes.

![Topic Created](\images\10_CopilotAIPrompt\6.png)

We now need to fetch the vendor details from the Dataverse table for which we will call a Power Automate. Let's first create the flow by:
1. Select **Call an action**.
2. From the **Basic actions** tab, click on **Create a flow**.

![Create Flow](\images\10_CopilotAIPrompt\7.png)

This will open the Power Automate site where we will be taken to the newly created flow where we will:
1. First change the flow name to **Get Vendor Details**.
2. Click on **+ Sign** to add a new action.
3. Search for **List Rows** and select the action by the same name under the Dataverse section.

![List Rows](\images\10_CopilotAIPrompt\8.png)

We will then configure the List rows action by:
1. Specifying the table name.
2. Mention the logical names of the columns that we want to fetch from the Vendor Details table.

![Configure Action](\images\10_CopilotAIPrompt\9.png)

**Note**: You can get the logical name of the columns used in the **Select columns** field from the Dataverse table by following the below path:

![Logical Names](\images\10_CopilotAIPrompt\10.png)

Now let's initialize a variable to hold the output that we will return back to the copilot.

![Initialize Variable](\images\10_CopilotAIPrompt\11.png)

We will name the variable as **varOutput** of type string.

![Variable Name](\images\10_CopilotAIPrompt\12.png)

Next, we want to iterate the Dataverse returned values and create a collection of vendor details in a specific format. To do this, let's add the **Apply to each** loop to the designer.

![Apply to Each](\images\10_CopilotAIPrompt\13_0_1.png)

We will configure the Apply to each action to loop through the Dataverse returned table rows.

![Configure Loop](\images\10_CopilotAIPrompt\13_0_2.png)

Within the added **Apply to each**, let's add a **Compose action**, since we need to build the output that must be returned to copilot in a specific format.

![Compose Action](\images\10_CopilotAIPrompt\13.png)

We will add the below formula to the Compose action because we want to create the vendor details as a string output in the format:

```
VendorName : <VendorValue>, LeadTime: <LeadTimeValue>, QualityScore: <QualityScore>, UnitPrice: <UnitPrice>
```

We could easily create a table in the above format using Select action, but since the AI Prompt within copilot expects the input to be a string, we will be using the compose action to create the required string formatted output.

```
concat('VendorName: ', item()?['cr06f_vendorname'], ', LeadTime: ', item()?['cr06f_leadtimedays'], ', QualityScore: ', item()?['cr06f_qualityscore'], ', UnitPrice: ', item()?['cr06f_unitpricedollars'], ', MaterialName: ', item()?['cr06f_materialname'])
```
![Formula](\images\10_CopilotAIPrompt\14.png)

Within the Apply to each loop, just after the Compose action, let's add the **Append to string action** so that each of the looped Dataverse rows is formatted and added to the output variable.

![Append to String](\images\10_CopilotAIPrompt\15.png)

Thus in each of the iteration, the vendor rows will get formatted as a string and get appended to the output variable.

![Format Rows](\images\10_CopilotAIPrompt\16.png)

Finally, let's return back the output variable to the copilot.

![Return Output](\images\10_CopilotAIPrompt\17.png)

Click on **Publish** to save and publish the flow.

![Publish Flow](\images\10_CopilotAIPrompt\18.png)

Let's head back to the copilot and click on **Done** so that we can add this new flow to the copilot.

![Done](\images\10_CopilotAIPrompt\19.png)

Select the recently added flow from the **Call an action** which will make the flow available for triggering from the copilot as an action.

![Select Flow](\images\10_CopilotAIPrompt\20.png)

As we can see, the vendor details records are now returned as a string which we will use as one of the inputs to the AI Prompt along with the Product Name for which we are initiating a procurement.

![Vendor Details](\images\10_CopilotAIPrompt\21.png)

Now let's add the AI prompt using which we can find the best vendor for the product specified by the user. To do this:
1. Select **Call an action** and 
2. From **Basic Actions**, select **Create a prompt**.

![Create Prompt](\images\10_CopilotAIPrompt\22.png)

This will open up the Prompt AI Builder in a pop-up where we can:
1. Create the **Product Variable** to which we will pass the user-inputted product name for which he is finding the best vendor.
2. Create the **Product Details variable** to which we will pass the Power Automate returned vendor details.
3. In the Prompt section use the below prompt and add the variables dynamically using the **Insert** button which will allow us to add the Product and Product Details input variables into the prompt.
4. Click on **Save custom prompt** which will make the prompt available in the copilot designer.

![AI Prompt](\images\10_CopilotAIPrompt\23.png)

The prompt is now available, let's configure it by adding the first input parameter which is the user input **Product Name**.

![Product Name](\images\10_CopilotAIPrompt\24.png)

Next, we will add the Power Automate returned output variable to the **Product Details** field.

![Product Details](\images\10_CopilotAIPrompt\25.png)

Finally, we need to store the output record generated by the Prompt action in a variable for which we will create a new variable by the name **varBestVendor**.

![Best Vendor Variable](\images\10_CopilotAIPrompt\26.png)

Thus we have configured the Prompt action with the required input and it should ideally fetch us back the best vendor for the passed-in product based on the Unit Price, Lead Time, and Quality Score parameters. 
Finally, we will show the best vendor output as a basic card back to the user for which we will select the **text** property of the **varBestVendor** record which will contain the generative AI output.

![Best Vendor Output](\images\10_CopilotAIPrompt\27.png)

## Publish the Copilot to Teams
We will finally publish the copilot and add it to the Teams Channel for which we will enable the teams channel by selecting the **Channels Tab** -> **Microsoft Teams** -> **Turn On Teams**.

![Turn On Teams](\images\10_CopilotAIPrompt\28.png)

Click on the **Availability Options** to select how to distribute the copilot within Teams.

![Availability Options](\images\10_CopilotAIPrompt\29.png)

We have the option to publish the app to the app store which goes through an admin approval or we can download the zip file and upload it as a personal app. For this demo, we will go publishing the app org-wide.

![Publish App](\images\10_CopilotAIPrompt\30.png)

Click on **Submit for Admin approval** and the admin can approve this from the Teams admin center.

![Submit Approval](\images\10_CopilotAIPrompt\31.png)

We can see that the copilot has become available for publishing in the Teams admin center. Click on **Publish**.

![Publish](\images\10_CopilotAIPrompt\32.png)

Let's now add the copilot to Teams so that we can interact and get results with it.

![Add to Teams](\images\10_CopilotAIPrompt\33.png)

Thus we have initiated the conversation with the copilot and tried to find the best vendor for Copper Wires.
If we filter the Dataverse table for Copper Wire Vendors, we could see 3 records but AI prompt that we used have refined the results by comparing the Unit Price and Quality score to arrive at the best vendor.

![Copper Wire Vendors](\images\10_CopilotAIPrompt\35.png)

We can see that the copilot has picked the vendor details from Dataverse and using the AI Prompt, fetched the generative contextual answer for the best vendor by comparing the unit price and quality score.

![Best Vendor Result](\images\10_CopilotAIPrompt\34.png)

## Conclusion
In this blog, we've explored how to build a supply chain Copilot using Microsoft Power Platform and Dataverse to streamline the vendor selection process. By leveraging Dataverse for structured storage of vendor details and employing AI prompts for intelligent analysis, our Copilot provides an efficient solution for identifying the best vendor based on critical parameters like lead time, quality score, and unit price.
