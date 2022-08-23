import WalletsPage from "@/pages/WalletsPage.vue";
import WithdrawalPage from "@/pages/WithdrawalPage.vue";

const WalletRoutes = [
    {
        path: "/",
        component: WalletsPage,
        name: "WalletsPage",
    },
    {
        path: "/withdraw=:id",
        component: WithdrawalPage,
        name: "WithdrawalPage",
    },
];

export default WalletRoutes;
