# GrocerySite

GrocerySite ek simple web application hai jisme basic grocery store functionality hai — products display, add karna, table structure etc. Yeh project training / work ke liye bana hai.

https://raaz2507.github.io/GrocerySite/
## 🔍 Table of Contents

1. [Features](#features)  
2. [Technologies Used](#technologies-used)  
3. [Project Structure](#project-structure)  
4. [Setup & Installation](#setup--installation)  
5. [Database](#database)  
6. [Usage](#usage)  
7. [Future Improvements](#future-improvements)  
8. [License](#license)  

## Features

- Products listing pages  
- Add product page  
- Static front pages (index, product page etc.)  
- Basic styling with CSS + JS  
- Backend logic using PHP (simple)  
- Uses SQL to manage product table/ data  

## Technologies Used

- HTML  
- CSS  
- JavaScript  
- PHP  
- SQL (MySQL / any SQL engine)  

## Project Structure

```
/GrocerySite
│
├── css/              ← Stylesheets  
├── js/               ← Client‑side JavaScript  
├── img/              ← Images used in site  
├── font/             ← Fonts  
├── php/              ← PHP scripts for backend logic  
├── addProduct.html   ← Page to add new products  
├── index.html        ← Home / landing page  
├── productPage.html  ← Product detail / listing page  
└── create‑table‑template.sql  ← SQL script to create necessary table(s)
```

## Setup & Installation

1. Git clone karo repository:  
   ```bash
   git clone https://github.com/raaz2507/GrocerySite.git
   ```

2. Web server setup karo, jise Apache / Nginx + PHP support ho.

3. SQL database banaao:  
   - `create‑table‑template.sql` file ka use karke table bana lo.  
   - Config file mein DB credentials daalo (agar PHP scripts mein hain).

4. Ensure karo:
   - PHP version compatible ho (jo features use huye hain, e.g. mysqli ya PDO).  
   - Permissions sahi ho (for img/upload etc.).

5. Web root mein files deploy karo.

## Database

- Ek table chahiye hogi, jaise `products` jisme fields ho sakte hain:  
  - id (primary key)  
  - name  
  - price  
  - description  
  - image path  
  - any other attribute

- SQL template provided hai (`create‑table‑template.sql`) jo basic table structure define karta hai.

## Usage

- **Add Product:** `addProduct.html` page pe jaake new product add karo.  
- **View Products:** `index.html` ya `productPage.html` pe product listing or detail dekh sakte ho.  
- **Static navigation and images/fonts** supplied — CSS/JS se look & feel improve hai.  

## Future Improvements

- Authentication / login system  
- Editing / deleting products  
- Image upload support (not just path)  
- Frontend framework use karna (React, Vue etc.)  
- Better responsive design for mobile  
- Validation of data (both client & server side)  
- Use of AJAX / fetch APIs for dynamic updates  

## License

