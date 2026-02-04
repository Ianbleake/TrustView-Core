import express from "express";
import "dotenv/config";
import axios from "axios";
import { supabase } from "./supabase.js";
import helmet from "helmet";


const app = express();

app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: false,
  })
);

app.get("/", (_, res) => {
  res.send("TrustView backend vivo");
});

app.get("/oauth/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send("No llegó el code");

  try {
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

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).send("Error guardando tienda");
    }

    console.log("✅ Tienda guardada:", user_id);

    res.send("App instalada correctamente 🚀");
  } catch (err) {
    console.error("OAuth error:", err.response?.data || err.message);
    res.status(500).send("Error OAuth");
  }
});


app.post("/reviews", async (req, res) => {
  const {
    store_id,
    product_id,
    author_name,
    rating,
    content,
    image_url,
  } = req.body;

  if (!store_id || !product_id || !author_name || !rating) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const { error } = await supabase.from("reviews").insert({
    store_id,
    product_id,
    author_name,
    rating,
    content,
    image_url,
    approved: false,
  });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("Backend corriendo en http://localhost:3000");
});
