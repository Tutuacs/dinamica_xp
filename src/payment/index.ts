import Elysia from "elysia";
import { ListPaymentController } from "./controllers/list";
import { PaymentPendentController } from "./controllers/pendent";

export const PaymentHandler = new Elysia({name: "PaymentHandler", prefix: "/payment", tags: ["Payment"]})
    .use(ListPaymentController)
    .use(PaymentPendentController)