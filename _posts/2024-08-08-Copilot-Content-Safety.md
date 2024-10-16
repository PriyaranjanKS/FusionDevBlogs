---
layout: post
title:  Build a Responsible AI Copilot with Azure Content Safety Service
description: We will see the steps needed to create a Copilot with Azure Content Safety and United Nations Website Integration
date: 2024-10-16 15:01:35 +0300
image: '/images/FrontImage/ResponsibleAICover.png'
tags: [copilot]
---

## Table of Contents
{: .no_toc}

* TOC
{: toc}

## Introduction

In this blog, we will create a Copilot that can accept user input, check if it's safe using Azure Content Safety against four categories (self-harm, hate, violence, and sexual), and if deemed safe, query the United Nations website using generative actions to provide a response to the user. Follow the steps below to build this solution.

## Prerequisites
Before we start, ensure you have the following:
- An Azure account
- Access to Azure Content Safety
- Access to Copilot Studio

## Step 1: Setting Up Azure Content Safety

### Create an Azure Content Safety Resource
1. **Head over to Azure portal and search for Content Safety**
    ![Search Content Safety](\images\15_CopilotContentSafety\1.png)

2. **Select Create**, which will open the window to add the Content Safety configurations.
    ![Create Content Safety](\images\15_CopilotContentSafety\2.png)

3. **Specify the Subscription and Instance details for the Content Safety Service**. Click on **Review and Create**.
    ![Review and Create](\images\15_CopilotContentSafety\3.png)

4. **From the Keys and Endpoint section of the service, Copy the Endpoint and Key** which we will be using in the Copilot.
    ![Keys and Endpoint](\images\15_CopilotContentSafety\4.png)

## Step 2: Create the Copilot
1. **Head over to [Copilot Studio](https://copilotstudio.microsoft.com/) and click on Create**.
    ![Create Copilot](\images\15_CopilotContentSafety\5.png)

2. **Select “New copilot”** to create a copilot from scratch.
    ![New Copilot](\images\15_CopilotContentSafety\6.png)

3. **Describe the copilot functionality and provide any specific instructions to the copilot**. Once done, click on **Create** to provision the copilot.
    ![Describe and Create](\images\15_CopilotContentSafety\7.png)

## Step 3: Enable Generative Selection of Topics
1. **Click on Edit**, edit the copilot details like name, icon, and description.
2. **Click on Settings** to enable the Generative selection of topics so that without relying on triggers, the topics will be auto-selected based on user conversation resulting in a much smoother user experience.
    ![Edit and Settings](\images\15_CopilotContentSafety\8.png)

3. **Click on Generative AI**.
4. **Select Generative (preview)**.
5. **Click on Save** to update the settings.
6. **Click on Close icon** to go back to the home page of this custom copilot.
    ![Generative AI Settings](\images\15_CopilotContentSafety\9.png)

## Step 4: Create Topics
1. **Click on Topics** from the navigation menu.
2. **Click on Add a Topic** and select **Create from description with Copilot**.
    ![Add a Topic](\images\15_CopilotContentSafety\11.png)

3. **Provide the topic description details** and click on **Create**, which will provision the topic skeleton based on the provided description.
    ![Create Topic from Description](\images\15_CopilotContentSafety\12.png)

4. **Add a variable to store the user query**:
    - From variable management, select **Set a variable value**.
    ![Set a Variable](\images\15_CopilotContentSafety\14.png)

    - Configure the variable:
        1. Set the variable name to `varUserQuery`.
        2. Click the arrow next to the **To Value**.
        3. Select the **System** tab.
        4. Set the value to `Activity.Text`.
        ![Configure Variable](\images\15_CopilotContentSafety\15.png)

5. **Add the step to invoke the Azure Content Safety API** to validate the user query and check for any unsafe content:
    - From the advanced tab, select **Send HTTP Request**.
    ![Send HTTP Request](\images\15_CopilotContentSafety\16.png)

6. **Configure the HTTP Action**:
    - Paste the content safety URL saved from Azure Portal.
    - Select the Method as **POST**.
    - Click on **Edit** in the Headers and body section.
    ![Configure HTTP Action](\images\15_CopilotContentSafety\17.png)

    - Add 2 headers:
        1. Set the Key as `Content-Type`.
        2. Set the Value as `application/json`.
        3. Click on **Add**.
        ![Add Content-Type Header](\images\15_CopilotContentSafety\20.png)

        4. Set the Key as `Ocp-Apim-Subscription-Key`.
        5. Set the Value to the content safety endpoint key saved from Azure.
        ![Add Subscription Key Header](\images\15_CopilotContentSafety\21.png)

    - Update the request body:
        - Select **JSON Content** from the Body section.
        - Select **Edit Formula** and click on **Formula** to add the user query variable.
        ![Edit Formula](\images\15_CopilotContentSafety\23.png)

        - Add the below expression to the body tag:
            ```json
            {
              "Text": Topic.varUserQuery
            }
            ```
            ![Body Expression](\images\15_CopilotContentSafety\24.png)

    - Define the response data type:
        - Select **From sample data** to provide the sample output.
        - Paste the below schema in the pop-up and click on **Confirm**:
            ```json
            {
                "blocklistsMatch": [],
                "categoriesAnalysis": [
                    {
                        "category": "Hate",
                        "severity": 2
                    },
                    {
                        "category": "SelfHarm",
                        "severity": 0
                    },
                    {
                        "category": "Sexual",
                        "severity": 0
                    },
                    {
                        "category": "Violence",
                        "severity": 0
                    }
                ]
            }
            ```
            ![Sample Schema](\images\15_CopilotContentSafety\27.png)

7. **Create a new variable** to hold the output of the content safety API, named `varSafetyOutput`.
    ![Variable for Safety Output](\images\15_CopilotContentSafety\28.png)

8. **Declare variables for the content safety ratings**:
    - Hate Severity:
        ```plaintext
        First(Filter(Topic.varSafetyOutput.categoriesAnalysis, category = "Hate")).severity
        ```
        ![Hate Severity](\images\15_CopilotContentSafety\29.png)

    - Self Harm Severity:
        ```plaintext
        First(Filter(Topic.varSafetyOutput.categoriesAnalysis, category = "SelfHarm")).severity
        ```
        ![Self Harm Severity](\images\15_CopilotContentSafety\30.png)

    - Sexual Severity:
        ```plaintext
        First(Filter(Topic.varSafetyOutput.categoriesAnalysis, category = "Sexual")).severity
        ```
        ![Sexual Severity](\images\15_CopilotContentSafety\31.png)

    - Violence Severity:
        ```plaintext
        First(Filter(Topic.varSafetyOutput.categoriesAnalysis, category = "Violence")).severity
        ```
        ![Violence Severity](\images\15_CopilotContentSafety\32.png)

9. **Create an overall safety variable** named `varOverallSafety` to determine if there is any sort of content safety issue:
    ```plaintext
    If(
        Topic.varHateSeverity = 0 && 
        Topic.varSelfHarmSeverity = 0 && 
        Topic.varSexualSeverity = 0 && 
        Topic.varViolenceSeverity = 0,
        "Safe",
        "Unsafe"
    )
    ```
    ![Overall Safety](\images\15_CopilotContentSafety\33.png)

10. **Check the `varOverallSafety` variable** and create a positive control flow branch:
    - **Add the condition action**.
    ![Condition Action](\images\15_CopilotContentSafety\34.png)

    - **Add the generative answers node** in the positive branch:
        - Select **Generative Answers**.
        - Configure the input to use `varUserQuery`.
        ![Generative Answers Node](\images\15_CopilotContentSafety\35.png)

    - **Edit the data source** and click on **Add knowledge** to enter the United Nations website as the source.
        - Select **Public Websites** as the knowledge source.
        - Enter the UN website link and click on **Add**.
        ![Add Knowledge Source](\images\15_CopilotContentSafety\37.png)
        ![Public Websites Source](\images\15_CopilotContentSafety\38.png)
        ![UN Website Link](\images\15_CopilotContentSafety\39.png)

    - **In the negative flow branch**, add the below expression to check the 4 variables and provide appropriate messages to the user:
        ```plaintext
        If(
            Topic.varHateSeverity > 0,
            "The query contains hate speech. Please reformulate your question.",
            ""
        ) & 
        If(
            Topic.varSelfHarmSeverity > 0,
            "The query indicates self-harm. Please seek immediate help or contact a professional.",
            ""
        ) &
        If(
            Topic.varSexualSeverity > 0,
            "The query contains inappropriate sexual content. Please rephrase your question.",
            ""
        ) &
        If(
            Topic.varViolenceSeverity > 0,
            "The query contains references to violence. Please reformulate your question.",
            ""
        )
        ```
        ![Negative Flow Expression](\images\15_CopilotContentSafety\40.png)

Thus we have completed the configuration of the copilot and have ensured that proper content safety is checked before generating the contextual answers from the UN website.

## Test the Copilot
1. **Test the copilot by triggering the conversation with a question**. You can see that the Azure Content Safety API has detected hate speech and has given the custom message back to the user to reformulate the question.
    ![Hate Speech Detection](\images\15_CopilotContentSafety\41.png)

2. **Ask another question**. You can see that this time the Azure Content Safety has detected violence in the user query and has asked to reformulate the question.
    ![Violence Detection](\images\15_CopilotContentSafety\42.png)

3. **Ask a content safe question**. You can see that the copilot fetches the accurate information along with citation links from the UN website using its generative AI capabilities.
    ![Content Safe Response](\images\15_CopilotContentSafety\43.png)

## Conclusion
In this blog, we demonstrated how to create a Copilot that uses Azure Content Safety to filter user inputs against harmful content categories and queries the United Nations website for safe user inputs. This approach ensures a secure and informative interaction with the Copilot, providing accurate information while maintaining user safety. By following these steps, you can build similar solutions that integrate content safety checks with generative AI capabilities to deliver valuable and secure user experiences.
