# Webcarters

This project is a sleek e-commerce product grid built with Next.js 14, TypeScript, Tailwind CSS, and Material-UI. It features an interactive UI that allows users to view products in a grid format and get detailed information via modals only after a successful authentication.

## Live link
```code 
https://webcarters.pages.dev/
```

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

Ensure you have the following installed:
- Node.js 18.0 or later
- npm or Yarn

### Installation

1. Clone the repository:
```bash
git clone git@github.com:mithun-yadav/webcarters.git
cd webcarters
```

2. Install the dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

- **Next.js**: The React framework for production.
- **TypeScript**: Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Material-UI**: A popular React UI framework for faster and easier web development.

## Features

### Responsive Product Grid
- **Dynamic Data Fetching**: Products are fetched dynamically from an external API using Axios, providing live data for the product grid.
- **Product Cards**: Display products in a grid format with each product represented by a card containing an image, title, description, and price.
- **Styling with Material-UI**: Uses Material-UI components for consistent and modern styling of the product cards and layout.
- **Custom Styled Components**: Incorporates custom styled components such as `StyledCard`, `StyledCardMedia`, `ProductName`, `ProductDescription`, and `ProductPrice` for individual product card elements.

### Interactive Product Modals
- **Modal Functionality**: When a product card is clicked, a modal dialog opens, providing detailed information about the selected product.
- **Accessible Navigation**: Supports keyboard navigation within the product grid, allowing users to interact with the grid using arrow keys and to open modals with the Enter key.
- **Aesthetic Presentation**: The modal is styled to center the content within the viewport and includes a box shadow for a subtle depth effect.

### Advanced UI Interactions
- **Ref Handling for Dynamic Content**: Uses React refs to manage focus states dynamically across the product grid, enhancing keyboard navigation.
- **Error Handling**: Includes error logging in the data fetching process, helping to ensure reliability and ease of debugging.

### Enhanced User Experience
- **Material-UI Icons**: Utilizes Material-UI icons such as `CloseIcon` for intuitive user interaction in closing modals.
- **Mobile-First Design**: Embraces a responsive design approach that adapts the product grid and modal layouts to different screen sizes for optimal mobile and desktop viewing.
- **Client-Side Rendering**: The use of "use client" directive indicates client-side data fetching and rendering, ensuring a fast and smooth user experience by leveraging the capabilities of Next.js 14.

### Authentication 
- **Auth**: Username and Password is saved in .env file.

### Customization and Extension
- **TypeScript Interfaces**: Defines TypeScript interfaces for product data, promoting type safety and ease of maintenance.
- **Modular Components**: Components and hooks are modular, allowing for easy expansion or modification of functionality.

### Tech Stack
- **Next.js 14**: The latest version of Next.js, taking advantage of its improved features for performance and scalability.
- **TypeScript**: Utilizes TypeScript for type safety and developer ergonomics.
- **Tailwind CSS**: For custom styling and responsive design not covered by Material-UI.
- **Material-UI**: Provides a comprehensive suite of UI components that are easily customizable and themeable.

This project combines modern web technologies to create an e-commerce platform that is both visually appealing and functionally robust, with a focus on interactivity and ease of use.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI](https://mui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

Made with ❤️ by Mithun