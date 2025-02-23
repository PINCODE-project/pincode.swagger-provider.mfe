import { createDomain, createEvent } from "effector";

export const apiDomain = createDomain("api");

export const resetDomain = createEvent();

apiDomain.onCreateStore((store) => {
    store.reset(resetDomain);
});
