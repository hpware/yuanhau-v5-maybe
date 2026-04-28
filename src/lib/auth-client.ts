import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { genericOAuthClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [adminClient(), genericOAuthClient()],
});

export const {
  signIn,
  signOut,
  useSession,
  getSession,
} = authClient;