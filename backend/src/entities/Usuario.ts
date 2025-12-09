import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("usuarios")
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ nullable: true })
    matricula: string;

    @Column()
    cpf: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    funcao: string;

    @Column()
    senha: string;

    @Column({ nullable: true })
    dataNascimento: string;
}
