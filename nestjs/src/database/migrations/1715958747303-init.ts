import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1715958747303 implements MigrationInterface {
    name = 'Init1715958747303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`alias\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_fe3119b8577cd8704656ee51d0\` (\`alias\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admins\` (\`id\` int NOT NULL AUTO_INCREMENT, \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`admins\` ADD CONSTRAINT \`FK_5733c73cd81c566a90cc4802f96\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`admins\` DROP FOREIGN KEY \`FK_5733c73cd81c566a90cc4802f96\``);
        await queryRunner.query(`DROP TABLE \`admins\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe3119b8577cd8704656ee51d0\` ON \`role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
