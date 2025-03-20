# Beverage System (Cafe Asipiya)

Cafe Asipiya Caters All Your Beverage Needs Within An Aesthetic Ambiance

# Features

- Four beverage categories: Coffee, Tea, Shakes, and Bubble Tea
- Modern and responsive UI
- Real-time category switching
- Easy-to-use ordering interface

# Running the Application
- Backend only: `npm run server`
- Frontend only: `npm run client`

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

# API Endpoints

- GET `/api/beverages` - Get all beverages
- GET `/api/beverages/:category` - Get beverages by category (coffee, tea, shakes, bubbleTea)

# User Instructions (Client)

- The user can visit the website and select a preferred beverage choice from the available 4 menus (Coffee, Shakes, Tea, Bubble Tea)
  
- After picking the beverage the user can click on "Customize" button which will then navigate user to Customize Page
  
- Here the user can select any alternative preferences from the provided options such as : Milk Choices, Flavours Syrups, Sweeteners and provide any special instructions if required
  
- Next the user can click on "Add to Cart" button to add the chosen beverage to the cart
  
- After that the user will be navigated to the Cart Page which displays all their added beverages allowing the options to perform any customize edits and delete any beverage type, along with the receipt which 
  shows the item prices, order no, time needed and the overall total (Note: The order no is automatically generated as per the user)

- If user click on the "+" icon in the Cart page they can add new beverages to the cart
  
- Next the user can click on "Check Out" button to navigate the user to the Check Out Page
  
- Here the user will be provided with a brief description about their chosen beverage items along with a receipt which includes the items, quantity, price, amount, order no, time and overall total
  
- Further the user can select the payment method fron the drop-down and click on "Pay" button to navigate towards the Payment Page
  
- Here user can fill all the relevant payment credentials and click on "Pay" button which will navigate the user to the Payment Confirmation Page
  (Note: All necessary validations have been applied to the payment section)
  
-  Next user will be displayed with an attractive payment confirmation message along with a user-friendly ui
  
-  Next the user can click on "Feedback" button which will navigate the user to the Feedback Page

- Here the user can enter the name, pick the relevant date and time and set the rating level preferred as per the service and add the feedback, also the user can add an attractive profile pic to further 
  personalize the profile (Note: All necessary validations have been applied to the Feedback Form)

- Next the user can click on "Submit" button to submit their feedback which will in return display a "feedback successfully submitted" message and navigate the user to the Feedback Display Page
  
- Here the user will be displayed with an attractive ui which further displays their added feedback along with their chosen ratings level and profile pic along with entered date and time
  
- The user can click on the bin icon to delete their feedback if required

  # User Instructions (Admin)

  - The user can navigate to the Admin side when typing "/admin" in the search bar
    
  - Next the user will be navigated towards the Admin Page where the list of beverage items are displayed with the order state (Process, Preparing, Ready, Completed) and order no along with the "Orders" section 
   and the "Completed" orders section (Note: The book icon is displayed on the orders that have been provided with special instructions)

  - Next the user can click on the "Completed" section to view the list of completed orders (Note: The order will be marked as a completed order only if the user provides the order state as completed from the 
   state drop-down list)

  - Next the user can click on the book icon which will navigate user to the Special Instructions Page
    
  - Here the user will be displayed with the beverage image, name along with the chosen customize options, item no, time taken to prepare and special instructions to be allowed during consumption
    
  - The user can view the completed orders from the special instructions page by simply clicking on the "Completed" tab from the panel


  
