# AElf Proposal Details javascript action

[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

This GitHub Action fetches the proposal details for a proposal ID on the AElf blockchain.

## Inputs

### `proposal-id`

**Required** Proposal ID.

### `node-url`

**Required** AElf Blockchain node url. Default `"https://tdvw-test-node.aelf.io"`.

### `explorer-url`

**Required** AElf Explorer url. Default `"https://explorer-test-side02.aelf.io"`.

## Outputs

### `create-tx-id`

The transaction id of the create proposal transaction.

### `is-contract-deployed`

Whether the contract is deployed.

### `proposal-type`

Type of proposal.

### `proposer`

AElf Address of the proposer.

### `released-tx-id`

The transaction id of the release proposal transaction.

### `status`

Status of the proposal, can be "pending", "expired", or "released".

## Example usage

```yaml
uses: yongenaelf/aelf-proposal-details-action@v1.0.0
with:
  proposal-id: your-proposal-id
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
