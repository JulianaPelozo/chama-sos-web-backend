import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("ocorrencias")
export class Ocorrencia {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @Column()
    localizacao: string;

    @Column()
    prioridade: string;

    @Column()
    tipo: string;

    @Column({ default: "pendente" })
    status: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    data: Date;

    @Column({ nullable: true })
    observacoes: string;
}
