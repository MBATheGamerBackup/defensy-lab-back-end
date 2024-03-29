import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    username!: string;

    @Column({ name: "first_name" })
    firstName!: string;

    @Column({ name: "last_name" })
    lastName!: string;

    @Column({ unique: true })
    email!: string;

	@Column()
	contact!: string;

	@Column()
	place!: string;

    @Column()
    password!: string;

    @Column({ name: "is_admin" })
    isAdmin!: string;
    
    @Column("blob",{ nullable:true, name:"profil_photo" })
	profilPhoto?: Buffer;
}
