# Marketplace frontend

This repository contains the frontend of the Sedimark marketplace, a web application to
help Sedimark participants to publish, discover and consume offerings in the Sedimark
catalogue.

## Getting started

### With Docker

You can run only the marketplace frontend using docker:

```bash
docker run -d -p 3000:3000 sedimark/marketplace-frontend:dev
```

### With Docker Compose

To spawn a marketplace frontend instance together with its dependencies:

```bash
export MARKETPLACE_IMAGETAG="dev"
docker-compose up
```

### In Kubernetes

Some kubernetes manifests are provides in the `kubernetes` directory. The ingress manifest
assumes that Traefik is used as the ingress controller, and that a middleware named
`traefik-chain-oauth` is available to handle the OAuth2 authentication. Feel free to
adapt the ingress manifest to your needs.

Prior to the deployment, export the necessary environment variables:

```bash
# App env
export BATCH_SIZE=40
# Kubernetes
export PUBLIC_NODE_DOMAIN="sedimark.ari-energy.eu"
export MARKETPLACE_IMAGETAG="dev"
```

You can now apply the Kubernetes manifests:

```bash
cat ./kubernetes/*.yaml | envsubst | kubectl apply -f -
```

### Local development

To run the marketplace frontend locally, you need to have Node.js and npm installed. Then, you can clone the repository and install the dependencies
using npm:

```bash
npm install
```

Then, you can either create a `.env` based on the provided `.example.env` file, or set the environment variables directly in your shell.
Finally, you can start the development server:

```bash
npm run dev
```

Alternatively, if you use Nix with flakes, you can set up a development shell with Node.js and npm installed, and the `.env` file automatically sourced by simply running:

```bash
nix develop
```
