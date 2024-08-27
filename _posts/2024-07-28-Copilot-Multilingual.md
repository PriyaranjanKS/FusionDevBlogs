---
layout: post
title:  Multilingual Doctor Appointment Copilot built with Microsoft Copilot Studio
description: We will see the steps needed to create a Multilingual Copilot with which we can converse in language of user choice with Microsoft Copilot Studio.
date: 2024-08-02 15:01:35 +0300
image: '/images/FrontImage/09.png'
tags: [copilot]
---

## Table of Contents
{: .no_toc}

* TOC
{: toc}

## Introduction
Microsoft Copilot Studio allows us to create Copilots that can interact with users in their preferred language. In this blog, we will walk you through building a multilingual Copilot that helps users book doctor appointments for different departments in their preferred language of English or French. The Copilot will also save these appointments in a Dataverse table for easy management and follow-up.

## Process Overview

Our multilingual Copilot will:

1. Interact with users in multiple languages (e.g., English and French).
2. Facilitate booking appointments for different medical specialties: Cardiology, Orthopedics, and Dentistry.
3. Save appointment details to a Dataverse table for tracking and management.

![Create Dataverse Table](\images\09_CopilotMultiLingual\0_0.gif)

## Demo

Watch the demo video below to see how the Copilot assistant helps with doctor appointment booking in both English and French seamlessly.

<iframe width="560" height="315" src="https://www.youtube.com/embed/aZBumYdZtE0?vq=hd1080" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Step-by-Step Guide to Building the Multilingual Copilot

### Step 1: Create a Dataverse Table

Create a new Dataverse table named `DoctorAppointments` with the following columns:
- **PatientName**
- **AppointmentDate**
- **Department**

![Create Dataverse Table](\images\09_CopilotMultiLingual\1_1.png)

### Step 2: Creating the Copilot in Copilot Studio

Head over to [Copilot Studio](https://Copilotstudio.microsoft.com/) and click on **Create**.

![Create Copilot](\images\09_CopilotMultiLingual\1_3.png)

This will provide us the option to create a Copilot based on an existing template or create a blank Copilot from scratch. Let's select **New Copilot**.

![New Copilot](\images\09_CopilotMultiLingual\1_4.png)

This will take us to the page where we can:
1. **Describe the Copilot functionality** and provide any specific instructions to the Copilot.
2. Once done, click on **Create** to provision the Copilot.

![Describe Copilot](\images\09_CopilotMultiLingual\1.png)

**Enable Generative Selection of Topics**

The Copilot is now created. We can then make the needed configuration changes:
1. Click on **Edit**, edit the Copilot details like name, icon, and description.
2. Click on **Settings** to enable the Generative selection of topics so that without relying on triggers, the topics will be auto-selected based on user conversation resulting in a much smoother user experience.

![Edit Copilot](\images\09_CopilotMultiLingual\2.png)

To enable the automatic detection of topics from user interaction:
1. Click on **Generative AI**.
2. Select **Generative (preview)**.
3. Click on **Save** to update the settings.
4. Click on **Close** icon to go back to the home page of this custom Copilot.

![Generative AI Settings](\images\09_CopilotMultiLingual\3_1.png)

### Step 3: Create Topics

Now let’s go ahead and create the topics that will automatically redirect the conversation flow to appropriate topics based on the user's questions:
1. Click on **Topics** from the navigation menu.
2. To add the topic, we can either go with the option to create a blank topic or use Copilot to create the topic with an initial set of prepopulated conversation nodes based on the topic description that we provide.
3. Click on **Add a Topic** and select **Create from description with Copilot**.

![Add a Topic](\images\09_CopilotMultiLingual\3.png)

Provide the below topic description details in the pop-up that opened when we clicked the Add topic button previously. Then, click on **Create**, which will provision the topic skeleton based on the provided description.

![Topic Description](\images\09_CopilotMultiLingual\4.png)

Copilot studio has auto-generated the trigger as well as the conversational questions that will ask for the patient's name, appointment date, and the doctor department for which booking is needed.

![Auto-generated Trigger](\images\09_CopilotMultiLingual\5.png)
![Conversation Nodes](\images\09_CopilotMultiLingual\5_1.png)

As we can see for each node, the user input is being stored in respective variables. Now let’s save these details which the user inputs to Dataverse. For this, we will add the **Dataverse Connector** action.

![Dataverse Connector](\images\09_CopilotMultiLingual\6.png)

Let's configure the connector by mentioning the environment name and Dataverse table along with the **PatientName**, **AppointmentDate**, and **Department**.

![Configure Connector](\images\09_CopilotMultiLingual\7.png)

We have also added a basic card that indicates the success of the booking. Thus, we have completed the Copilot creation. Let’s save and publish it.

![Success Card](\images\09_CopilotMultiLingual\8.png)

### Step 4: Enable Multilingual Capability

Now that the topic and conversation nodes are created, it’s time to make the Copilot multilingual. For this, click on **Copilot Settings**. Within the settings page, select **Language** and click on **Add languages**.

<div class="important-note">
  <p>This should ideally allow us to add the different languages that the Copilot should support. However, as we had previously enabled Generative Topic selection capability, we will not be able to proceed.
</p>
 <p> As of writing of this blog,  <span class="emphasis">Generative Topic Selection does not work hand in hand with the Multilingual Copilot capability</span></p>
  
  
</div>


![Language Settings](\images\09_CopilotMultiLingual\9.png)

Hence, we will have to switch back to **Classic Mode**. So, let's do this from the same settings page:
1. Select **Generative AI**.
2. Select **Classic** option.
3. Save the settings.

![Switch to Classic Mode](\images\09_CopilotMultiLingual\10.png)

Now if we head to the previously created topic, we can see that the Generative nature of the trigger where the topic is automatically triggered by Copilot is replaced with trigger phrases and hence we will have to ensure that all the potential phrases for triggering the topic are added in here.

![Trigger Phrases](\images\09_CopilotMultiLingual\11.png)

Heading back to the Language Settings, we will again try to add the additional language and we can now see that we are able to add new languages. Let's select French and click on **Add Languages**.

![Add French Language](\images\09_CopilotMultiLingual\12.png)

We can now see a new section called **Secondary language** has come up and it shows the newly added French Language. Click on the **Upload** button which will open up a right side pane. It contains the localization files for the French Language. Click on **Download localization file as JSON**. You can also try with ResX which is more of an XML-based resource file but since JSON is easier to edit, we will download the JSON file.

![Download Localization File](\images\09_CopilotMultiLingual\13.png)

The downloaded initial JSON file will look like below which contains the English version of all the conversation nodes across all the existing system and custom topics in the Copilot.

![Initial JSON File](\images\09_CopilotMultiLingual\14.png)

We can see that the data is stored as a key-value pair in JSON. To make the Copilot multilingual, we have to translate each of the values of the key-value pair into French. We can either use the Google translate function or even copy and paste the entire content into ChatGPT and ask it to convert the values into French.

The translated French localization file would look like below:

![Translated JSON File](\images\09_CopilotMultiLingual\15.png)

Now let’s upload the French translated JSON back to the Copilot by clicking on the **Browse** button in the Localizations pane.

![Browse JSON File](\images\09_CopilotMultiLingual\16.png)

Click on **Upload translation updates** to make the French translation available to the Copilot.

![Upload Translation Updates](\images\09_CopilotMultiLingual\17.png)

Click on **Update localizations** to overwrite all past localization that you have done for this Copilot.

![Update Localizations](\images\09_CopilotMultiLingual\18.png)

Thus, we have successfully added a new French language to the Copilot. Let's test the functionality in the test pane.

![Test Pane](\images\09_CopilotMultiLingual\19.png)

## Test Multilingual Copilot

We can switch the language from the test pane. We will first test with the English language.

![Test in English](\images\09_CopilotMultiLingual\20.png)

We will initiate the conversation with a trigger and provide the name and appointment date.

![English Conversation](\images\09_CopilotMultiLingual\20_1.png)

We have also provided the department for consultation and we get a success message indicating the appointment booking.

![Success Message](\images\09_CopilotMultiLingual\21.png)

Checking the backend Dataverse, we can see that the appointment record has been created as well.

![Dataverse Record](\images\09_CopilotMultiLingual\22.png)

Now let’s change the language to French and test the Copilot.

![Switch to French](\images\09_CopilotMultiLingual\23.png)

Now we are able to switch the conversation completely to French as shown below:

![French Conversation](\images\09_CopilotMultiLingual\24.png)

## Conclusion

Creating a multilingual Copilot with Microsoft Copilot Studio empowers you to provide a seamless and personalized experience for users across different languages. By following the steps outlined, you can efficiently set up a Copilot that not only facilitates booking appointments in various medical departments but also integrates with Dataverse to manage these appointments effectively. This approach not only enhances user engagement by catering to language preferences but also streamlines backend operations, ensuring all relevant data is systematically stored and accessible.


<style>
.important-note {
  border-left: 4px solid #8a2be2;
  background-color: #f9f9f9;
  padding: 20px 10px 10px 60px; 
  margin: 20px 0;
  position: relative;
}

.important-note::before {
  content: "⚠️ Important";
  font-weight: bold;
  color: #8a2be2;
  position: absolute;
  left: 6px;
  top: -4px; /* Adjusted top position */
}

.important-note p {
  margin: 0;
  padding: 5px 0; 
}

.important-note a {
  color: #8a2be2;
  text-decoration: none;
}

.important-note a:hover {
  text-decoration: underline;
}

.emphasis {
  font-weight: bold;
  color: #066;
}
</style>