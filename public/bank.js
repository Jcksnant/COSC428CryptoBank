const connectBtn = document.getElementById("connectWalletBtn");
const walletAddressSpan = document.getElementById("walletAddress");
const networkNameSpan = document.getElementById("networkName");
const walletBalanceSpan = document.getElementById("walletBalance");

const depositForm = document.getElementById("depositForm");
const withdrawForm = document.getElementById("withdrawForm");

const balanceDisplay = document.querySelector(".balance");
const tableBody = document.getElementById("txTableBody");
const noTransactionsMessage = document.getElementById("noTransactionsMessage");

const walletInputs = document.querySelectorAll(".walletInput");
const networkInputs = document.querySelectorAll(".networkInput");

let provider;
let walletAddress;

const networks = {
    "0x1": "Ethereum Mainnet",
    "0xaa36a7": "Sepolia Testnet",
    "0x5": "Goerli Testnet",
    "0x89": "Polygon",
    "0x539": "Localhost",
    "0x2105": "Base",
    "0xa": "Optimism",
    "0xa4b1": "Arbitrum"
};

async function connectWallet() {
    if (!window.ethereum) {
        alert("MetaMask is not installed.");
        return;
    }

    try {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        walletAddress = accounts[0];

        const chainIdRaw = await window.ethereum.request({
            method: "eth_chainId"
        });

        const chainId = chainIdRaw.toLowerCase();
        const networkName = networks[chainId] || `Unknown Network (${chainId})`;

        provider = new ethers.BrowserProvider(window.ethereum);

        const walletBalance = await provider.getBalance(walletAddress);
        const walletBalanceEth = ethers.formatEther(walletBalance);

        walletAddressSpan.textContent =
            walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4);

        networkNameSpan.textContent = networkName;
        walletBalanceSpan.textContent = Number(walletBalanceEth).toFixed(4) + " ETH";

        walletInputs.forEach(input => input.value = walletAddress);
        networkInputs.forEach(input => input.value = networkName);

        connectBtn.textContent = "Wallet Connected";

    } catch (err) {
        console.error(err);
        alert("Wallet connection failed.");
    }
}

async function submitBankAction(form, url) {
    const formData = new FormData(form);

    const response = await fetch(url, {
        method: "POST",
        body: new URLSearchParams(formData)
    });

    const data = await response.json();

    if (!data.success) {
        alert(data.error || "Transaction failed.");
        return;
    }

    balanceDisplay.textContent = Number(data.newBalance).toFixed(4) + " ETH";

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${data.transaction.type}</td>
        <td>${Number(data.transaction.amount).toFixed(4)} ETH</td>
        <td><span class="status-pill">${data.transaction.status}</span></td>
        <td class="hash-cell">${data.transaction.hash}</td>
    `;

    tableBody.prepend(newRow);

    if (noTransactionsMessage) {
        noTransactionsMessage.style.display = "none";
    }

    form.reset();

    walletInputs.forEach(input => input.value = walletAddress || "");
}

if (connectBtn) {
    connectBtn.addEventListener("click", connectWallet);
}

if (depositForm) {
    depositForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        await submitBankAction(depositForm, "/deposit");
    });
}

if (withdrawForm) {
    withdrawForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        await submitBankAction(withdrawForm, "/withdraw");
    });
}

if (window.ethereum) {
    window.ethereum.on("accountsChanged", () => {
        window.location.reload();
    });

    window.ethereum.on("chainChanged", () => {
        window.location.reload();
    });
}
