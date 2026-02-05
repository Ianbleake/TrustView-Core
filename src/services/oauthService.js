import axios from "axios";
import { supabase } from "../config/supabase.js";

export async function handleOAuthCallback(code) {
  const { data } = await axios.post(
    "https://www.tiendanube.com/apps/authorize/token",
    {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
    }
  );

  const { access_token, user_id, scope } = data;

  const { error } = await supabase
    .from("stores")
    .upsert(
      {
        tienda_nube_user_id: user_id,
        access_token,
        scope,
      },
      { onConflict: "tienda_nube_user_id" }
    );

  if (error) throw error;
}
