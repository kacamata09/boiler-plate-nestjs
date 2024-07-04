import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Timestamp, Entity } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;
  
    @Column()
    fullname: string;
  
    @Column()
    email: string;
  
    @Column()
    username: string;
  
    @Column()
    password: string;
  
    @CreateDateColumn()
    created_at: Timestamp;
  
    @UpdateDateColumn()
    updated_at: Timestamp;
}
