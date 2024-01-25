# AElf Deploy Proposal ID javascript action

[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

This GitHub Action fetches the proposal ID for a transaction ID of a `DeployUserSmartContract` transaction on the AElf blockchain.

## Inputs

### `transaction-id`

**Required** Transaction ID of `DeployUserSmartContract` transaction.

### `node-url`

**Required** AElf Blockchain node url. Default `"https://tdvw-test-node.aelf.io"`.

### `explorer-url`

**Required** AElf Explorer url. Default `"https://explorer-test-side02.aelf.io"`.

## Outputs

### `deployment-proposal-id`

Deployment proposal id.

## Example usage

```yaml
uses: yongenaelf/aelf-deploy-proposal-id-action@v1.0.0
with:
  transaction-id: your-transaction-id
```

## For developers

### Install ncc and dependencies

```bash
npm i -g @vercel/ncc
npm install
```

### Local development (Watch mode)

Update the `.env.development` file with your desired values.

```bash
npm run dev
```

### Build

Whenever you make changes to index.js, build and push using these commands:

```bash
npm run build
git add .
git commit -m "feat: your commit message"
```

### Release

Handled by semantic-release.

### References

https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action
