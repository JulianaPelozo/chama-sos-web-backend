import { Request, Response } from "express";
import { AppDataSource } from "../datasource";
import { Usuario } from "../entities/Usuario";
import bcrypt from "bcryptjs";

export class UsuarioController {

    static listar = async (req: Request, res: Response) => {
        const repo = AppDataSource.getRepository(Usuario);
        const users = await repo.find({
            select: ["id", "nome", "cpf", "email", "funcao", "matricula"]
        });
        res.json(users);
    };

    static criar = async (req: Request, res: Response) => {
        const repo = AppDataSource.getRepository(Usuario);
        const { nome, email, cpf, funcao, senha, matricula } = req.body;

        const hash = await bcrypt.hash(senha, 10);

        const u = repo.create({
            nome, email, cpf, funcao, matricula, senha: hash
        });

        await repo.save(u);

        res.json({ message: "Usuário cadastrado!" });
    };

    static atualizar = async (req: Request, res: Response) => {
        const repo = AppDataSource.getRepository(Usuario);
        const { id } = req.params;

        await repo.update(id, req.body);

        res.json({ message: "Usuário atualizado!" });
    };

    static remover = async (req: Request, res: Response) => {
        const repo = AppDataSource.getRepository(Usuario);
        const { id } = req.params;

        await repo.delete(id);

        res.json({ message: "Usuário removido!" });
    };
}
