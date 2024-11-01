This is a [Next.js](https://nextjs.org) project bootstrapped with [
`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First install all dependencies with

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

The project is organised according to features (see features folder) and within the features according to components and
types (utils or others could be added)

## Testing

Testing is omitted for demo purposes. However, the components (e.g. FunnelPagination) could be tested individually with
React Testing Library.
Since there is not much raw logic, unit tests are not needed.
To make sure everything works end to end, testing with Playwright or Cypress would work.

