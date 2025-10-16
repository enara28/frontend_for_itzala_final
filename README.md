# Itzala restaurant web app (vite + react)

This app provides the basic management sistem of a restaurant. The admin has the ability to create, delete and update menu items, see all users info (except passwords), see all orders and all reservations and navigate to the main page, menu modal and about page.

The user can create an account, place an order and make a reservation. It can also see its user info, its orders and reservations. Same as the admin can navigate to the menu modal and the about page.
Here it is a basic use case diagram:

I will present every element on the src folder:

## main.js
Introduced all the content to the html document by class name and script. It taked the main.scss file to import all styled and sets the BrowserRouter Component to allow routing.

## assets (folder)

### favicon (folder)
Contains all necessary elements for the favicon.

### logo (folder) > logo-512x512.png
General logo image

### background.jpg
Background image used as base background through styles.

## components (folder)

### app.js
Sets all routes and route control and introduces the header and footer for all the app.

- Functions:
    - `verifyUser()`: axios request to verify if there is a logged in user or admin. Sets the state with the users and admins info to use it as props and control authorization. Triggered on `componentDidMount()`.
    - `handleSuccessfullLogin(data)` (triggered from log-in.js) and `handleSuccessfullLogout()` (triggered from header.js) also set the state info to control authorization.

### general (folder)

- **footer.js:** Displays footer content.

- **header.js:**
    - Displays header content.
    - `logOut()`: axios request to delete cookie and log out.

### helpers (folder)

- **withNavigation.js:** HOC to wrap class components that need access to history.

### pages (folder)

- **about (folder) > about.js:** Displays about content.

- **admin-profile (folder)**

    - **admin.js:** displays the admin page. Functions:

    `handleChange(event)`: sets state with every change in the forms input.

    `handleSubmit(event)`: axios request that creates a new menu item on the database. Triggered by form button.

    `getAllUsers()`: axios request to get all users. Triggered on `componentDidMount()`.

    `getMenuItems()`: axios request to get all menu items. Triggered on `componentDidMount()`.

    `getReservation()`: axios request to get all reservations. Triggered on `componentDidMount()`.

    `getOrders()`: axios request to get all orders. Triggered on `componentDidMount()`.

    `usersInfo()`: displays SingleUser component.

    `menuItems()`: displays MenuItem component.

    `reservations()`: displays SingleReservation component.

    `orders()`: displays SingleOrder component.

    `changeClass(title)`: changes a class name dinamically to display and hide content using styles (`display: block/none`).



    - **profile.js:** displays the prfile page. Functions:

    `getProfile()`: axios request to get logged in user's info. Triggered on `componentDidMount()`.

    `getOrders()`: axios request to get logged in user's orders. Triggered on `componentDidMount()`.

    `getReservations()`: axios request to get logged in user's reservations. Triggered on `componentDidMount()`.

    `showOrders()`: displays SingleOrder component.

    `showReservations()`: displays SingleReservation component.



    - **menu-item.js** (shared): displays one menu item. Functions:

    `deleteProduct(id)`: axios request to delete the item.

    `productToEdit(id)`: axios request to get the item to edit.

    `handleChange(event)`: sets state with every change in the forms input.

    `handleSubmit(event)`: axios request to update the item.



    - **single-order.js** (shared): displays one order. Functions:

    `trimOrders()`: splits the order on comas to display it formated.

    `openDropDown()`: shows order content when title is clicked.

    `closeDropDown()`: hides order content when title is clicked.



    - **single-reservation.js** (shared): displays one reservation.



    - **single-user.js** (shared): displays one user.



- **home (folder) > home.js:** Displays home content and links (changes display if no logged in, logged in by user or logged in by admin). Functions:
    - `handleModalMenu()`: opens modal containing menu.
    - `handleModalReservation()`: opens modal containing reservation form.
    - `handleModalClose()`: closes modal.



- **login (folder) > log-in.js:** Displays login form. Functions:
    - `handleChange(event)`: sets state with every change in the forms input.
    - `handleSubmit(event)`: axios request that logs the user in. Triggered by the form button.



- **modal (folder):**
    - **menu.js:** displays the manu at different parts of the app (modal, order, admin). Functions:

    `getMenu()`: axios request that brings all the menu items. Triggered on `componentDidMount()`.

    `handleChange(event)`: sets state with every change in the forms input (order). Items created dinamicaly on state.

    `handleSubmit(event)`: axios request to create a new order on the database (order). Triggered by the form button.



    - **modal-base.js:** displays base content of the modal and sets its basic styles. Functions:

    `handleClose()`: triggers the `handleModalClose()` from home.js.



    - **reservation.js:** displays reservation form. Functions:

    `handleChange(event)`: sets state with every change in the forms input.

    `handleSubmit(event)`: axios request that creates a reservation on the database. Triggered by the form button.



- **order (folder) > order.js:** Displays order page with Menu component that can be found on modal folder.



- **signin (folder) > sign-in.js:** Displays sign in form. Functions:
    -`handleChange(event)`: sets state with every change in the forms input.
    - `handleSubmitClick(event)`: axios call that created a new user and logs it in automatically. Triggered by the form button.



## style (folder)

### general (folder)
- **footer.scss:** contains footer.js styles
- **header.scss:** contains header.js styles

### helper (folder)
- **media-queries.scss:** contains all media-queries.
- **mixin.scss:** contains all mixins.
- **variables.scss:** contains all variables for main colors and fonts.

### pages (folder)
- **modal** (folder):
    - **menu-modal.scss:** styles for the menu inside the modal.
    - **reservation.scss:** styles for the reservation form inside the modal.
- **about.scss:** styles for the about page.
- **admin.scss:** styles for the admin page, including the components related to the page.
- **home.scss:** styles for the home page.
- **log-sign-in.scss:** shared styles for the login and signin pages.
- **order.scss:** styles for the order page.
- **profile.scss:** styles for the profile page, including the components related to the page.

### main.scss
The rest of the style documents are imported here and there is the main style.