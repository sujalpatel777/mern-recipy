import cors from "cors";
app.use(cors({
    origin: "https://mern-recipy-1.onrender.com", // your frontend URL
    credentials: true
}));
