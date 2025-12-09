import { Request, Response } from "express";
import { AppDataSource } from "../datasource";
import { Ocorrencia } from "../entities/Ocorrencia";

export class OcorrenciaController {

    static listar = async (req: Request, res: Response) => {
        const repo = AppDataSource.getRepository(Ocorrencia);
        const list = await repo.find();
        res.json(list);
    };

    static buscar = async (req: Request, res: Response) => {
        const repo = AppDataSource.getRepository(Ocorrencia);
        const { id } = req.params;

        const ocorrencia = await repo.findOne({ where: { id: Number(id) } });

        if (!ocorrencia)
            return res.status(404).json({ message: "Não encontrada" });

        res.json(ocorrencia);
    };

    static criar = async (req: Request, res: Response) => {
        const repo = AppDataSource.getRepository(Ocorrencia);

        const nova = repo.create(req.body);
        await repo.save(nova);

        res.json({ message: "Ocorrência criada!" });
    };

    static atualizar = async (req: Request, res: Response) => {
        const repo = AppDataSource.getRepository(Ocorrencia);
        const { id } = req.params;

        await repo.update(id, req.body);

        res.json({ message: "Atualizada!" });
    };

    static remover = async (req: Request, res: Response) => {
        const repo = AppDataSource.getRepository(Ocorrencia);
        const { id } = req.params;

        await repo.delete(id);

        res.json({ message: "Removida!" });
    };
}
