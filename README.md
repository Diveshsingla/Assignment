# Add Joinee Feature 

## Overview

The "Join” feature is a fundamental part of the App, allowing users to add new subscribers to the system. Subscribers can be students or other users associated with the educational institution. This feature enhances the app's functionality by providing a mechanism to dynamically update the list of joinee’s.

## Implementation Details

### 1. User Interface

The user interface for adding a new subscriber is implemented as a form within the app. The form includes fields for entering the subscriber's name, email, and a unique 16-digit hex code. There’s also an option to download the subscribers list in csv format. The UI is designed to be user-friendly, responsive guiding the user through the process of entering the required information. I have also implemented a drag and drop feature to arrange the order of the subscribers with the possibility to edit or delete a subscriber from the list.


### 2. Unique Hex Code Generation

To ensure uniqueness and identification, each subscriber is assigned a unique 16-digit hex code. This code is automatically generated upon adding a new subscriber. The generation logic may involve a combination of randomisation and validation to ensure the uniqueness of each hex code within the system.

### 3. Form Validation

The form includes validation logic to ensure that the required fields are filled, and the email format is valid. Additionally, checks are implemented to verify the uniqueness of the generated hex code to prevent collisions and ensure data integrity.

### 4. Frontend Implementation

The frontend logic for handling the "Add Joinee” feature is written in React. The state management is handled using React's built-in state and context APIs. I have also stored the data locally to avoid data loss.

