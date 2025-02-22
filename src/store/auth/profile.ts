import { apiDomain } from "@/store/api";

export const $profile = apiDomain.store<any | null>(null);
export const setProfile = apiDomain.event<any | null>();

$profile.on(setProfile, (_, value) => value);
