import { Request, Response } from "express";
import { AppDataSource } from "../datasource";
import { Usuario } from "../entities/Usuario";
import bcrypt from "bcryptjs";

export class AuthController {

    static login = async (req: Request, res: Response) => {
        const repo = AppDataSource.getRepository(Usuario);
        const { matricula, senha } = req.body;

        const user = await repo.findOne({ where: { matricula } });

        if (!user)
            return res.status(400).json({ message: "Usuário não encontrado" });

        const ok = await bcrypt.compare(senha, user.senha);
        if (!ok)
            return res.status(401).json({ message: "Senha inválida" });

        delete user.senha;

        res.json({
            message: "Login efetuado!",
            user
        });
    };

    static register = async (req: Request, res: Response) => {
        const repo = AppDataSource.getRepository(Usuario);
        const { nome, cpf, matricula, senha, dataNascimento } = req.body;

        const exists = await repo.findOne({ where: { cpf } });
        if (exists)
            return res.status(400).json({ message: "CPF já cadastrado" });

        const hash = await bcrypt.hash(senha, 10);

        const novo = repo.create({
            nome,
            cpf,
            matricula,
            senha: hash,
            dataNascimento
        });

        await repo.save(novo);

        res.json({ message: "Cadastro realizado com sucesso!" });
    };
}
