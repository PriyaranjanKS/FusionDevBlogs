---
layout: post
title: Integrating Azure Application Insights with Microsoft Copilot Studio for Enhanced Monitoring and Error Logging
description: We will see the steps needed to Integrate Azure Application Insights and Audit Logs with Microsoft Copilot Studio for Enhanced Monitoring and Error Logging
date: 2024-07-22 15:01:35 +0300
image: '/images/FrontImage/08.png'
tags: [copilot]
---

## Table of Contents
- [Introduction](#introduction)
- [Why Use Application Insights with Copilot Studio?](#why-use-application-insights-with-copilot-studio)
- [Step-by-Step Guide to Integrating Application Insights with Copilot Studio](#step-by-step-guide-to-integrating-application-insights-with-copilot-studio)
  - [Step 1: Setting Up Application Insights](#step-1-setting-up-application-insights)
  - [Step 2: Configure the Copilot](#step-2-configure-the-copilot)
  - [Test the Runtime Error Events](#test-the-runtime-error-events)
  - [Test 2: System / Logical Errors](#test-2-system-logical-errors)
  - [Test 3: Custom Telemetry Events](#test-3-custom-telemetry-events)
- [Copilot Audit Logs](#copilot-audit-logs)
- [Conclusion](#conclusion)

## Introduction

Microsoft Copilot Studio offers an innovative way to build interactive conversational bots. However, to ensure these bots operate smoothly and meet user expectations, integrating effective monitoring tools is crucial. This is where Azure Application Insights comes into play. Application Insights, a component of Azure Monitor, provides deep insights into application performance, user behaviors, and error diagnostics, making it an invaluable tool for enhancing the monitoring and error logging capabilities of your Copilot bots.

In this blog, we will explore how to integrate Application Insights with Copilot Studio Copilots to improve error logging and monitoring, ultimately leading to more reliable and user-friendly interactions.

## Why Use Application Insights with Copilot Studio?

Application Insights offers a range of features that are beneficial for monitoring and improving Copilot performance:

1. **Real-Time Monitoring**: Track the real-time performance and health of all your Copilots in the Copilot Studio, identifying issues as they arise.
2. **Detailed Error Logging**: Capture detailed logs of errors and exceptions, enabling quicker diagnostics and resolution.
3. **User Interaction Analytics**: Analyze user interactions to understand usage patterns and identify potential improvements.
4. **Custom Telemetry**: Collect and analyze custom events tailored to your specific needs.

## Step-by-Step Guide to Integrating Application Insights with Copilot Studio

### Step 1: Setting Up Application Insights

1. **Head over to Azure Application Insights**
   ![1.png](\images\08_CopilotApplicationInsights\1.png)

2. **Specify the Subscription and instance details and click on Review + Create**
   ![2.png](\images\08_CopilotApplicationInsights\2.png)

3. **Copy the connection string from the overview page**
   ![3.png](\images\08_CopilotApplicationInsights\3.png)

4. **View the captured Copilot events in the events tab of the side pane**
   ![4.png](\images\08_CopilotApplicationInsights\4.png)

### Step 2: Configure the Copilot

1. **Select one of the Copilots created and go to Settings**
   ![6.png](\images\08_CopilotApplicationInsights\6.png)

2. **To connect the Copilot with Application Insights:**
   - **Select Copilot details**
   - **Click on Advanced**
   - **Paste the connection string from Application Insights**
   - **Select the type of events and activities to capture**
   - **Click on Save**
   ![7.png](\images\08_CopilotApplicationInsights\7.png)

### Test the Runtime Error Events

1. **Simulate a division by zero error in Power Fx by adding the formula `Value(9)/Value(0)` in the message node**
   ![8.png](\images\08_CopilotApplicationInsights\8.png)

2. **Test the Copilot in the test pane to see the runtime division by zero error**
   ![9.png](\images\08_CopilotApplicationInsights\9.png)

3. **Monitor these events in Application Insights**
   - **View more insights to see detailed error logs**
   ![10.png](\images\08_CopilotApplicationInsights\10.png)

4. **Click on On Error Log to see detailed error logs**
   ![11.png](\images\08_CopilotApplicationInsights\11.png)
   ![12.png](\images\08_CopilotApplicationInsights\12.png)

### Test 2: System / Logical Errors

1. **Induce a system error by self-calling the topic, resulting in an infinite loop**
   - **From within the topic named Tester, add a node and select Topic Management -> Go to another topic -> Tester**
   ![13.png](\images\08_CopilotApplicationInsights\13.png)

2. **Test the Copilot from the test pane to see the infinite loop error**
   ![14.png](\images\08_CopilotApplicationInsights\14.png)

3. **View the detailed error logs in Application Insights**
   ![15.png](\images\08_CopilotApplicationInsights\15.png)
   ![16.png](\images\08_CopilotApplicationInsights\16.png)

### Test 3: Custom Telemetry Events

1. **Log custom events using the "Log a custom telemetry event" action**
   ![17.png](\images\08_CopilotApplicationInsights\17.png)

2. **Enter the custom event details to be logged**
   ![18.png](\images\08_CopilotApplicationInsights\18.png)

3. **Invoke the custom telemetry node and check the logs in Application Insights**
   ![19.png](\images\08_CopilotApplicationInsights\19.png)
   ![20.png](\images\08_CopilotApplicationInsights\20.png)
   ![21.png](\images\08_CopilotApplicationInsights\21.png)

## Copilot Audit Logs

The events around Copilot, such as creation, deletion, changes in authentication, basic details, and topic creation, are also monitored and written into audit logs accessible from Microsoft Purview. The general events logged are listed below:

| Category           | Event                      | Description                                          |
|--------------------|----------------------------|------------------------------------------------------|
| Copilots           | BotCreate                  | The creation of a new Copilot in Copilot Studio      |
| Copilots           | BotDelete                  | The deletion of a Copilot in Copilot Studio          |
| Copilots           | BotAuthUpdate              | Updating the authentication settings of a Copilot    |
| Copilots           | BotIconUpdate              | Updating the Copilot icon                            |
| Copilots           | BotPublish                 | Publishing of a Copilot                              |
| Copilots           | BotShare                   | Sharing of a Copilot to other users                  |
| Copilots           | BotAppInsightsUpdate       | Updating the App Insights logging configuration      |
| Copilot Component  | BotComponentCreate         | The creation of a component (e.g., topic, skill)     |
| Copilot Component  | BotComponentUpdate         | The update of a component                            |
| Copilot Component  | BotComponentDelete         | The deletion of a component                          |
| AI Plugin          | AIPluginOperationCreate    | Creating an AI Plugin for a Copilot                  |
| AI Plugin          | AIPluginOperationUpdate    | Updating an AI Plugin for a Copilot                  |
| AI Plugin          | AIPluginOperationDelete    | Removing an AI Plugin for a Copilot                  |
| Environment Variable| EnvironmentVariableCreate  | Creating an environment variable for a Copilot       |
| Environment Variable| EnvironmentVariableUpdate  | Updating an environment variable                     |
| Environment Variable| EnvironmentVariableDelete  | Deleting an environment variable                     |

1. **Access these logs from the compliance portal by clicking on the Audit tab**
   ![22.png](\images\08_CopilotApplicationInsights\22.png)

2. **Search for specific events within a timeline**
   ![23.png](\images\08_CopilotApplicationInsights\23.png)
   ![23_5.png](\images\08_CopilotApplicationInsights\23_5.png)

3. **View the detailed list of selected search events**
   ![24.png](\images\08_CopilotApplicationInsights\24.png)
   ![25.png](\images\08_CopilotApplicationInsights\25.png)
   ![26.png](\images\08_CopilotApplicationInsights\26.png)

## Conclusion

Integrating Azure Application Insights with Microsoft Copilot Studio enhances monitoring, diagnosing, and optimizing Copilot applications. It provides detailed telemetry and error logging to gain insights into performance, quickly resolve issues, and understand user interactions. By capturing critical data on runtime and system errors and logging custom telemetry events, Application Insights ensures robust Copilot bots. Coupled with audit logs in Microsoft Purview, it ensures comprehensive tracking of key events for effective governance, reliability, and security of Copilot solutions.
