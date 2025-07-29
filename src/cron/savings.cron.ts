import { FastifyInstance } from "fastify";
import fastifyCron from "fastify-cron";
import { applyDailyInterest } from "../modules/savings/savings.service";

export const registerSavingsCron = async (app: FastifyInstance) => {
  await app.register(fastifyCron, {
    jobs: [
      {
        name: "apply-savings-interest",
        cronTime: "0 * * * *", // Every hour
        onTick: async () => {
          app.log.info("Running hourly savings interest calculation job...");
          try {
            await applyDailyInterest();
            app.log.info("Interest calculation completed.");
          } catch (err) {
            app.log.error("Savings interest job failed:", err);
          }
        },
        startWhenReady: true,
      },
    ],
  });
};
