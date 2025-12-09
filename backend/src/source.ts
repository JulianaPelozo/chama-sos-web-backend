import express from "express";
import cors from "cors";
import { AppDataSource } from "./datasource";
import userRoutes from "./routes/userRoutes";
import ocorrenciaRoutes from "./routes/ocorrenciaRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:5502"],
    credentials: true
}));

app.use(express.json());

app.use("/usuarios", userRoutes);
app.use("/ocorrencias", ocorrenciaRoutes);
app.use("/auth", authRoutes);

AppDataSource.initialize().then(() => {
    console.log("Conectado ao MySQL!");
    app.listen(3000, () => console.log("Backend rodando na porta 3000"));
});
