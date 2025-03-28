import Elysia from "elysia";
import { ListPaymentController } from "./controllers/list";
import { PaymentPendentController } from "./controllers/pendent";
import { PaymentPaydController } from "./controllers/payd";
import { PaymentByDateController } from "./controllers/byDate";

export const PaymentHandler = new Elysia({name: "PaymentHandler", prefix: "/payment", tags: ["Payment"]})
    .use(ListPaymentController)
    .use(PaymentPendentController)
    .use(PaymentPaydController)
    .use(PaymentByDateController)