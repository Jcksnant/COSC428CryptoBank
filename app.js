require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();

//Creates the Sequelize instance and connects to the MySQL database
//Connects Node.js to the MySQL database using Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: "localhost",
        dialect: "mysql",
        logging: false
    }
);

//Loads User and Transaction models and passes in Sequelize
const User = require("./models/User")(sequelize, DataTypes);
const Transaction = require("./models/Transaction")(sequelize, DataTypes);

//Sets up the relationships between the User and Transaction
User.hasMany(Transaction, { foreignKey: "UserId" });
Transaction.belongsTo(User, { foreignKey: "UserId" });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//Keeps users logged in while moving pages
//Also stores logged in user info
app.use(session({
    secret: process.env.SESSION_SECRET || "fallbacksecret",
    resave: false,
    saveUninitialized: true
}));

app.get("/", (req, res) => {
    res.render("welcome");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    await User.create({
        username,
        password,
        ethBalance: 0
    });

    res.redirect("/login");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username, password } });

    if (!user) {
        return res.render("error", {
            message: "Invalid username or password"
        });
    }

    req.session.userId = user.id;
    req.session.isAdmin = username === process.env.ADMIN_USERNAME;

    res.redirect("/bank");
});

app.get("/bank", async (req, res) => {
    if (!req.session.userId) return res.redirect("/login");

    const user = await User.findByPk(req.session.userId);

    const transactions = await Transaction.findAll({
        where: { UserId: user.id },
        order: [["createdAt", "DESC"]]
    });

    res.render("bank", {
        user,
        transactions,
        isAdmin: req.session.isAdmin
    });
});

app.post("/deposit", async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ success: false, error: "Not logged in" });
        }

        const { amount, walletAddress, networkName } = req.body;
        const depositAmount = parseFloat(amount);

        if (!depositAmount || depositAmount <= 0) {
            return res.status(400).json({ success: false, error: "Invalid deposit amount" });
        }

        const user = await User.findByPk(req.session.userId);
        const newBalance = parseFloat(user.ethBalance) + depositAmount;

        await user.update({ ethBalance: newBalance });

        const shortWallet = walletAddress
            ? walletAddress.slice(0, 6) + walletAddress.slice(-4)
            : "NOWALLET";

        const tx = await Transaction.create({
            type: "ETH Deposit",
            amount: depositAmount,
            status: networkName || "Simulated",
            hash: "SIM-DEPOSIT-" + Date.now() + "-" + shortWallet,
            UserId: user.id
        });

        res.json({
            success: true,
            newBalance,
            transaction: tx
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Deposit failed" });
    }
});

app.post("/withdraw", async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ success: false, error: "Not logged in" });
        }

        const { amount, walletAddress, networkName } = req.body;
        const withdrawAmount = parseFloat(amount);

        if (!withdrawAmount || withdrawAmount <= 0) {
            return res.status(400).json({ success: false, error: "Invalid withdraw amount" });
        }

        const user = await User.findByPk(req.session.userId);

        if (parseFloat(user.ethBalance) < withdrawAmount) {
            return res.status(400).json({ success: false, error: "Insufficient ETH balance" });
        }

        const newBalance = parseFloat(user.ethBalance) - withdrawAmount;

        await user.update({ ethBalance: newBalance });

        const shortWallet = walletAddress
            ? walletAddress.slice(0, 6) + walletAddress.slice(-4)
            : "NOWALLET";

        const tx = await Transaction.create({
            type: "ETH Withdraw",
            amount: withdrawAmount,
            status: networkName || "Simulated",
            hash: "SIM-WITHDRAW-" + Date.now() + "-" + shortWallet,
            UserId: user.id
        });

        res.json({
            success: true,
            newBalance,
            transaction: tx
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Withdraw failed" });
    }
});

//Admin page to view all users and their balances
app.get("/admin", async (req, res) => {
    if (!req.session.isAdmin) {
        return res.render("error", { message: "Not authorized" });
    }

    const users = await User.findAll();
    res.render("admin", { users });
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

sequelize.sync().then(() => {
    app.listen(3000, "0.0.0.0", () =>
        console.log("Server running on port 3000")
    );
});
