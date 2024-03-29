# Bookstore API

This is a RESTful API for a bookstore. It allows users to sign up, create and manage their profile, browse books by category, and place orders.

## Live Link

The API is currently hosted at https://book-kend-awalhossain.vercel.app/

**NB:**

- When creating a book, use ISO-8601 DateTime format, otherwise it will not work. Example: `2022-01-01T00:00:00.000Z`
- Error handling for Prisma has not been implemented yet. If data is not found, it will return a 500 error with the message: "Internal Server Error".

## Application Routes

### Authentication
- `api/v1/auth/signup` (POST): Allows users to sign up by providing their name, email, password, and phone number.
- `api/v1/auth/signin` (POST): Allows users to log in by providing their email and password. Returns a JWT token.

### User


(**Only admins can access this route.**)
- `api/v1/users` (GET): Returns a list of all users. 
- `api/v1/users/:id` (GET): Returns the profile data for a specific user. Include an id that is saved in your database.
- `api/v1/users/:id` (PATCH): Allows users to update their profile data.
- `api/v1/users/:id` (DELETE): Allows users to delete their account. Include an id that is saved in your database.
    
    (**Only users can access this route.**)
- `api/v1/profile` (GET): Returns the profile data for the currently logged-in user.

### Category

- `api/v1/categories/create-category` (POST): Allows admins to create a new category by providing a name and description.
- `api/v1/categories` (GET): Returns a list of all categories 
- `api/v1/categories/:id` (GET): Returns the details for a specific category with their books.. Include an id that is saved in your database. 
- `api/v1/categories/:id` (PATCH): Allows admins to update the details for a specific category.
- `api/v1/categories/:id` (DELETE): Allows admins to delete a specific category. Include an id that is saved in your database.

### Books

- `api/v1/books/create-book` (POST): Allows admins to create a new book by providing a title, author, description, price, and category ID.
- `api/v1/books` (GET): Returns a list of all books.
- `api/v1/books/:categoryId/category` (GET): Returns a list of all books in a specific category.
- `api/v1/books/:id` (GET): Returns the details for a specific book.
- `api/v1/books/:id` (PATCH): Allows admins to update the details for a specific book.
- `api/v1/books/:id` (DELETE): Allows admins to delete a specific book.

### pagination & search & sort & filter

**API Query Parameters:**

- `page`: The page number for pagination (e.g., `?page=1`).
- `size`: The number of book listings per page (e.g. `?size=10`).
- `sortBy`: The field to sort the book listings (e.g. `?sortBy=price`).
- `sortOrder`: The order of sorting, either 'asc' or 'desc' (e.g. `?sortOrder=asc`).
- `minPrice`: The minimum price for filtering (e.g. `?minPrice=1000`).
- `maxPrice`: The maximum price for filtering (e.g. `?maxPrice=5000`).
- `category`: Filter using category id (e.g : `?category=f1234573-sfkjsf-45332`).
- `search`: The search query string for searching books (e.g., `?searchTerm="Programming"`). (Search Fields should be title, author, genre)

### Orders

- `api/v1/orders/create-order` (POST): Allows users to place an order by providing a list of book IDs.
- `api/v1/orders` (GET): Returns a list of all orders.
- `api/v1/orders/:orderId` (GET): Returns the details for a specific order.

## Contributing

To contribute to the API, follow these guidelines:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request.

## Issues

If you encounter any issues or bugs, please report them by opening a new issue on the repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

If you have any questions or comments, please contact us at bookstore@example.com.

## Acknowledgments

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

## Changelog

### Version 1.0.0 (2022-01-01)

- Initial release of the API.