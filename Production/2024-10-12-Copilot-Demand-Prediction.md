---
layout: post
title: Medicine Demand Prediction Copilot: Leveraging Azure Machine Learning for Time Series Forecasting
description: This blog will guide you through the steps to create a Copilot that predicts medicine demand using Azure Machine Learning and time series forecasting.
date: 2024-10-02 12:00:00 +0300
image: '/images/FrontImage/04.png'
tags: [copilot]
---


## Table of Contents
{: .no_toc}

* TOC
{: toc}

## Introduction

# Medicine Demand Prediction Copilot: Leveraging Azure Machine Learning for Time Series Forecasting

## Introduction
In the pharmaceutical industry, accurate demand forecasting is essential for maintaining a stable supply chain and avoiding medicine shortages or overstocking. To address this, businesses can use the power of Microsoft Copilot integrated with Azure Machine Learning to predict the future demand for medicines based on historical data. By leveraging time series forecasting, we can predict the quantity of medicines that will be required in the coming months. This enables companies to make informed decisions about procurement, ensuring the right medicines are available when needed while optimizing costs.  
The Medicine Demand Prediction Copilot is designed to automate this forecasting process. By passing relevant data, such as Date, Medicine Name, Manufacturer, Price Per Unit, and Discount, to an Azure Machine Learning endpoint, the copilot predicts the Quantity Sold for the next month. This prediction can be used by procurement teams to plan medicine purchases more effectively.

## Overall Flow:
1. **Data Input**: The user inputs historical data, including fields like Date, Medicine Name, Manufacturer, Price Per Unit, and Discount.
2. **Invoke Azure Machine Learning Endpoint**: The copilot sends this data to a pre-configured Azure Machine Learning time series forecasting endpoint.
3. **Predict Quantity Sold**: The Azure ML model analyzes the historical data and returns a forecast of the Quantity Sold for each medicine for the upcoming month.
4. **Display Predictions**: The copilot displays the predicted quantity of medicines required, helping the user make data-driven decisions for procurement.
5. **Procurement Decision**: Based on the predicted demand, the procurement team can place orders for the required medicines in advance, optimizing inventory and reducing waste.

---

## Technologies Used:
- **Microsoft Copilot**: A powerful tool used to interact with users and facilitate the flow of information between different services, including machine learning models.
- **Azure Machine Learning (Time Series Forecasting)**: A machine learning service that provides time series forecasting models to predict the future demand for medicines based on historical data.
- **CSV**: For storing and retrieving historical medicine sales data that will be used to train the Azure ML.

---

## Step-by-Step Guide to Building the Medicine Demand Prediction Copilot

### Step 1: Create the CSV with the Medicine Demand History
For this demo, we will be using CSV file which contains the below 7 year medical information from 2018-2024 and will use it to create a Time Series Forecasting Azure ML model which we will consume from Copilot.

- Date  
- MedicineName  
- Manufacturer  
- QuantitySold  
- PricePerUnit  
- Discount  

![1.png](\images\20_DemandPrediction\1.png)

### Step 2: Create the Azure ML Model
1. Head over to the Azure Portal and search and click on **Azure Machine Learning**.  
   ![2.png](\images\20_DemandPrediction\2.png)

2. From **Create**, select **New Workspace**.  
   ![3.png](\images\20_DemandPrediction\3.png)

3. Specify the details of the new machine learning workspace by entering the resource group, name, and region where the workspace has to be hosted. Click on **Create** to provision the resource.  
   ![4.png](\images\20_DemandPrediction\4.png)

4. Once the resource is successfully provisioned either select the **Launch studio** option or head over to [Azure ML Studio](https://ml.azure.com/) to access Azure Machine Learning Studio.  
   ![5.png](\images\20_DemandPrediction\5.png)

5. This will take us to the Azure ML Studio where we will be provisioning the time series model.  
   ![6.png](\images\20_DemandPrediction\6.png)

6. Select **Automated ML** and click on **New Automated ML job**.  
   ![7.png](\images\20_DemandPrediction\7.png)

7. Specify the Job and Experiment name and click on **Next**.  
   ![8.png](\images\20_DemandPrediction\8.png)

8. Select the Task Type as **Time Series forecasting** and click on **Create** which will allow us to add the training data set.  
   ![9.png](\images\20_DemandPrediction\9.png)

9. In this page, specify the dataset name and set the dataset type as **Tabular**. Click on **Next**.  
   ![10.png](\images\20_DemandPrediction\10.png)

10. We can use the dataset from Azure Storage or SQL Databases or even upload a local file. In our demo, we will go ahead and upload the CSV file which contains historic medicine data. Click on **Next**.  
   ![11.png](\images\20_DemandPrediction\11.png)

11. We can select the storage where the uploaded dataset will be stored. We will go ahead with **Azure Blob Storage**. **Azure Data Lake Storage Gen 2** is another option. Click on **Next**.  
   ![12.png](\images\20_DemandPrediction\12.png)

12. Now click on **Upload files** and browse the CSV file and upload the training data.  
   ![13.png](\images\20_DemandPrediction\13.png)

13. Once successfully uploaded, click on **Next**.  
   ![14.png](\images\20_DemandPrediction\14.png)

14. The uploaded dataset is now available for review. Click on **Next**.  
   ![15.png](\images\20_DemandPrediction\15.png)

15. If we want to make changes to the datatype or format, we can do that. We will leave the defaults and click on **Next**.  
   ![16.png](\images\20_DemandPrediction\16.png)

16. Click on **Create** to finalize and create the dataset.  
   ![17.png](\images\20_DemandPrediction\17.png)

17. Select the created dataset and click on **Next** to proceed with the model creation.  
   ![18.png](\images\20_DemandPrediction\18.png)

18. Since we are going to predict the Quantity of medicine sold, we will select the Target column as **QuantitySold**. We will be using the date column in the CSV as the **Time column** which will hold the timestamp for the time series data.  
   ![19.png](\images\20_DemandPrediction\19.png)

19. We will uncheck the **Autodetect forecast horizon** option and set the value as 14. We will also add **ExtremeRandomTrees** in the blocked models so that it won’t be used for training. Click on **Save**.  
   ![20.png](\images\20_DemandPrediction\20.png)

20. We will also enable early termination of the training if the scores do not improve over time. Set the number of **cross-validations** as 5 and click on **Next**.  
   ![21.png](\images\20_DemandPrediction\21.png)

21. To run the training job, we need compute resources for which we will select the compute type as **Compute cluster** and click on **New** to add the compute resource.  
   ![22.png](\images\20_DemandPrediction\22.png)

22. We will select **Dedicated Virtual Machine Tier** and CPU as the Virtual Machine type. For this demo, we are using **Standard_DS12_V2 Configuration**, click on **Next**.  
   ![23.png](\images\20_DemandPrediction\23.png)

23. Specify the compute name and click on **Create**.  
   ![24.png](\images\20_DemandPrediction\24.png)

24. The compute cluster is now provisioned. Click on **Next**.  
   ![25.png](\images\20_DemandPrediction\25.png)

25. Click on **Submit Training Job** to start the model training with the uploaded training data. This will take upwards of 1 hour based on the amount of training data we have.  
   ![26.png](\images\20_DemandPrediction\26.png)

26. After some time, we can see that the model training is completed. Click on the algorithm name present in the **Best Summary model** section.  
   ![27.png](\images\20_DemandPrediction\27.png)

### Step 3: Deploy the Model as an Endpoint
1. We will now deploy this model as an endpoint, for which we will select **Webservice** from the **Deploy** menu.  
   ![28.png](\images\20_DemandPrediction\28.png)

2. Specify the **Endpoint name** and select **Azure Container Instance** as the Compute Type. Click on **Deploy**.  
   ![29.png](\images\20_DemandPrediction\29.png)

3. Once the endpoint is provisioned, we can view it from the **Endpoints** section. The **REST endpoint URL** is the endpoint that we can use for invoking a POST request from Copilot. **Copy this URL**.  
   ![30.png](\images\20_DemandPrediction\30.png)

### Step 4: Creating the Copilot in Copilot Studio
1. Head over to [Copilot Studio](https://copilotstudio.microsoft.com/) and click on **Create**.  
   ![34.png](\images\20_DemandPrediction\34.png)

2. This will provide us the option to create a copilot based on an existing template or create a blank copilot from scratch. Let's select **New Copilot**.  
   ![35.png](\images\20_DemandPrediction\35.png)

3. This will take us to the page where we can:
   - **Describe the copilot functionality** and provide any specific instructions to the copilot.
   - Once done, click on **Create** to provision the copilot.  
   ![35.png](\images\20_DemandPrediction\35.png)

### Step 5: Enable Generative Selection of Topics
1. The copilot is now created. We can then make the needed configuration changes.
   - Click on **Edit**, edit the copilot details like name, icon, and description.
   - Click on **Settings** to enable the **Generative selection of topics** so that without relying on triggers, the topics will be auto-selected based on user conversation, resulting in a much smoother user experience.  
   ![36.png](\images\20_DemandPrediction\36.png)

2. To enable the automatic detection of topics from user interaction:
   - Click on **Generative AI**.
   - Select **Generative (preview)**.
   - Select **High – More precise** for Content Moderation.
   - Click on **Save** to update the settings.
   - Click on the **Close** icon to go back to the homepage of this custom copilot.  
   ![37.png](\images\20_DemandPrediction\37.png)

### Step 6: Create Topics
1. Now let’s go ahead and create the topics that will automatically redirect the conversation flow to appropriate topics based on the question the user posts.
   - Click on **Topics** from the navigation menu.  
   ![38.png](\images\20_DemandPrediction\38.png)

2. To add the topic, we can either go with the option to create a blank topic or use Copilot to create the topic with an initial set of prepopulated conversation nodes based on the topic description that we provide.
   - Let’s click on **Add a Topic** and
   - Select **Create from description with Copilot**.  
   ![39.png](\images\20_DemandPrediction\39.png)

3. Let’s provide the below topic description details in the popup that opened when we clicked the **Add Topic** button previously. Then, click on **Create**, which will provision the topic skeleton based on the provided description.  
   ![39.png](\images\20_DemandPrediction\39.png)

### Step 7: Add Adaptive Card for User Inputs
1. Thus we have the basic topic created with an automatic trigger as well as a question to the user which are generated using the description provided. We can now add more conversation nodes.
   - As the first step, let’s add an **Adaptive Card** to accept details from the user.  
   ![40.png](\images\20_DemandPrediction\40.png)

2. Add the below **Adaptive Card schema** which will accept the **Date, MedicineName, Manufacturer, PricePerUnit, and Discount** from the user.
   ![41.png](\images\20_DemandPrediction\41.png)

3. The output of the adaptive card will contain the user-inputted values in respective variables, which can be passed on to the Azure ML model.  
   ![42.png](\images\20_DemandPrediction\42.png)

4. We want to format the input date as **dd-MM-YYYY** format which is what the Azure ML model will expect. To do this, let’s add a **Variable action** and use **PowerFx** expression to format the date using the below expression.  
   ![43.png](\images\20_DemandPrediction\43.png)

### Step 8: Invoke Azure ML Endpoint
1. As the next step, let’s add an **HTTP Action** which will invoke the **Azure ML time series forecasting model endpoint** and pass the user-entered inputs as parameters to this POST request.  
   ![44.png](\images\20_DemandPrediction\44.png)

2. Specify the Azure ML endpoint URL that we copied from Azure ML Studio into the URL field. Set the method as **POST** and click on **Edit** to add the header and body.  
   ![45.png](\images\20_DemandPrediction\45.png)

3. Click on **Add** and specify the **Key-Value pair** as **Content-Type** and **application/json** respectively. Set the **Body dropdown** as **JSON Content**.  
   ![46.png](\images\20_DemandPrediction\46.png)

4. Since we will be passing dynamic values entered by the user, select **Formula** from the dropdown so that we can use **Power Fx expressions** and reference the adaptive card variables.  
   ![47.png](\images\20_DemandPrediction\47.png)

5. Add the below schema to the text box which will be the body sent to the Azure ML endpoint.  
   ![48.png](\images\20_DemandPrediction\48.png)

6. Now let’s define the output variable as **PredictionResults** and set the response data type as **From sample data**. Click on **Get Schema from sample JSON** to provide the sample output from the Azure ML endpoint, using which it will auto-create the response schema.  
   ![49.png](\images\20_DemandPrediction\49.png)

7. Add the sample output and click on **Confirm**.  
   ![50.png](\images\20_DemandPrediction\50.png)

### Step 9: Display Prediction Results
1. We will add a **Basic Card** and extract the predicted demand using the below expression and show it in the card.  
   ![51.png](\images\20_DemandPrediction\51.png)

Thus we have completed the configuration of the **Copilot Studio** that invokes the **Azure ML Time Series Forecasting endpoint** to predict medicine demand.

---

### Test the Copilot
Now let’s test the Copilot and input the details for checking the demand for the medicine **Morphease for October 2024**.  
![52.png](\images\20_DemandPrediction\52.png)  
The input values are passed to the **Azure ML endpoint**, and we have generated the demand prediction results for the medicine.  
![53.png](\images\20_DemandPrediction\53.png)

---

## Conclusion
The **Medicine Demand Prediction Copilot** leverages **Azure Machine Learning** and **Copilot Studio** to automate the forecasting process for medicine demand. This provides procurement teams with the insights they need to make informed decisions about medicine purchases, ensuring that stock levels are optimized while minimizing the risk of shortages or overstocking. By integrating data input, machine learning prediction, and real-time results into a seamless flow, this solution supports the pharmaceutical industry in maintaining an efficient supply chain.
