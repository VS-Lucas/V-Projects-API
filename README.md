# V-Projects API

## Description

This is an API project built with [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/).

## Installation

### Prerequisites

Before you begin, you need to have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/installation) installed. If you don't have Node.js and pnpm installed, follow the instructions below to install them:

1. Install Node.js:

    [Download and install Node.js](https://nodejs.org/) from the official website.

2. Install pnpm:

    [pnpm installation instructions](https://pnpm.io/installation)

### Cloning the Repository

1. Clone the repository:

    ```bash
    git clone https://github.com/VS-Lucas/V-Projects-API.git
    cd v-projects-api
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

### Environment Variables

Before starting the project, set up the environment variables. Create a `.env` file in the root of the project and include the following:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="<your_jwt_secret>"
```

## Populating the Database

1. To reset and seed the database, execute:

    ```bash
    npx prisma migrate reset
    ```

## Running the Project

To start the project, use the following command in the terminal from the project's root directory:

```bash
pnpm run start
```

**Hint:**
To accelerate the development process (20 times faster), use the SWC builder by adding the `-b swc` flag to the start script, like this:

```bash
pnpm run start -- -b swc
```

To enable file-watching for automatic restarts on changes, use the following command:

```bash
pnpm run start:dev
```

## Documentation

Access the project documentation at:

[http://localhost:3000/api](http://localhost:3000/api)
