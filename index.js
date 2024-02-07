const core = require("@actions/core");
const AElf = require("aelf-sdk");
const { deserializeLogs } = require("./deserialize-logs");
let sleep = require("util").promisify(setTimeout);

(async () => {
  try {
    const PROPOSAL_ID = core.getInput("proposal-id", { required: true });
    const NODE_URL = core.getInput("node-url", { required: true });
    const EXPLORER_URL = core.getInput("explorer-url", { required: true });

    const aelf = new AElf(new AElf.providers.HttpProvider(NODE_URL));

    const api = `${EXPLORER_URL}/api/proposal/proposalInfo?proposalId=${PROPOSAL_ID}`;

    let data,
      proposalStatus = "pending",
      retryCount = 0;

    while (proposalStatus === "pending" && retryCount < 20) {
      const res = await fetch(api);
      const {
        data: { proposal },
      } = await res.json();
      data = proposal;

      if (!!proposal?.status) {
        proposalStatus = proposal.status;
      }

      if (proposalStatus === "pending") {
        retryCount++;
        await sleep(2000);
      }
    }

    if (!data) {
      throw new Error("Error fetching from" + api);
    }

    const {
      createTxId,
      isContractDeployed,
      proposalType,
      proposer,
      releasedTxId,
      status,
    } = data;

    core.setOutput("create-tx-id", createTxId);
    core.setOutput("is-contract-deployed", isContractDeployed);
    core.setOutput("proposal-type", proposalType);
    core.setOutput("proposer", proposer);
    core.setOutput("released-tx-id", releasedTxId);
    core.setOutput("status", status);

    await core.summary
      .addDetails("proposalId", PROPOSAL_ID)
      .addDetails("isContractDeployed", isContractDeployed.toString())
      .addDetails("status", status)
      .write();

    if (status === "released" && isContractDeployed === true) {
      const transaction = await aelf.chain.getTxResult(releasedTxId);

      const deserializeLogResult = await deserializeLogs(
        aelf,
        transaction.Logs
      );

      const deployedLog = deserializeLogResult?.pop();

      if (deployedLog) {
        const { address } = deployedLog;
        const link = `${EXPLORER_URL}/address/${address}`;

        await core.summary
          .addDetails("Deployed Contract Address", address)
          .addLink("View deployed contract on AElf Explorer", link)
          .write();
      }
    }
  } catch (error) {
    console.log(error);
    core.setFailed(error.message);
  }
})();
