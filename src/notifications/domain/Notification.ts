import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Notification extends BaseEntity {
    @PrimaryGeneratedColumn()
    notificationId!: number;

    @Column()
    senderId!: number;
    
    @Column()
    receiverId!: number;

    @Column()
    providerName!: string;

    @Column()
    eventName!: string;

    @Column()
    typeNotification!: string;

    @Column({ nullable: true, default: null })
    status!: boolean | null;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
}